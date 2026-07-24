const params=new URLSearchParams(window.location.search);

const id=params.get("id");

fetch("data/eventos.json")

.then(r=>r.json())

.then(eventos=>{

const evento=eventos.find(e=>e.id===id);

if(!evento)return;

document.title=evento.titulo+" | Chars Volta";

const metaDesc = document.querySelector('meta[name="description"]');
if (metaDesc) {
    metaDesc.setAttribute("content", evento.descripcion || `Cobertura fotográfica de ${evento.titulo} en ${evento.lugar}.`);
}

document.getElementById("heroEvento").style.backgroundImage=
`linear-gradient(rgba(0,0,0,.45),rgba(0,0,0,.8)),url(imagenes/${evento.carpeta}/${evento.portada})`;

document.getElementById("heroEvento").innerHTML=`

<div class="heroEventoContenido">

<h1>${evento.titulo}</h1>

<p>${evento.lugar}</p>

<p>${evento.fecha}</p>

</div>

`;

let html = "";

const rutas = [];

evento.imagenes.forEach((nombre, i) => {

    const ruta = `imagenes/${evento.carpeta}/${nombre}`;

    rutas.push(ruta);

    html += `
        <div class="foto">
            <img
                src="${ruta}"
                loading="lazy"
                data-index="${i}">
        </div>
    `;

});

document.getElementById("contenedorFotos").innerHTML = html;

document.querySelectorAll(".foto img").forEach(img => {

    img.addEventListener("click", () => {

        abrirLightbox(rutas, Number(img.dataset.index));

    });

});

});