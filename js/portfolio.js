fetch("data/eventos.json")

.then(r=>r.json())

.then(eventos=>{

let html="";

eventos.forEach(evento=>{

html+=`

<a class="evento"

href="evento.html?id=${evento.id}">

<div class="imagen">

<img src="imagenes/${evento.carpeta}/${evento.portada}">

</div>

<div class="info">

<h2>${evento.titulo}</h2>

<p>${evento.lugar}</p>

<p>${evento.fecha}</p>

<span>

${evento.cantidad} fotografías

</span>

</div>

</a>

`;

});

document.getElementById("portfolio-grid").innerHTML=html;

});