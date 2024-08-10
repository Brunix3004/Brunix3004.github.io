const origin = location.origin
const pathname = location.pathname
const path_sin_hash = pathname.split("#")[0]
const MYURL = origin.includes("github") ? `${origin}/Multiservicios_Brufas/` : `${origin}/${path_sin_hash}`

let contenidoPrincipal = null
let arrSugerencias = []
let sugerencias = null

document.addEventListener("DOMContentLoaded", (e) => {
    const contenedorPrincipal = document.getElementById("MainContent")
    sugerencias = document.getElementById("sugerencias")
    contenidoPrincipal = document.getElementById("inicio")
    const inputBuscar = document.getElementById("inputBuscar")
    const formBusqueda = document.getElementById("search")

    window.addEventListener("hashchange", (e) => procesarHash(contenedorPrincipal))
    if (location.hash) procesarHash(contenedorPrincipal)

    const searchParams = new URLSearchParams(location.search);
    const param = searchParams.get('buscar')

    if (param) {
        inputBuscar.value = param
        crearSugerencias(param).then(data => {
            arrSugerencias = data
            handlerBuscar(param, contenedorPrincipal)
        })
    }

    inputBuscar.addEventListener("keyup", mostrarSugerencias)
    formBusqueda.addEventListener("submit", (e) => {
        e.preventDefault()
        handlerBuscar(e.target.buscar.value, contenedorPrincipal)
    })
    document.addEventListener("click", (e) => sugerencias.innerHTML = "")
})

function limpiarContenedorPrincipal() {
    const elementoPadre = contenidoPrincipal.parentElement;
    if (elementoPadre.children.length > 1) {
        elementoPadre.removeChild(elementoPadre.lastElementChild)
    }
}

function agregarAlContenedor(contenedor, html) {
    limpiarContenedorPrincipal()
    contenedor.appendChild(html)
}

function procesarHash(contenedor) {
    const hash = location.hash

    if (!hash) {
        contenidoPrincipal.setAttribute("show", "true")
        contenidoPrincipal.style.display = "block"
        limpiarContenedorPrincipal()
        return
    }

    const element = document.querySelector(`[href="${hash}"]`)
    const ruta = element.getAttribute("ruta")
    
    if (ruta) {
        if(hash != "#Terminar-Pedido"){
            obtenerPagina(ruta, contenedor, mapearProductos)
            return;
        }
        
        const callbackTerminar = () => {
            cargarJs("./js/end-shopping.js")
            
        }
        obtenerPagina(ruta, contenedor, callbackTerminar)
    }
}

function obtenerPagina(pagina, contenedor, callback) {
    fetch(`${MYURL}/templates/${pagina}`)
        .then(response => response.text())
        .then(data => {
            if (contenidoPrincipal.getAttribute("show") == "true") {
                contenidoPrincipal.style.display = "none"
                contenidoPrincipal.setAttribute("show", "false")
            }
            agregarAlContenedor(contenedor, textToHTML(data))
            callback()
        })
        //.catch(error => console.log(error))
}

function textToHTML(stringHTML) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(stringHTML, "text/html");
    return doc.documentElement
}

// BARRA DE BUSQUEDA
async function mostrarSugerencias(e) {
    const input = e.target
    const key = e.key

    if (key == "Escape") {
        sugerencias.innerHTML = ""
        return
    }

    if (input.value.length > 0) {
        document.getElementById("search").classList.add("active")
    } else {
        document.getElementById("search").classList.remove("active")
    }

    const listaSugerencias = await crearSugerencias(input.value)
    arrSugerencias = listaSugerencias

    sugerencias.innerHTML = listaSugerencias.map(prod => `<li>${prod.nombre}</li>`).slice(0, 10).join("")
    sugerencias.querySelectorAll("li").forEach(li => {
        li.addEventListener("click", () => {
            input.value = li.innerText
            sugerencias.innerHTML = ""
        })
    })
}

async function obtenerProductos() {
    if (localStorage.getItem("productos"))
        return JSON.parse(localStorage.getItem("productos"))

    const res = await fetch(`${MYURL}/productos.json`)
    localStorage.setItem("productos", JSON.stringify(await res.json()))
    return JSON.parse(localStorage.getItem("productos"))
}

async function crearSugerencias(valor) {
    const productos = await obtenerProductos()
    return productos.filter(prod => prod.nombre.toLowerCase().includes(valor.toLowerCase()))
}

function handlerBuscar(query, contenedor) {
    history.pushState({}, "", `?buscar=${query}`)

    cargarJs("https://cdn.tailwindcss.com")
    const callback = () => {
        const ResProductos = document.getElementById("ResProductos")
        const temp = arrSugerencias.map(prod => `<div class="flex items-center justify-start space-x-4">
                <img src="./IMAGENES/${prod.ruta_imagen}" width="120" height="120" alt="${prod.nombre}"
                    class="aspect-square overflow-hidden rounded-lg object-cover object-center">
                <div class="grid gap-1 w-full">
                    <h3 class="font-semibold">${prod.nombre}</h3>
                    <div class="flex justify-between">
                        <p class="font-semibold text-emerald-600"> S/ ${prod.precio}</p>
                        <div class="w-10 h-10 flex bg-white rounded-full border border-black cursor-pointer hover:scale-105">
                            <svg class="w-6 h-6 m-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>
                        </div>

                    </div>
                </div>
            </div>`
        )
        ResProductos.innerHTML = temp.join("")
    }
    obtenerPagina("buscar.html", contenedor, callback)
}

function cargarJs(url) {
    const script = document.createElement("script")
    script.src = url
    document.body.appendChild(script)
    return script
}