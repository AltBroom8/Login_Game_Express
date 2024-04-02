//documentacion nodejs

//para los exports module.exports = dato
//para recibir const cosa = requires('./nombrearchivo');

//COMANDOS DE OS
const os = require("os");
// os.userInfo();  da informacion del usuario actual
// os.uptime();   tiempo que tarda en ejecutar la maquina
// os.platform();  devuleve el os que estas usando
// os.totalmem();  total de la memoria
// os.freemem();    memoria libre

//COMANDOS DE PATH
const path = require("path");
//path.join         devuelve la ruta uniendo carpetas(sin importar so)
//path.basename     devuelve el nombre del ultimo archivo de la ruta
//path.dirname      devuelve el nombre del directorio del archivo
//path.parse        devuelve un objeto con datos de la ruta
//path.resolve      le dices un archivo y devuelve la ruta

//FILE SYSTEM(FS)
const fs = require("fs");
// let texto  = fs.readFileSync('./texto.txt','utf-8');  leer archivos de texto
/*let texto  = fs.readFileSync('./texto.txt');
console.log(texto.toString());                         otra forma de hacerlo*/
//fs.writeFileSync('./chiste.txt','— Ramón, si supieras que voy a morir mañana, ¿qué me dirías hoy? \n— ¿Me prestas mil euros y mañana te los devuelvo?');  escribe un archivo con texto
/*fs.writeFileSync('./chiste.txt','   contenido añadido',{
    flag:'a'
}); añadir contenido de texto a un archivo*/
//AHORA LAS USARE DE MANERA ASINCRONA:
/*fs.readFile('./texto.txt','utf-8',function(error,data){
    if(error){
        console.log(error);
    }
    console.log(data);
    fs.readFile('./texto.txt','utf-8',function(error,data){
        if(error){
            console.log(error);
        }
        console.log(data);
    });
});*/

//HTTP REQUEST
const http = require("http");
/*
http.createServer((request,response)=>{
    if(request.url==='/'){
        response.write('Pagina principal');
        return response.end();
    }
    if(request.url==='/about'){
        response.write('Mas informacion');
        return response.end();
    }

    response.write('<h1>ERROR 404 NOT FOUND</h1>');
    response.end();
}).listen(3023);
EXPLICACION:CREA EL SERVER Y ESPERA REQUEST Y EJECUTA RESPONSE. LISTEN PARA MANTENER EL SERVER ACTIVO
DEPENDE DE LA URL MUESTRA UN CONTENIDO U OTRO, Y AHI PUEDES INYECTAR HTML. AL TERMINAR EL IF DEBE ACABAR EL METODO.
SI ENTRA EN UNA DIRECCION QUE NO ESTA CONTEMPLADA SE MUESTRA EL ERROR
*/

//NPM
//nmpjs.com para instalar modulos.
//npm install instala todas las dependencias
//npm install dependencia(-D para dependencias de desarrollo, -g para globales(en todo el sistema)) - nodemon (terminal constante)
//npm remove dependencia
//npm init escribe en json info del proyecto
//npm init -y inicio rapido
//npm run comando para desde la terminal ejecutar comandos creados en el script del JSON./ npm start

//NPX SOLO EJECUTA, NO INSTALA
//HTTPSERVER,  SERVE

//EVENT LOOP
/*
http.createServer((request,response)=>{
    if(request.url==='/'){
        response.write('Pagina principal');
        return response.end();
    }
    if(request.url==='/about'){
        //bloqueo
        setTimeout(()=>{
            for(let i=0;i<100000;i++){
                var x = Math.random()*10;
                console.log(x);
            }
        },0);
        
        response.write('Mas informacion');
        return response.end();
    }

    response.write('<h1>ERROR 404 NOT FOUND</h1>');
    response.end();
}).listen(3023);*/

//PROMESAS
/*
function getText(ruta){
    return new Promise((resolve, reject) => {
        fs.readFile(ruta,'utf-8',(error,data)=>{
            if(error){
                reject(error);
            }
            resolve(data);
        })
        

    });
}*/

/*
getText('./chiste.txt').then((result)=>{
    console.log(result);
});
getText('./chistex.txt').catch((error)=>{
    console.log(error);
});*/

//ASYNC/AWAIT  otra manera para ahorrarte el then o el catch
/*async function leer(){
    try{
        const poto = await getText('./chiste.txt')
        console.log(poto);
    }catch(error){
        console.log(error);
    }
}
leer();*/

//PROMISIFY (te resume el realizar una promesa)
/*
const util = require("util");
const leer = util.promisify(fs.readFile);
leer("chiste.txt").then((result) => {
    console.log(result.toString());
});*/

//EVENTS
/*
const event = require('events');
const cosa = new event();
cosa.on('response',(data)=>{
    console.log(data)
});
cosa.emit('response',('ohmaigad'));*/

//STREAMS
//CONTEXTO: HE CREADO UN ARCHIVO DE TEXTO DE 1GB
//const {createReadStream} = require('fs');
/*const createbigfile = ()=>{
    fs.writeFileSync('./output.txt','cositas'.repeat(10000))
}
createbigfile();*/
/*
const stream = createReadStream('./output.txt');
stream.on('data', function muestra(chunk){
    console.log(chunk.toString());
});
stream.on('end', () => {
    console.log("done");
});
stream.on('error', (error) =>{
    console.log(error);
});*/


//STREAMS Y HTTP
/*
http.createServer((req,res)=>{
    const fileStream = fs.createReadStream('./output.txt','utf-8');
    fileStream.on('data', (cosa)=>{
        fileStream.pipe(res);
    });
    fileStream.on('error', (err)=>{
        console.log(error);
    });
}).listen(3000);*/

//ECMASCRIPT MODULES

/*EXPORTAR (resuerda que necesitas ej json) debajo de main añade "type": "module",
const suma = (a,b)=>{
    return a+b;
}
export default{
    suma
}
*/

/*IMPORTAR
import math from './index.js';
console.log(math.suma(6,4));*/

//fetch toma datos  de una api
/*fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res=>res.json())
    .then(data=>console.log(data));*/


//EXPRESS
/*
const express = require('express');
const app = express();
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
})
app.get('*', (req, res) => {
    res.status(404).send('Página no encontrada');
    });
app.listen(3000);*/

//deploy(desplegar)
//HEROKU