let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let matrizTablero = [];
let cantidadFichasPrimerJugador = 40;
let cantidadFichasSegundoJugador = 40;
let color = '';
let juega = 1;
let arrastrar = false;

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
                "color": color,
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

function dentroRango(mousePos, figura){
    return mousePos.x >= figura.x && mousePos.x < figura.x + 50 &&
    mousePos.y >= figura.y && mousePos.y < figura.y + 48;
}

function adentroTablero(mousePos){
    return mousePos.x >= 420 && mousePos.x <= 420+canvas.width && 
        mousePos.y >= 0 && mousePos.y <= canvas.height;
}

function restaJugador(){
    if(color == 'amarillo')
        cantidadFichasPrimerJugador--;
    else
        cantidadFichasSegundoJugador--;
}

function mostrarJugador(){
    let turno = document.getElementById("turno");
    turno.innerHTML = "Es el turno del jugador "+juega;
}

function setJugador(){
    if(color == 'amarillo')
        juega = 2;
    else if(color == 'rojo'){
        juega = 1;
    }   
}

function logicaJugador(elementoTabla){
    checkCuatroEnLinea(elementoTabla);
    restaJugador();
    setJugador();
    mostrarJugador();
    color = '';
    arrastrar = false;
}

function checkCuatroEnLinea(elementoTabla){
    

}

canvas.addEventListener('mousedown', function(e){
    
    let cords = coordenadaMouse(e);
    
    if (dentroRango(cords, amarilla) && juega == 1){
        color = 'amarillo';
        arrastrar = true;
    }
    else if (dentroRango(cords, roja) && juega == 2){
        color = 'rojo';
        arrastrar = true;
    }
});

canvas.addEventListener('mouseup', function(e){
    
    let cords = coordenadaMouse(e);
    if(adentroTablero(cords) && arrastrar){
        for(let i = 0; i < matrizTablero.length; i++){
            if(dentroRango(cords, matrizTablero[i])){
                if(matrizTablero[i].ocupado ==  false){
                    for(let iterador = i + 10; iterador < matrizTablero.length; iterador += 10){
                        if(matrizTablero[iterador].ocupado == true){
                            dibujarFicha(color, matrizTablero[iterador - 10].x,matrizTablero[iterador - 10].y);
                            matrizTablero[iterador - 10].ocupado = true;
                            matrizTablero[iterador - 10].color = color;     
                            logicaJugador(matrizTablero[iterador - 10]);
                            return;
                        }
                        else if (matrizTablero[iterador].fila == 7){
                            dibujarFicha(color, matrizTablero[iterador].x,matrizTablero[iterador].y);
                            matrizTablero[iterador].ocupado = true;
                            matrizTablero[iterador].color = color;
                            logicaJugador();
                            return;
                        }
                    }
                }
            }
        }
    }
});


function iniciarJS(){
    dibujarTablero();
    dibujarFicha("amarillo", 190, 166);
    dibujarFicha("rojo",  1111 , 166);
    mostrarJugador();
}

iniciarJS();