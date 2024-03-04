const URL = location.toString()
let contenidoPrincipal = null
document.addEventListener("DOMContentLoaded", ()=>{
    const contenedorPrincipal = document.getElementById("MainContent")
    contenidoPrincipal = contenedorPrincipal.outerHTML

    const links = document.querySelectorAll("[ruta]")
    links.forEach(link => {
        link.addEventListener("click", (e) => {
            const ruta = link.getAttribute("ruta")
            obtenerPagina(ruta, contenedorPrincipal)
        })
    })
})

function obtenerPagina(pagina, contenedor){
    fetch(`${URL}templates/${pagina}`)
    .then(response => response.text())
    .then(data => {
        console.log(data)
        while (contenedor.firstChild) {
            contenedor.removeChild(contenedor.firstChild);
        }
        contenedor.appendChild(textToHTML(data))
    })
    .catch(error => console.log(error))
}

function textToHTML(stringHTML){
    const parser = new DOMParser();
    const doc = parser.parseFromString(stringHTML, "text/html");
    return doc.documentElement
}