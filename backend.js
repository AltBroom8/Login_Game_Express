const express = require('express');
const datos = require('./datos.js');
const path = require('path');
const pass = require ('./password.js')
datos.connectDB();
let app = express();
let usuario = '';
let puntos = 0;
const actualizaPts = async(user,pts)=>{
    await datos.setPts(user,pts);
}
const requireLogin = (req, res, next) => {
    if (usuario!=='') {
      // Usuario autenticado, permite el acceso
        return next();
    } else {
      // Usuario no autenticado, redirige al inicio de sesión
        return res.redirect('/');
    }
};
app.use('/game', requireLogin);
app.use(express.static(__dirname));
app.use(express.json());
app.use('/game', express.static(path.join(__dirname, 'RUINA')));

app.get('/', (req,res)=>{
    usuario = '';
    puntos = 0;
    res.sendFile(__dirname + '/login.html');
});
app.post('/', async (req, res) => {
    try {
        let resultado; 
        await new Promise(async (resolve, reject) => {
            if(req.body.comprueba == 'email'){
                datos.emailvalido(req.body.email, (err, registrado) => {
                    console.log(req.body.email);
                    if (err) {
                        console.error('Error al verificar el correo electrónico:', err);
                        // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario.
                        reject(err);
                    } else {
                        resultado = registrado;
                        resolve();
                    }
                });
            } else if(req.body.comprueba == 'user'){
                datos.userValido(req.body.user, (err, registrado) => {
                    console.log(req.body.user);
                    if (err) {
                        console.error('Error al verificar el username:', err);
                        // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario.
                        reject(err);
                    } else {
                        resultado = registrado;
                        resolve();
                    }
                });
            } else if(req.body.comprueba == 'registro'){
                let userActual = req.body.user;
                let pswdActual = await pass.encripta(req.body.password);
                let emailActual = req.body.email;
                datos.registro(emailActual, userActual, pswdActual, (err, registrado) => {
                    if (err) {
                        console.error('Error al registrar:', err);
                        reject(false);
                        // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario.
                    } else {
                        console.log(req.body.user);
                        usuario = req.body.user;
                        puntos = 0;
                        console.log("Se ha podido registrar ");
                        console.log('usuario = '+usuario);
                        resultado = registrado;
                        resolve();
                    }
                });
            } else if (req.body.comprueba == 'login') {
                console.log('entra en el login backend')
                try {
                    const registrado = await new Promise((resolve, reject) => {
                        datos.userValido(req.body.user, (err, registrado) => {
                            if (err) {
                                console.error('Error al verificar el username:', err);
                                reject(err);
                            } else {
                                // Resuelve la promesa con el valor de 'registrado'
                                resolve(registrado);
                            }
                        });
                    });
                    console.log(registrado);
                    if (registrado) {
                        const pswdBBDD = await new Promise((resolve, reject) => {
                            datos.getPswd(req.body.user, (error, password) => {
                                if (error) {
                                reject(error);
                                } else {
                                resolve(password);
                                }
                            });
                        });
                        console.log('contraseña bbdd es: '+pswdBBDD);
                        const contraseñaValida = await pass.comprueba(req.body.password, pswdBBDD);
                        console.log('contraseña valida es: '+contraseñaValida)
                        if (contraseñaValida) {
                            usuario = req.body.user;
                            datos.getPts(req.body.user, (error, puntosUsuario) => {
                                if (error) {
                                    console.error('Error al obtener puntos:', error);
                                    // Maneja el error según tus necesidades
                                } else {
                                    puntos = puntosUsuario;
                                    console.log('Puntos:', puntos);
                                    // Continúa con la lógica utilizando la variable 'puntos'
                                }
                            });
                            console.log('puntos es '+puntos);
                            resultado = true;
                        } else {
                            resultado = false;
                        }
                    } else {
                        resultado = false;
                    }
                    resolve(); // Resuelve la promesa después de completar todas las operaciones asincrónicas
                } catch (error) {
                    console.error('Error:', error);
                    res.status(500).json({ error: 'Error en el servidor' });
                }
            }else if(req.body.comprueba == 'tabla'){
                resultado = await datos.topUsers();
                console.log('El resultado es '+resultado);
                res.json({ success: resultado });
            }
        });

        res.json({ success: resultado });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});


app.get('/game', (req, res) => {
    res.sendFile(__dirname + '/RUINA/index.html');
});

app.post('/game', (req, res) => {
    if(req.body.peticion=='default'){
        res.json({user:usuario,
            points:puntos})
    }else if(req.body.peticion=='puntos'){
        actualizaPts(req.body.user, req.body.points)
    }
    
});
process.on('beforeExit', () => {
    datos.disconnectDB();
    console.log('Conexión cerrada antes de apagar el servidor.');
});
app.listen(3000);

