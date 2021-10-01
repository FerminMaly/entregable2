let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let matrizTablero = [];
let fichasInicial = 40;
let fichasJugador1 = fichasInicial;
let fichasJugador2 = fichasInicial;
let jugador1 = null;
let jugador2 = null;
let arrastrar = false;
let delta = new Object();
let X = canvas.width / 2;
let Y = canvas.height / 2;

let amarilla = {
    x: 190,
    y: 160
};
let roja = {
    x: 1111,
    y: 160
}

function dibujarTablero(){
    let iteradorY = 0;
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
                "iteradorY": iteradorY, 
                "ocupado": false
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

function onMousePos(e) {
            return {
            x: e.layerX,
            y: e.layerY
            };
    }

function isCircleClicked(mousePos){
    return mousePos.x >= amarilla.x && mousePos.x < amarilla.x + 50 &&
    mousePos.y >= amarilla.y && mousePos.y < amarilla.y + 48 ||
    mousePos.x >= roja.x && mousePos.x < roja.x + 50 &&
        mousePos.y >= roja.y && mousePos.y < roja.y + 48;
}

canvas.addEventListener("mousedown", function(evt) {
    console.log("hola")
    var mousePos = onMousePos(evt);
    
  if (isCircleClicked(mousePos)) {
    arrastrar = true;
      delta.x = X - mousePos.x;
      delta.y = Y - mousePos.y;
    }
  }, false);


  canvas.addEventListener("mousemove", function(evt) {
    var mousePos = onMousePos(evt);

    if (arrastrar) {
        X = mousePos.x + delta.x, Y = mousePos.y + delta.y
    }
  }, false);


  canvas.addEventListener("mouseup", function(evt) {
    if(arrastrar){
        var mousePos = onMousePos(evt);
        if(isInsideBoard(mousePos))
            dibujarFicha("fichaAmarilla.png", jugador1, mousePos.x, mousePos.y);
    }   
    arrastrar = false;
  }, false);


function isInsideBoard(mousePos){
    return mousePos.x >= 420 && mousePos.x <= 420+canvas.width && 
        mousePos.y >= 0 && mousePos.y <= canvas.height;
}

function iniciarJS(){
    dibujarTablero();
    dibujarFicha("fichaAmarilla.png", jugador1, 190, 160);
    dibujarFicha("fichaRojo.png", jugador2, 1111 , 160);
}

iniciarJS();