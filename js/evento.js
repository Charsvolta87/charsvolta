const params=new URLSearchParams(window.location.search);

const id=params.get("id");

fetch("data/eventos.json")

.then(r=>r.json())

.then(eventos=>{

const evento=eventos.find(e=>e.id===id);

if(!evento)return;

document.title=evento.titulo+" | Chars Volta";

document.getElementById("heroEvento").style.backgroundImage=
`linear-gradient(rgba(0,0,0,.45),rgba(0,0,0,.8)),url(${evento.portada})`;

document.getElementById("heroEvento").innerHTML=`

<div class="heroEventoContenido">

<h1>${evento.titulo}</h1>

<p>${evento.lugar}</p>

<p>${evento.fecha}</p>

</div>

`;

let html="";

evento.imagenes.forEach(imagen=>{

html+=`

<div class="foto">

<img
src="imagenes/${evento.id}/${imagen}"
loading="lazy">

</div>

`;

});

document.getElementById("contenedorFotos").innerHTML=html;

});
