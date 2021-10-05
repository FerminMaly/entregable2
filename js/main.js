let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let matrizTablero = [];
let cantidadFichasPrimerJugador = 40;
let cantidadFichasSegundoJugador = 40;
let color = '';

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

function dibujarTablero(){
    let fila = 0;
    let elementoActual = 0;
    for(let y=0; y<384; y+=48){
        let columna = 0;
        for(let x=420;x<920;x+=50){
            let image = new Image();
            image.src = "../img/fichero.png";
            let json = {
                "imagen" : image,
                "x": x, 
                "y": y,
                "columna": columna,
                "fila": fila, 
                "ocupado": false,
            };
            image.onload = function(){        
                ctx.drawImage(image, x, y);
            }
            matrizTablero.push(json);
            columna++;
            elementoActual++;
        }
        fila++;
    }
}

function dibujarFicha(color, x, y){
    let ficha = new Image();
    if(color == 'amarillo')
        ficha.src = "../img/fichaAmarilla.png";
    
    else
        ficha.src = "../img/fichaRojo.png";
    ficha.onload = function(){  
        ctx.drawImage(ficha, x, y);
    }
}

function coordenadaMouse(e) {
    return {
    x: e.layerX,
    y: e.layerY
    };
}

function moverFicha (color, e){
    //Dibujo la ficha en el tablero
    let cords = coordenadaMouse()
    dibujarFicha (color, x, y);


}

function dentroRango(mousePos, figura){
    return mousePos.x >= figura.x && mousePos.x < figura.x + 50 &&
    mousePos.y >= figura.y && mousePos.y < figura.y + 48;
}

function adentroTablero(mousePos){
    return mousePos.x >= 420 && mousePos.x <= 420+canvas.width && 
        mousePos.y >= 0 && mousePos.y <= canvas.height;
}

canvas.addEventListener('mousedown', function(e){
    let cords = coordenadaMouse(e);
    if (dentroRango(cords, amarilla))
        color = 'amarillo'
    else
        if (dentroRango(cords, roja))
            color = 'rojo'
});

canvas.addEventListener('mousemove', function(){
    
});

canvas.addEventListener('mouseup', function(e){
    let cords = coordenadaMouse(e);
    if(adentroTablero(cords)){
        for(let i = 0; i < matrizTablero.length; i++){
            if(dentroRango(cords, matrizTablero[i])){
                if(matrizTablero[i].ocupado ==  false){
                    for(let iterador = i + 10; iterador < matrizTablero.length; iterador += 10){
                        if(matrizTablero[iterador].ocupado == true){
                            dibujarFicha(color, matrizTablero[iterador - 10].x,matrizTablero[iterador - 10].y);
                            matrizTablero[iterador - 10].ocupado = true;
                            restaJugador();
                            console.log(cantidadFichasPrimerJugador)
                            return;
                        }
                        else if (matrizTablero[iterador].fila == 7){
                            dibujarFicha(color, matrizTablero[iterador].x,matrizTablero[iterador].y);
                            matrizTablero[iterador].ocupado = true;
                            restaJugador();
                            console.log(cantidadFichasPrimerJugador)
                            return;
                        }
                    }
                }
            }
        }
        
        
        color = '';
    }
});

function restaJugador(){
    if(color == 'amarillo')
        cantidadFichasPrimerJugador--;
    else
        cantidadFichasSegundoJugador--;
}


function iniciarJS(){
    dibujarTablero();
    dibujarFicha("amarillo", 190, 166);
    dibujarFicha("rojo",  1111 , 166);
}

iniciarJS();