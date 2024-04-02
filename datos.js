var mysql = require('mysql');

const databaseConfig = {
    host: "localhost",
    user: "root",
    password: "1234",
    database: "aplicacion"
};

const conector = mysql.createConnection(databaseConfig);
const tablausuarios = 'USUARIO';

const connectDB = () => {
    return new Promise((resolve, reject) => {
        conector.connect((error) => {
            if (error) {
                console.error('Error al conectar a MySQL:', error.message);
                reject(error);
            } else {
                console.log('Conexión exitosa a MySQL');
                resolve();
            }
        });
    });
};

const disconnectDB = () => {
    conector.end((error) => {
        if (error) {
            console.error('Error al cerrar la conexión a MySQL:', error.message);
        } else {
            console.log('Conexión cerrada correctamente.');
        }
    });
};
const createTableIfNotExists = () => {
    return new Promise((resolve, reject) => {
        conector.query(
            'CREATE TABLE IF NOT EXISTS ' + tablausuarios + ' ( username VARCHAR(255) PRIMARY KEY, password VARCHAR(255), email VARCHAR(255), puntos INT)',
            (error) => {
                if (error) {
                    console.error('Error al crear la tabla:', error.message);
                    reject(error);
                } else {
                    resolve();
                }
            }
        );
    });
};

const emailvalido = async (email, callback) => {
    try {
        await createTableIfNotExists();

        conector.query('SELECT * FROM ' + tablausuarios + ' WHERE email = ?', [email], function (err, resultados) {
            if (err) {
                console.error('Error en la consulta:', err.message);
                callback(err, null);
            } else {
                if (resultados.length > 0) {
                    callback(null, true);
                } else {
                    callback(null, false);
                }
            }
        });
    } catch (error) {
        console.error('Error:', error);
        callback(error, null);
    }
};

const userValido = async (username, callback) => {
    try {
        await createTableIfNotExists();

        conector.query('SELECT * FROM ' + tablausuarios + ' WHERE username = ?', [username], function (err, resultados) {
            if (err) {
                console.error('Error en la consulta:', err.message);
                callback(err, null);
            } else {
                if (resultados.length > 0) {
                    callback(null, true);
                } else {
                    callback(null, false);
                }
            }
        });
    } catch (error) {
        console.error('Error:', error);
        callback(error, null);
    }
};

const registro = async (email,user,password, callback) => {
    try {
        await createTableIfNotExists();
        conector.query('INSERT INTO ' + tablausuarios + ' VALUES (?, ?, ?,0)', [user, password, email], function (err, resultados) {
            if (err) {
                console.error('Error en la consulta:', err.message);
                callback(err, null);
            } else {
                callback(null, resultados.affectedRows > 0); 
            }
        });
    } catch (error) {
        console.error('Error:', error);
        callback(error, null);
    }
};

const getPswd = async (user, callback) => {
    try {
        await createTableIfNotExists();
        conector.query('SELECT password FROM ' + tablausuarios + ' WHERE username = ?', [user], function (err, resultados) {
            if (err) {
                console.error('Error en la consulta:', err.message);
                callback(err, null);
            } else {
                // Assuming you want to return the password, not the affectedRows
                if (resultados.length > 0) {
                    // Assuming password is a field in the result
                    callback(null, resultados[0].password);
                } else {
                    // No user found
                    callback(null, null);
                }
            }
        });
    } catch (error) {
        console.error('Error:', error);
        callback(error, null);
    }
};
const getPts = async (user, callback) => {
    try {
        await createTableIfNotExists();
        conector.query('SELECT puntos FROM ' + tablausuarios + ' WHERE username = ?', [user], function (err, resultados) {
            if (err) {
                console.error('Error en la consulta:', err.message);
                callback(err, null);
            } else {
                // Assuming you want to return the points, not the password
                if (resultados.length > 0) {
                    console.log(resultados[0].puntos)
                    callback(null, resultados[0].puntos);
                } else {
                    // No user found
                    callback(null, null);
                }
            }
        });
    } catch (error) {
        console.error('Error:', error);
        callback(error, null);
    }
};

const setPts = async(user,points)=>{
    try{
        await createTableIfNotExists();
        const query = 'UPDATE ' + tablausuarios + ' SET puntos = ? WHERE username = ?';
        await conector.query(query, [points, user]);
    }catch (error) {
        console.error('Error:', error);
        throw error; 
    }
}

const topUsers = async () => {
    try {
        const query = 'SELECT username, puntos FROM ' + tablausuarios + ' ORDER BY puntos DESC LIMIT 5;';
        const resultados = await new Promise((resolve, reject) => {
            conector.query(query, (error, resultados) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(resultados);
                }
            });
        });

        return resultados;
    } catch (error) {
        console.error('Error:', error);
        throw error; 
    }
};

conector.on('error', (err) => {
    console.error('Error en la conexión a MySQL:', err.code);
});

module.exports = {
    emailvalido: emailvalido,
    userValido: userValido,
    connectDB: connectDB,
    disconnectDB: disconnectDB,
    registro: registro,
    getPswd: getPswd,
    getPts: getPts,
    setPts: setPts,
    topUsers: topUsers};