let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let amarilla = document.getElementById("fichaAmarilla"); 
let roja = document.getElementById("fichaRoja");
let matrizTablero = [];
let fichasInicial = 40;
let fichasJugador1 = fichasInicial;
let fichasJugador2 = fichasInicial;
let jugador1 = null;
let jugador2 = null;

function dibujarTablero(){
    let iteradorY = 0;
        //465
    for(let y=0; y<384; y+=48){
        let iteradorX = 0;
        for(let x=420;x<920;x+=50){
            let image = new Image();
            image.src = "../img/fichero.png";
            let json = {
                "imagen" : image,
                "x": x, 
                "y": y,
                "iteradorX": iteradorX,
                "iteradorY": iteradorY
            };
            image.onload = function(){        
                matrizTablero.push(json);
                ctx.drawImage(image, x, y);
            }
            iteradorX++;
        }
        iteradorY++;
    }
}

function dibujarFicha(color, jugador, x, y){
    let ficha = new Image();
    ficha.src = "../img/"+color;
    console.log(jugador)
    if(jugador == jugador1){
        if(fichasJugador1 > 0){
            ficha.onload = function(){        
                ctx.drawImage(ficha, x, y);
            }
        }
    } else if (jugador == jugador2){
        if(fichasJugador2 > 0){
            image.onload = function(){        
                ctx.drawImage(image, x, y);
            }
        }
    }
    
}


function iniciarJS(){
    dibujarTablero();
    dibujarFicha("fichaAmarilla.png", jugador1, 190, 160);
    dibujarFicha("fichaRojo.png", jugador2, 1111 , 160);
}

iniciarJS();

function onMouseMove(e){
 
    ctx.moveTo(e.layerX, e.layerY);
    
}

canvas.addEventListener('mousedown',onMouseDown, false);
canvas.addEventListener('mousemove', onMouseMove, false);
canvas.addEventListener('mouseup', onMouseUp, false);