const btnCart = document.querySelector('.container-cart-icon')
const containerCartProducts = document.querySelector('.container-cart-products')
const copyContainerCartProducts = containerCartProducts.cloneNode(true)
const btnEndShopping = document.querySelector('.btn-end-shop');

window.addEventListener('load', () => {
    showHTML();
    recuperarLocalStorage();
    showHTML();     
    if (allProducts.length > 0) {
        btnEndShopping.style.display = 'block';
    } else {
        btnEndShopping.style.display = 'none';
    }
})

btnCart.addEventListener('click', ()=> {
    containerCartProducts.classList.toggle('hidden-cart');
})

/*Funcional*/ 
const cartInfo = document.querySelector('.cart-product')
const rowProduct = document.querySelector('.row-product')

/*Variable de arreglos de Productos */
let allProducts = []

const valorTotal = document.querySelector('.total-pagar')

const countProducts = document.querySelector('#contador-productos')

function subirLocalStorage(){
    localStorage.setItem("cartProducts",JSON.stringify(allProducts));
    console.log("Array: " , localStorage.getItem("cartProducts"));
}

function recuperarLocalStorage(){
    allProducts = JSON.parse(localStorage.getItem("cartProducts")) ?? [];
    console.log("Parseado: ", allProducts);     
}
 
function mapearProductos(){
    /* Lista de todos los contenedores de productos*/
    const productList = document.querySelector('.contenido')
    if(!productList) return
    
    productList.addEventListener('click', e =>{

        if (e.target.classList.contains('btn-add-cart')) {
            const product = e.target.parentElement
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
            showProductos();

            btnEndShopping.style.display = 'block';
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
        else if (targetProduct.quantity === 1) {
            const index = allProducts.findIndex(product => product.title === title);
            allProducts.splice(index, 1);
            localStorage.removeItem(title);
        }
    } 
    else if (e.target.classList.contains('btn-increase-quantity')) {
        targetProduct.quantity++;
    }

    else if (e.target.classList.contains('icon-close')) {
        // Eliminar del array
        const index = allProducts.findIndex(product => product.title === title);
        allProducts.splice(index, 1);
        // Eliminar del localStorage
        localStorage.removeItem(title);
    }
    subirLocalStorage();
    showHTML();

    if (allProducts.length === 0) {
        btnEndShopping.style.display = 'none';
    }
});

/*Funcion para mostrar en el HTML*/
const showHTML = () => {

    if (!allProducts.length) {
        if(!containerCartProducts.lastElementChild.classList.contains('cart-empty')){
            const p = Object.assign(document.createElement('p'), {className: 'cart-empty', textContent: 'El carrito está vacío'})
            containerCartProducts.appendChild(p)
        }
        containerCartProducts.firstElementChild.style.display = "none" // Ocultar cosas del carro
        containerCartProducts.lastElementChild.style.display = "block" // Mostrar mensaje de carro vacio 
        countProducts.innerText = 0;
        
        return;
    } else {
        containerCartProducts.firstElementChild.style.display = "block" // Mostrar productos
        containerCartProducts.lastElementChild.style.display = "none"   // Ocultar mensaje de carro vacio   
    }
    
    /*Limpiar HTML */
    rowProduct.innerHTML = '';

    let total = 0; /*Para pagar*/
    let totalOfProducts = 0; /*Total elementos */


    /*Boton para borrar todo */
    const btnDeleteAll = document.createElement('button');
    btnDeleteAll.textContent = 'Borrar todo';
    btnDeleteAll.classList.add('btn-delete-all');
    rowProduct.appendChild(btnDeleteAll);

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

    btnDeleteAll.addEventListener('click', () => {
        localStorage.clear();        
        allProducts = [];
        // Ocultar el botón 
        if (containerCartProducts.contains(btnEndShopping)) {
            containerCartProducts.removeChild(btnEndShopping);
        }          
        showHTML();
    });
}

