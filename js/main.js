let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let amarilla = document.getElementById("fichaAmarilla"); 
let roja = document.getElementById("fichaRoja");
let matrizTablero = [];
let fichasInicial = 40;
let fichasJugador1 = fichasInicial;
let fichasJugador2 = fichasInicial;

function dibujarTablero(){
    let iteradorY = 0;
        
    for(let y=0; y<384; y+=48){
        let iteradorX = 0;
        for(let x=0;x<500;x+=50){
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

function dibujarFicha(color, ubicacion){
    for(let i = 0; i<fichasInicial; i++){
        let ficha = new Image();
        ficha.src = "../img/"+color;
        ubicacion.appendChild(ficha);
    }
}


function iniciarJS(){
    dibujarTablero();
    dibujarFicha("fichaAmarilla.png", amarilla);
    dibujarFicha("fichaRojo.png", roja);
}

iniciarJS();