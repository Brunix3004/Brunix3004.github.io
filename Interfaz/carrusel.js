document.addEventListener("DOMContentLoaded", function() {
    const carrusel = document.querySelector('.carrusel');
    const slidesContainer = document.querySelector('.slides-container');

    let index = 0;

    function avanzarCarrusel() {
        index = (index + 1) % 3;
        actualizarCarrusel();
    }

    function retrocederCarrusel() {
        index = (index - 1 + 3) % 3;
        actualizarCarrusel();
    }

    function actualizarCarrusel() {
        const translateValue = -index * 33.33 + '%';
        slidesContainer.style.transform = 'translateX(' + translateValue + ')';
    }

    setInterval(avanzarCarrusel, 5000); // Cambiar de slide cada 3 segundos

    actualizarCarrusel();
});
