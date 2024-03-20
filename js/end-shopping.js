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
    
    //PARA ENVIAR MENSAJE A WSP
    
    
    // const whatsappLink = document.getElementById('whatsapp-link');
    
    // function enviarMensajeWhatsapp() {
    //     const numeroTelefono = '51965000115';
    //     const mensaje = 'Hola, quiero hacer un pedido';
    //     const url = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(mensaje)}`;
    //     window.open(url, '_blank');
    // }
    
    // whatsappLink.addEventListener('click', function(event) {
    //     event.preventDefault();
    //     enviarMensajeWhatsapp();
    // });
    showProductos()
})()
