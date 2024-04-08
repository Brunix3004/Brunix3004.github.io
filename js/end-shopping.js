//PROCESO DE TERMINACION DE LA COMPRA
(function init(){
    const lista_productos = document.querySelector('.list-productos')
    const totalValor = document.querySelector('.total')
    
    
    const showProductos = () => {
        allProducts = JSON.parse(localStorage.getItem("cartProducts"));
        console.log("Hola");
        console.log(localStorage.getItem("allProducts"));
        
        lista_productos.innerHTML= ' ';
        let total = 0; 
    
        allProducts.forEach(product => {
            const productContainer = document.createElement('div');
            productContainer.classList.add('productos');
            productContainer.innerHTML= 
            `
                <div class="info-productos">
                    <span class="cantidad-producto-carrito"> ${product.quantity} </span>
                    <p class="titulo-producto-carrito">${product.title}</p>
                    <span class="precio-producto-carrito">${product.price}</span>
                </div>
            `
            lista_productos.append(productContainer);
            total += product.quantity * parseFloat(product.price.slice(2).trim());
        });
        const solSymbol = 'S/ ';
        totalValor.innerText = `${solSymbol}${total}`;
    }
    showProductos()

    const phoneNumber = '+51912477927';

    function construirMensaje() {
        let mensaje = "Hola, quisiera hacer este pedido:\n";

        allProducts.forEach((producto, index) => {
            mensaje += `${index + 1}. ${producto.quantity} x ${producto.title}\n`;
        });
        
        mensaje += `${solSymbol}${total}`;

        return encodeURIComponent(mensaje);
    }

    const btnWhatsApp = document.querySelector('.wsp-link');
    btnWhatsApp.addEventListener('click', function(event) {
        event.preventDefault();
        enviarPedidoPorWhatsApp();
    });

    function enviarPedidoPorWhatsApp() {
        const mensaje = construirMensaje();
        const url = `https://wa.me/${phoneNumber}?text=${mensaje}`;

        setTimeout(function() {
            window.open(url, '_blank');
        }, 1000);
    }

})()