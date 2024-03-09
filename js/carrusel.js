/**Carrusel 1 */
document.addEventListener("DOMContentLoaded", function() {
    const slidesContainer = document.querySelector('.slides-container');
    const dots = document.querySelectorAll('.paginationC .dotC');

    let index = 0;
    const totalSlides = 9;
    let intervalId;

    function avanzarCarrusel() {
        index = (index + 3) % totalSlides; // Ajusta según la cantidad de slides que tengas
        actualizarCarrusel();
    }

    function cambiarSlide(nuevoIndex) {
        clearInterval(intervalId);
        index = nuevoIndex * 3; 
        actualizarCarrusel();
        iniciarIntervalo();
    }

    function actualizarCarrusel() {
        const translateValue = -index * 33.33 + '%';
        slidesContainer.style.transform = 'translateX(' + translateValue + ')';
        actualizarPaginacion();
    }

    function actualizarPaginacion() {
        // Divide el índice por 3 para mapear el índice actual al índice de la paginación
        const paginationIndex = Math.floor(index / 3);
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === paginationIndex);
        });
    }

    function iniciarIntervalo() {
        intervalId = setInterval(avanzarCarrusel, 5000);
    }

    // Inicializa los círculos de paginación
    dots.forEach((dot, i) => {
        dot.addEventListener('click', function() {
            cambiarSlide(i);
        });
    });

    iniciarIntervalo();

    actualizarCarrusel();
});



/**Carrusel Promocionales */
document.addEventListener("DOMContentLoaded", function() {
    const slidesContainer = document.querySelector('.slides-promotion-container');
    const dots = document.querySelectorAll('.pagination .dot');

    let index = 0; // Inicializa en -1
    const totalSlides = 6; // Ajusta según la cantidad de slides que tengas
    let intervalId;

    function avanzarCarrusel() {
        index = (index + 1) % totalSlides;
        actualizarCarrusel();
    }

    function cambiarSlide(nuevoIndex) {
        clearInterval(intervalId);
        index = nuevoIndex;
        actualizarCarrusel();
        iniciarIntervalo(); 
    }

    function actualizarCarrusel() {
        const translateValue = -index * 100 + '%';
        slidesContainer.style.transform = 'translateX(' + translateValue + ')';
        actualizarPaginacion();
    }

    function actualizarPaginacion() {
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function iniciarIntervalo() {
        intervalId = setInterval(avanzarCarrusel, 5000);
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', function() {
            cambiarSlide(i);
        });
    });

    iniciarIntervalo();
    actualizarCarrusel();
});