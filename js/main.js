let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let matrizTablero =[];

function dibujarTablero(){
    // | | | | |
    let iteradorY = 0;
    let iteradorX = 0;
    for(let y=0; y<canvas.height; y+48){
        let arr = [];
        for(let x=0;x<canvas.width;x+50){
            
        }
    }
}

//dibujarTablero();
let fichero = new Image();
fichero.src = "fichero.png";
console.log(fichero.width);