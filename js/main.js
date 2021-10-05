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

var BB=canvas.getBoundingClientRect();
var offsetX=BB.left;
var offsetY=BB.top;
var startX;
var startY;

let amarilla = {
    "x": 190,
    "y": 160, 
    "clicked": false
};
let roja = {
    "x": 1111,
    "y": 160,
    "clicked": false
}

var fichasAmarrilas = [];
var fichasRojas = [];

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
                "ocupado": false,
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

function inicializarFichas(color, jugador, x, y){
    
    if(jugador == "jugador1"){
        if(fichasJugador1 > 0){
            for(let i =0; i<fichasJugador1;i++){
                let ficha = new Image();
                ficha.src = "../img/"+color;
                ficha.onload = function(){  
                    amarilla={
                        "x": x, 
                        "y": y, 
                        "clicked": false};
                    fichasAmarrilas[i] = amarilla;  
                    console.log(fichasAmarrilas.length)
                    ctx.drawImage(ficha, x, y);
                    if(x<350){
                        x+=50;
                    }
                    else{
                        x=0;
                        y+=48;
                    }
                }
            }
        }
    } 
    else if (jugador == "jugador2"){
        if(fichasJugador2 > 0){
            for(let i =0; i<fichasJugador2;i++){
                let ficha = new Image();
                ficha.src = "../img/"+color;
                ficha.onload = function(){   
                    roja = {
                        "x": x, 
                        "y": y, 
                        "clicked": false}
                    fichasRojas[i] = roja;
                    ctx.drawImage(ficha, x, y);

                    if(x<canvas.width - 100){
                        x+=50;
                    }
                    else{
                        x=920;
                        y+=48;
                    }
                }
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

function reDibujarFichaTablero(jugador, x, y){
    let ficha = new Image();

    if(jugador == "jugador1"){
        ficha.src = "../img/fichaAmarilla.png";
        fichasAmarrilas[fichasJugador1-1].x = x;
        fichasAmarrilas[fichasJugador1-1].y = y;
        
        fichasJugador1--;
    }
    else if(jugador == "jugador2"){
        ficha.src = "../img/fichaRojo.png";

        fichasRojas[fichasJugador2].x = x;
        fichasRojas[fichasJugador2].y = y;
        
        fichasJugador2--;
    }

    ficha.onload = function(){        
        ctx.drawImage(ficha, x, y);
    }
}

canvas.addEventListener("mousedown", function(e) {
     var mousePos = onMousePos(e);

     e.preventDefault();
     e.stopPropagation();
    
     if (isCircleClicked(mousePos)) {
        arrastrar = true;
        fichasAmarrilas[fichasJugador1-1].clicked = true;
        delta.x = parseInt(mousePos.x-offsetX);
        delta.y = parseInt(mousePos.y-offsetY);
     }
     startX = delta.x;
     startY = delta.y;
}, false);


  canvas.addEventListener("mousemove", function(e) {
    var mousePos = onMousePos(e);

    if (arrastrar) {
        e.preventDefault();
        e.stopPropagation();

        delta.x = parseInt(mousePos.x-offsetX);
        delta.y = parseInt(mousePos.y-offsetY);

        var dx = delta.x-startX;
        var dy = delta.y-startY;

        for(let i=0; i<fichasAmarrilas.length; i++){
            let ficha = fichasAmarrilas[i];
            if(ficha.clicked == true){
                ficha.x += dx;
                ficha.y += dy;
            }
        }
        
        //fichasRojas[fichasJugador2].x = mousePos.x + dx;
        //fichasRojas[fichasJugador2].x = mousePos.y + dy;
       // dibujarFicha("fichaAmarilla.png", jugador1, fichasAmarrilas[fichasJugador1].x, mousePos.y);
        //amarilla.x = mousePos.x + dx;
        //amarilla.y = mousePos.y + dy;

    }
  }, false);


  canvas.addEventListener("mouseup", function(evt) {
    if(arrastrar){
        var mousePos = onMousePos(evt);
        if(isInsideBoard(mousePos)){
            reDibujarFichaTablero("jugador1", mousePos.x, mousePos.y);
            console.log(fichasAmarrilas.length);
            fichasAmarrilas = [];
            inicializarFichas("fichaAmarilla.png", "jugador1", 0, 0);
        }
    }   
    arrastrar = false;
  }, false);


function isInsideBoard(mousePos){
    return mousePos.x >= 420 && mousePos.x <= 420+canvas.width && 
        mousePos.y >= 0 && mousePos.y <= canvas.height;
}

function iniciarJS(){
    dibujarTablero();
    inicializarFichas("fichaAmarilla.png", "jugador1", 0, 0);
    inicializarFichas("fichaRojo.png", "jugador2", 920 , 0);
}

iniciarJS();