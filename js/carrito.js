const btnCart = document.querySelector('.container-cart-icon')
const containerCartProducts = document.querySelector('.container-cart-products')

btnCart.addEventListener('click', ()=> {
    containerCartProducts.classList.toggle('hidden-cart')
})
/*Funcional*/ 
const cartInfo = document.querySelector('.cart-product')
const rowProduct = document.querySelector('.row-product')

/*Variable de arreglos de Productos */
let allProducts=[]

const valorTotal = document.querySelector('.total-pagar')

const countProducts = document.querySelector('#contador-productos')

function mapearProductos(){
    /* Lista de todos los contenedores de productos*/
    const productList = document.querySelector('.contenido')
    
    productList.addEventListener('click', e =>{
        if (e.target.classList.contains('btn-add-cart')) {
            const product = e.target.parentElement
    
            const infoProduct = {
                quantity: 1,
                title: product.querySelector('h2').textContent,
                price: product.querySelector('p').textContent
            };
            
            const exits = allProducts.some(product => product.title === infoProduct.title)
            if (exits){
                const products = allProducts.map(product => {
                    if (product.title === infoProduct.title) {
                        product.quantity++;
                        return product;
                    } 
                    else{
                        return product
                    }
                })
                allProducts = [...products]
            }
            else{
                allProducts= [...allProducts, infoProduct]
            }
    
            showHTML();
        }  
    })
}

/*Funcion para eliminar productos*/
rowProduct.addEventListener('click', (e) => {

    const product = e.target.parentElement;
    const title = product.querySelector('p').textContent;
    const targetProduct = allProducts.find(product => product.title === title);

    if (e.target.classList.contains('btn-decrease-quantity')) {
        if (targetProduct.quantity > 1) {
            targetProduct.quantity--;
        }
        /*FALTA AGREGAR QUE SI ES UNO SE ELIMINE EL PRODUCTO
        LO HAGO LUEGO*/
        else if (targetProduct.quantity === 1) {
            
        }
    } 
    else if (e.target.classList.contains('btn-increase-quantity')) {
        targetProduct.quantity++;
    }

    else if (e.target.classList.contains('icon-close')) {
        const product = e.target.parentElement;
        const title = product.querySelector('p').textContent;

        allProducts = allProducts.filter(
            product => product.title !== title
        );
        showHTML();
    }
    showHTML();
});


/*Funcion para mostrar en el HTML*/
const showHTML = () => {

    if (!allProducts.length) {
        containerCartProducts.innerHTML = `
        <p class = "cart-empty"> El carrito esta vacío</p>
        `
    }
    
    /*Limpiar HTML */
    rowProduct.innerHTML = '';

    let total = 0; /*Para pagar*/
    let totalOfProducts = 0; /*Total elementos */

    allProducts.forEach(product => {
        const containerProduct = document.createElement('div')
        containerProduct.classList.add('cart-product')
        containerProduct.innerHTML = `
            <div class="info-cart-product">
                <button class="btn-decrease-quantity">-</button>
                <span class="cantidad-producto-carrito"> ${product.quantity} </span>
                <button class="btn-increase-quantity">+</button>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        `
        rowProduct.append(containerProduct)
        total += product.quantity * parseFloat(product.price.slice(2).trim());
        totalOfProducts = totalOfProducts + product.quantity;
    })

    const solSymbol = 'S/ ';
    valorTotal.innerText = `${solSymbol}${total}`;
    countProducts.innerText = totalOfProducts;

    
}