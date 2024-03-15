
window.addEventListener('load', () => {
    recuperarLocalStorage();
    mostrarProductos();
});

const shopContainer = document.querySelector('.Productos');

const products = JSON.parse(localStorage.getItem("cartProducts"));


let message = "¡Hola! Me gustaría ordenar los siguientes productos:\n";
products.forEach(product => {
    message += `- ${product.quantity} x ${product.title}\n`;
});


const phoneNumber = '+51912477927';
const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;


const btnWhatsApp = document.createElement('a');
btnWhatsApp.href = whatsappURL;
btnWhatsApp.target = '_blank';
btnWhatsApp.innerHTML = '<img src="wsp-logo.png" alt="WhatsApp">';

shopContainer.appendChild(btnWhatsApp);
