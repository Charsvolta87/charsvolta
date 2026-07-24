const lightbox=document.getElementById("lightbox");
const imagen=document.getElementById("imagenLightbox");
const contador=document.getElementById("contador");
const zoomTexto=document.getElementById("zoomTexto");
const btnCerrar=document.getElementById("cerrar");
const btnAnterior=document.getElementById("anterior");
const btnSiguiente=document.getElementById("siguiente");

let fotos=[];
let indice=0;
let zoom=1;
let posX=0;
let posY=0;

/* ABRIR */
function abrirLightbox(lista,index){
fotos=lista;
indice=index;
lightbox.classList.add("activo");
cargarImagen();
}

/* CARGAR */
function cargarImagen(){
imagen.src=fotos[indice];
contador.innerHTML=`${indice+1} / ${fotos.length}`;
zoom=1;
posX=0;
posY=0;
actualizarTransform();
}

/* TRANSFORMAR */
function actualizarTransform(){
imagen.style.transform=
`translate(${posX}px,${posY}px) scale(${zoom})`;
zoomTexto.innerHTML=Math.round(zoom*100)+"%";
}

/* CERRAR */
btnCerrar.onclick=()=>{
lightbox.classList.remove("activo");
};

/* NAVEGAR */
btnAnterior.onclick=()=>{
indice--;
if(indice<0)
indice=fotos.length-1;
cargarImagen();
};
btnSiguiente.onclick=()=>{
indice++;
if(indice>=fotos.length)
indice=0;
cargarImagen();
};

/* RUEDA DE ZOOM */
imagen.addEventListener("wheel",(e)=>{
e.preventDefault();
if(e.deltaY<0)
zoom+=0.10;
else
zoom-=0.10;
zoom=Math.max(1,Math.min(5,zoom));
actualizarTransform();
});

/* ARRASTRAR */
let arrastrando=false;
let inicioX;
let inicioY;
imagen.onmousedown=(e)=>{
if(zoom<=1)return;
arrastrando=true;
inicioX=e.clientX-posX;
inicioY=e.clientY-posY;
imagen.style.cursor="grabbing";
};

window.onmousemove=(e)=>{
if(!arrastrando)return;
posX=e.clientX-inicioX;
posY=e.clientY-inicioY;
actualizarTransform();
};

window.onmouseup=()=>{
arrastrando=false;
imagen.style.cursor="grab";
};

/* DOBLE CLICK */
imagen.ondblclick=()=>{
if(zoom==1)
zoom=2;
else
zoom=1;
posX=0;
posY=0;
actualizarTransform();
};

/* ESC */
document.addEventListener("keydown",(e)=>{
if(!lightbox.classList.contains("activo"))return;
if(e.key=="Escape")
lightbox.classList.remove("activo");
if(e.key=="ArrowLeft")
btnAnterior.click();
if(e.key=="ArrowRight")
btnSiguiente.click();
});

/* ===== SOPORTE TÁCTIL (CELULAR) ===== */
let touchInicioX = 0;
let touchInicioY = 0;
let distanciaInicialPinch = 0;
let zoomInicialPinch = 1;
let modoPinch = false;

function distanciaEntreDedos(touches){
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx*dx + dy*dy);
}

imagen.addEventListener("touchstart", (e) => {
    if (e.touches.length === 2) {
        // Empieza gesto de pinch (dos dedos)
        modoPinch = true;
        distanciaInicialPinch = distanciaEntreDedos(e.touches);
        zoomInicialPinch = zoom;
    } else if (e.touches.length === 1) {
        modoPinch = false;
        touchInicioX = e.touches[0].clientX - posX;
        touchInicioY = e.touches[0].clientY - posY;
    }
}, { passive: true });

imagen.addEventListener("touchmove", (e) => {
    if (modoPinch && e.touches.length === 2) {
        e.preventDefault();
        const nuevaDistancia = distanciaEntreDedos(e.touches);
        zoom = Math.max(1, Math.min(5, zoomInicialPinch * (nuevaDistancia / distanciaInicialPinch)));
        actualizarTransform();
    } else if (e.touches.length === 1 && zoom > 1) {
        // Un dedo con zoom activo: arrastrar la imagen
        e.preventDefault();
        posX = e.touches[0].clientX - touchInicioX;
        posY = e.touches[0].clientY - touchInicioY;
        actualizarTransform();
    }
}, { passive: false });

imagen.addEventListener("touchend", (e) => {
    if (zoom <= 1 && !modoPinch) {
        // Sin zoom: el desplazamiento horizontal se interpreta como swipe para navegar
        const deltaX = (e.changedTouches[0].clientX - touchInicioX) - posX;
        const UMBRAL_SWIPE = 50;
        if (deltaX > UMBRAL_SWIPE) {
            btnAnterior.click();
        } else if (deltaX < -UMBRAL_SWIPE) {
            btnSiguiente.click();
        }
    }
    if (e.touches.length === 0) {
        modoPinch = false;
    }
});