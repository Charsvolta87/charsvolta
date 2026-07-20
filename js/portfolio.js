fetch("data/eventos.json")

.then(res=>res.json())

.then(eventos=>{

const grid=document.getElementById("portfolio-grid");

eventos.forEach(evento=>{

grid.innerHTML+=`

<a class="evento"

href="evento.html?id=${evento.id}">

<div class="imagen">

<img src="${evento.portada}"

alt="${evento.titulo}">

</div>

<div class="info">

<h2>${evento.titulo}</h2>

<p>${evento.lugar}</p>

<p>${evento.fecha}</p>

<span>${evento.cantidad} fotografías</span>

</div>

</a>

`;

});

});
