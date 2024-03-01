document.addEventListener("DOMContentLoaded", ()=>{
  const elementos = document.querySelectorAll("[href], [src]");

  elementos.forEach(e => {
      const href = e.getAttribute("href");
    ìf (href && href.startsWith("https")) return 
      if(href) e.setAttribute("href", `..${href}`)
      else {
        const src = e.getAttribute("src")
        ìf (src && src.startsWith("https")) return
        e.setAttribute("src", `..${src}`)
      }
  })
})
