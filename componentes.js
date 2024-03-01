document.addEventListener("DOMContentLoaded", ()=>{
  const elementos = document.getqueryselectorAll("[href], [src]");

elementos.forEach(e => {
    const href = e.getAttribute("href");
    if(href) e.setAttribute(`.${href}`)
    else {
      const src = e.getAttribute("src")
      e.setAttribute(`.${src}`)
    }
})
})
