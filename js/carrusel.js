document.addEventListener("DOMContentLoaded", function() {
    const carrusel = document.querySelector('.carrusel');
    const slidesContainer = document.querySelector('.slides-container');

    let index = 0;

    function avanzarCarrusel() {
        index = (index + 3) % 9; // Ajusta según la cantidad de slides que tengas
        actualizarCarrusel();
    }

    function retrocederCarrusel() {
        index = (index - 3 + 9) % 9; // Ajusta según la cantidad de slides que tengas
        actualizarCarrusel();
    }

    function actualizarCarrusel() {
        const translateValue = -index * 33.33 + '%';
        slidesContainer.style.transform = 'translateX(' + translateValue + ')';
    }

    setInterval(avanzarCarrusel, 5000); // Cambiar de slide cada 5 segundos

    actualizarCarrusel();
});
