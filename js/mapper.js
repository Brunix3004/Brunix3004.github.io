function mapearProductos(){
    /* Lista de todos los contenedores de productos*/
    console.log("Mapeando");
    const productList = document.querySelector('.contenido')
    if(!productList) return
    
    productList.addEventListener('click', e =>{

        if (e.target.classList.contains('btn-add-cart')) {
            console.log("Clik en agregar");
            const product = e.target.parentElement;
            //Para verificar el nombre del elemento
            const nombreElement = product.querySelector('.nombre');
            const title = nombreElement ? nombreElement.textContent : '';
            const price = product.getAttribute("data-precio") ?? product.querySelector('p').textContent

            const infoProduct = {
                quantity: 1,
                title,
                price
            };

            const existsIndex = allProducts.findIndex(product => product.title === infoProduct.title);

            if (existsIndex !== -1) {
                // El producto ya existe en el array
                allProducts = allProducts.map((product, index) => {
                    if (index === existsIndex) {
                        product.quantity++;
                    }
                    return product;
                });
            } else {
                // El producto no existe en el array, añadirlo
                allProducts = [...allProducts, infoProduct];
            }

            subirLocalStorage();
            showHTML();

            btnEndShopping.style.display = 'block';
        }  
    })
}