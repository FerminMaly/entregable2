let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let matrizTablero = [];

function dibujarTablero(){
    let iteradorY = 0;
        
    for(let y=0; y<384; y+=48){
        let iteradorX = 0;
        for(let x=0;x<500;x+=50){
            let image = new Image();
            image.src = "../fichero.png";
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
dibujarTablero();
