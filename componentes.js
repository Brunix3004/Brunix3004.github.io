document.addEventListener("DOMContentLoaded", ()=>{
  const elementos = document.querySelectorAll("[href], [src]");

  elementos.forEach(e => {
      const href = e.getAttribute("href");
    if (href.startsWith ("https")) return 
      if(href) e.setAttribute("href", `..${href}`)
      else {
        const src = e.getAttribute("src")
        if (src.startsWith ("https")) return
        e.setAttribute("src", `..${src}`)
      }
  })
})
