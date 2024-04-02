//RANGOS DE ALTURA: TOP -5VW A 70 VW
var puntos = 0;
var empezar = false;
var balas = 6;
var ronda = 1;
var contador = 0;
var contenedor = document.getElementById('balas');
var imagenes = contenedor.getElementsByTagName('img');
var balaactual = imagenes.length-1;
var gameover = document.getElementsByClassName('gameover');
gameover[0].style.top='-30vh';
gameover[0].style.opacity='0';
gameover[0].style.pointerEvents='none';
var resultado = document.createElement('h1');
resultado.innerText='Puntuacion:';
resultado.classList.add('gameover');
document.body.appendChild(resultado);
resultado.style.top='-15vh';
resultado.style.opacity='0';
resultado.style.pointerEvents='none';

document.addEventListener('dragstart', function (e) {
    e.preventDefault();
});

document.addEventListener('drop', function (e) {
    e.preventDefault();
});


var btn = document.getElementById("empieza");
btn.addEventListener('click', function() {
        contador = 0;
        gameover[0].style.opacity='0';
        gameover[0].style.pointerEvents='none';
        resultado.style.opacity='0';
        resultado.style.pointerEvents='none';
        puntos = 0;
        balas = 6;
        console.log('total balas'+((imagenes.length)-1));
        balaactual = imagenes.length-1;
        var texto = document.getElementById('mispuntos');
        texto.innerText=puntos;
        empezar = true;
        btn.style.opacity='0';
        inicializa();
    console.log('dentro del metodo es '+empezar);
    
});

async function inicializa(){
    if (empezar == true){
        console.log('imagenesleng= '+imagenes.length)
        for (var i = 0; i < imagenes.length; i++) {
            imagenes[i].style.opacity = '1';
            console.log('Opacidad de imagen '+i+' es ' + imagenes[i].style.opacity);
        }
        while(balas>0){
            var num = Math.random();
            var izq = (num<0.5)?true:false;
            var dragon = document.createElement('img');
            dragon.style.display='block';
            document.body.appendChild(dragon);
            dragon.draggable = false
            var num2 = Math.floor(Math.random() * (36 - (-5))) + (-5);
            if(izq){
                dragon.src='gifs/dragon 1.gif';
                dragon.classList.add("gif1");
                dragon.style.top=num2+"vh";
                var pos = -30;
                dragon.style.left=pos+"vw";
                await moverDragon(dragon,pos,'derecha');
    
            }else{
                dragon.src='gifs/dragon 2.gif';
                dragon.classList.add("gif2");
                dragon.style.top=num2+"vw";
                var pos = 100;
                dragon.style.left=pos+"vw";
                await moverDragon(dragon,pos,'izquierda');
            }
            if (balas==0){
                break;
            }
            console.log('balas = '+balas);
            var retraso = Math.random()* (3000);
            await esperar(retraso);
        }
        ronda++;
        resultado.style.opacity='100';
        resultado.style.pointerEvents='auto';
        resultado.innerText='Puntuacion: '+puntos;
        gameover[0].style.opacity='100';
        gameover[0].style.pointerEvents='auto';
        console.log('sale del while')
        btn.style.opacity='100'
    }
}

function esperar(milisegundos) {
    return new Promise(resolve => {
        setTimeout(resolve, milisegundos);
    });
}


function moverDragon(dragon, pos, direccion) {
    var velocidad = Math.random() * (50 - 25) + 25;

    function clicEnDragon(e) {
        console.log('Clic en el dragón');
        puntos += 50;
        var texto = document.getElementById('mispuntos');
        texto.innerText = puntos;
        balas--;

        if (balaactual !== -1) {
            imagenes[balaactual].style.opacity = '0';
            balaactual--;
        }
        // Detener el movimiento del dragón al acertar
        clearInterval(intervalo);
        dragon.style.display = 'none';
        dragon.remove();
        
    }

    function enDocumento(e) {
        console.log('Clic en el documento');
        // Verificar si el clic fue fuera del dragón y actualizar balas
        
            balas--;

            if (balaactual !== -1) {
                imagenes[balaactual].style.opacity = '0';
                balaactual--;
            }
    }
    dragon.addEventListener('click', clicEnDragon);
    document.addEventListener('click', enDocumento);
    

    var intervalo = setInterval(function () {
        if (((direccion === 'izquierda' && pos > -5) || (direccion === 'derecha' && pos < 80)) && balas > 0) {
            pos += (direccion === 'izquierda') ? -1 : 1;
            dragon.style.left = pos + "vw";
        } else {
            // Si el dragón llega al final o se queda sin balas, detener el intervalo
            clearInterval(intervalo);
            dragon.style.display = 'none';
            dragon.remove();
            resolve();
        }
    }, velocidad);

    return new Promise(resolve => {
        // Resolver la promesa cuando se complete el intervalo
        intervalo.onfinish = resolve;
    });
}










