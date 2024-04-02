const express = require('express');
const app = express();
//HTTP VS EXPRESS
/*
const http = require('http');
const fs = require('fs');
http.createServer((req, res) => {
    const read = fs.ReadStream('login.html');
    read.pipe(res);
}).listen(3000);


const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});
app.listen(3000);*/

//          comandos basicos
//          res.end('hola mundo');---> para mandar un mensaje, en texto al final
//          res.send(('login.html'),{
//              root:__dirname
//          /});--> para mandar un archivo o mensaje
//          res.send('holamundo')
//          res.use(); para rutas no contempladas


//HTTP VERBS 
//GET=Saca recursos del servidor(cargar una url por ejemplo)

//POST Guardar recursos en el backend(Datos de un fomulario por ejemplo)

//PUT Actualizar informacion en el backend

//DELETE Eliminar contenido de la base de datos o backend

//HTTP METHODS EXPRESS(CRUD)
//app.get, app.post app.use app.delete res.json res.send res.sendfile
//codigos de estado res.sendStatus-   404 no encuntra 500 error interno del servidor 
//200 todo ha ido bien   204 todo bien pero no devuelve contenido
//endpoint (/about) header(json) y body({}) forman un request
//req.body para ver el contenido.
/*
app.use(express.text());
app.use(express.urlencoded({extended:true}));

app.post('/',(req,res)=>{
    console.log(req.body)
    res.send('nuevo usuario creado');
})

app.listen(3000);
app.put
*/


//REQUEST PARAMS
//typeof
/*
app.get('/:user',(req,res)=>{
    console.log(typeof req.params.user);
    res.send(`Hola ${req.params.user}`)
})
/*
app.get('/:x/:y',(req,res)=>{
    const {x,y} = req.params; 

    //otra forma de extraerlo
    x = parseInt(req.params.x);
    y = parseInt(req.params.y);
    console.log(x+y);
    if(!isNaN(x+y)){
        res.send(`La suma de ${req.params.x} y ${req.params.y} es `+(x + y));
    }else{
        res.send('Introduce valores validos');
    }
    
})*/
/*
app.get('/:nombre/:edad',(req,res)=>{
    res.send(`El usuario ${req.params.nombre} tiene ${req.params.edad} años`)
});
app.listen(3000);*/

//QUERIES   param+ ?nombre=valor 
//& para otro valor, si se repiten keys te los value en un array
//por ejemplo localhost:3000/user?x=20
app.get('/:nombre',(req,res)=>{
    console.log(req.query)
    res.send(`hola ${req.params.nombre}`)
});
app.listen(3000)