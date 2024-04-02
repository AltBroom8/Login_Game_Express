let puntos = 0;
let textito = document.getElementById('username');
let total = document.getElementById('total');
let empezar = false;
let balas = 6;
let urlLogin = 'http://localhost:3000';
let url = 'http://localhost:3000/game';
let ronda = 1;
let contador = 0;
let contenedor = $('#balas');
let imagenes = contenedor.find('img');
let balaactual = imagenes.length - 1;
let gameover = $('.gameover');
let accion = false;
gameover.css({
    'top': '-30vh',
    'opacity': '0',
    'pointer-events': 'none'
});
var resultado = $('<h1>').text('Puntuacion:').addClass('gameover');
$('body').append(resultado);
resultado.css({
    'top': '-15vh',
    'opacity': '0',
    'pointer-events': 'none'
});

$(document).on('dragstart', function (e) {
    e.preventDefault();
});

$(document).on('drop', function (e) {
    e.preventDefault();
});

var btn = $('#empieza');
var btn2 = $('#logout');
btn.on('click', function () {
    contador = 0;
    gameover.css({
        'opacity': '0',
        'pointer-events': 'none'
    });
    resultado.css({
        'opacity': '0',
        'pointer-events': 'none'
    });
    puntos = 0;
    balas = 6;
    console.log('total balas' + ((imagenes.length) - 1));
    balaactual = imagenes.length - 1;
    var texto = $('#mispuntos');
    texto.text(puntos);
    
    btn.css('opacity', '0');
    btn2.css('opacity', '0');
    textito.style.opacity = '0';
    empezar = true;
    inicializa();
    console.log('dentro del metodo es ' + empezar);
    
});

console.log('fuera es ' + empezar);

async function inicializa() {
    if (empezar == true) {
        console.log('imagenesleng= ' + imagenes.length)
        imagenes.css('opacity', '1');
        while (balas > 0) {
            var num = Math.random();
            var izq = (num < 0.5) ? true : false;
            var dragon = $('<img>').css('display', 'block');
            $('body').append(dragon);
            dragon.draggable = false;
            var num2 = Math.floor(Math.random() * (36 - (-5))) + (-5);
            if (izq) {
                dragon.attr('src', 'gifs/dragon 1.gif').addClass('gif1');
                dragon.css({
                    'top': num2 + "vh",
                    'left': '-30vw'
                });
                await moverDragon(dragon, -30, 'derecha');
            } else {
                dragon.attr('src', 'gifs/dragon 2.gif').addClass('gif2');
                dragon.css({
                    'top': num2 + "vw",
                    'left': '100vw'
                });
                await moverDragon(dragon, 100, 'izquierda');
            }
            if (balas == 0) {
                break;
            }
            console.log('balas = ' + balas);
            var retraso = Math.random() * (3000);
            await esperar(retraso);
        }
        accion = false;
        ronda++;
        resultado.css({
            'opacity': '100',
            'pointer-events': 'auto'
        });
        resultado.text('Puntuacion: ' + puntos);
        gameover.css({
            'opacity': '100',
            'pointer-events': 'auto'
        });
        console.log('sale del while')
        btn.css('opacity', '100');
        btn2.css('opacity', '100');
        textito.style.opacity = '100';
        let suma = puntos + parseInt(total.innerHTML)
        console.log(suma)
        renuevaPuntos(suma,textito.innerHTML)
        total.innerHTML = suma;
        
    }
}

function esperar(milisegundos) {
    return new Promise(resolve => {
        setTimeout(resolve, milisegundos);
    });
}

function moverDragon(dragon, pos, direccion) {
    var acierta = false;
    var velocidad = Math.random() * (50 - 25) + 25;
    var listener1 = false;
    console.log('ronda' + ronda)
    function clicEnDragon(e) {
        if(accion){
            e.stopPropagation(); // Evitar que el evento se propague al documento
            acierta = true;
            puntos += 50;
            var texto = $('#mispuntos');
            texto.text(puntos);
            balas--;
            if (balaactual !== -1) {
                imagenes.eq(balaactual).css('opacity', '0');
                balaactual--;
            }
            listener1 = true;
        }
    }

    dragon.on('click', clicEnDragon);

    function enDocumento(e) {
        if (!listener1 && !dragon.is(e.target) && accion) {
            balas--;
            if (balaactual !== -1) {
                imagenes.eq(balaactual).css('opacity', '0');
                balaactual--;
            }
        }
        accion = true;
    }

    $(document).on('click', enDocumento);

    return new Promise(resolve => {
        var intervalo = setInterval(function () {
            if (((direccion === 'izquierda' && pos > -5) || (direccion === 'derecha' && pos < 80)) && acierta == false && balas > 0) {
                pos += (direccion === 'izquierda') ? -1 : 1;
                dragon.css('left', pos + "vw");
            } else {
                dragon.css('display', 'none').remove();
                dragon.off('click', clicEnDragon);
                $(document).off('click', enDocumento);
                clearInterval(intervalo);
                resolve();
            }
        }, velocidad);
    });
}

/************************************************
 * ***********************************************
 * ***********************************************
 * GESTION CON LA BASE DE DATOS
 * ************************************************
 * **********************************************
 * ************************************************
 */

let user = '';
let points = 0;
const obtieneDatos = () => {
    return new Promise((resolve, reject) => {
        fetch('/game', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ peticion:'default'}),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        })
        .then(data => {
            console.log('Datos recibidos:', data);
            user = data.user;
            points = data.points;
            console.log('user es ' + user + ' y points es ' + points);
            textito.innerHTML =user;
            total.innerHTML = points;
            resolve();
        })
        .catch(error => {
            console.error('Error:', error);
            reject(error);
        });
    });
};

const renuevaPuntos = async(points,user)=>{
    try{
        const response = await fetch(url,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ peticion:'puntos',
                                    points: points,
                                    user:user}),
        })
        if (!response.ok) {
            throw new Error('Error en la solicitud al backend');
        }
        const result = await response.json(); // Parsea la respuesta como JSON

        console.log(result);

    }catch(error){
        console.error('Error:', error);
    }
}


obtieneDatos()
.then(() => {
    console.log('La función se ha ejecutado de manera sincrónica');
})
.catch(error => {
    console.error('Error:', error);
});

obtieneDatos();

btn2.on('click',  ()=> {
    window.location.href = urlLogin; 

});




