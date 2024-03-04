const origin = location.origin
const pathname = location.pathname
const path_sin_hash = pathname.split("#")[0]
const URL = origin.includes("github") ? `${origin}/Multiservicios_Brufas/` : `${origin}/${path_sin_hash}`

let contenidoPrincipal = null
document.addEventListener("DOMContentLoaded", ()=>{
    const contenedorPrincipal = document.getElementById("MainContent")
    contenidoPrincipal = contenedorPrincipal.outerHTML

    window.addEventListener("hashchange", (e) => procesarHash(contenedorPrincipal))

    if(location.hash){
        procesarHash(contenedorPrincipal)
    }
})

function procesarHash(contenedor){
    const hash = location.hash
    if(!hash)
        return contenedor.innerHTML = contenidoPrincipal

    const element = document.querySelector(`[href="${hash}"]`)
    const ruta = element.getAttribute("ruta")
    
    if(ruta) 
        obtenerPagina(ruta, contenedor)
}

function obtenerPagina(pagina, contenedor){
    fetch(`${URL}/templates/${pagina}`)
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