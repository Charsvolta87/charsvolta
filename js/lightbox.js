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