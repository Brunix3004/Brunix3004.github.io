const origin = location.origin
const pathname = location.pathname
const path_sin_hash = pathname.split("#")[0]
const URL = origin.includes("github") ? `${origin}/Multiservicios_Brufas/` : `${origin}/${path_sin_hash}`

let contenidoPrincipal = null
document.addEventListener("DOMContentLoaded", ()=>{
    const contenedorPrincipal = document.getElementById("MainContent")
    contenidoPrincipal = document.getElementById("inicio")

    window.addEventListener("hashchange", (e) => procesarHash(contenedorPrincipal))

    if(location.hash) procesarHash(contenedorPrincipal)
    
    const inputBuscar = document.getElementById("inputBuscar")
    inputBuscar.addEventListener("keyup", (e) => mostrarSugerencias(inputBuscar))
})

function limpiarContenedorPrincipal(){
    const elementoPadre = contenidoPrincipal.parentElement;
    if(elementoPadre.children.length > 1) {
        elementoPadre.removeChild(elementoPadre.lastElementChild)
    }
}

function agregarAlContenedor(contenedor, html){
    limpiarContenedorPrincipal()
    contenedor.appendChild(html)
}

function procesarHash(contenedor){
    const hash = location.hash
    if(!hash){
        contenidoPrincipal.setAttribute("show", "true")
        contenidoPrincipal.style.display = "block"
        limpiarContenedorPrincipal()
        return
    }

    const element = document.querySelector(`[href="${hash}"]`)
    const ruta = element.getAttribute("ruta")
    
    if(ruta) 
        obtenerPagina(ruta, contenedor)
}

function obtenerPagina(pagina, contenedor){
    fetch(`${URL}/templates/${pagina}`)
    .then(response => response.text())
    .then(data => {
        if(contenidoPrincipal.getAttribute("show") == "true"){
            contenidoPrincipal.style.display = "none"
            contenidoPrincipal.setAttribute("show", "false")
        }
        agregarAlContenedor(contenedor, textToHTML(data))
        mapearProductos()
    })
    .catch(error => console.log(error))
}

function textToHTML(stringHTML){
    const parser = new DOMParser();
    const doc = parser.parseFromString(stringHTML, "text/html");
    return doc.documentElement
}

// BARRA DE BUSQUEDA
async function mostrarSugerencias(input){
    const sugerencias = document.getElementById("sugerencias")
    
    if(input.value.length > 0){
        document.getElementById("search").classList.add("active")
    } else{
        document.getElementById("search").classList.remove("active")
    }

    const listaSugerencias = await crearSugerencias(input.value)
    sugerencias.innerHTML = listaSugerencias.map(prod => `<li>${prod.nombre}</li>`).slice(0, 10).join("")
    sugerencias.querySelectorAll("li").forEach(li => {
        li.addEventListener("click", () => {
            input.value = li.innerText
            sugerencias.innerHTML = ""
        })
    })
}

async function crearSugerencias(valor){
    const req = await fetch(`${URL}/productos.json`)
    const data = await req.json()
    return data.filter(prod => prod.nombre.toLowerCase().includes(valor.toLowerCase()))
}