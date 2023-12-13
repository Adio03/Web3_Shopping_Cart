// Sample product data
const products = [
    { id: 1, name: 'Pencil',    price: 5 },
    { id: 2, name: 'Biro',      price: 10},
    { id: 3, name: 'NoteBook',  price: 15 },
    { id: 4, name: 'Eraser',    price: 5 },
    { id: 5, name: 'CardBoard', price: 7 },
    { id: 6, name: 'Sharper',   price: 5 },
    { id: 7, name: 'TextBook',  price: 20 },
    { id: 8, name: 'SchoolBag', price: 30 },
    { id: 9, name: 'Uniform',   price: 30 },
    { id: 10,name: 'Socks',     price: 10}
];


let cart = JSON.parse(localStorage.getItem('cart'));

window.onload = function () {
    displayProducts();
    displayCart();
};


function displayProducts() {
    const productList = document.getElementById('product-list');

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-item');
        productDiv.innerHTML = `<p>${product.name}</p>
                           <p>$${product.price}</p>
                           <button onclick="addProductToCart(${product.id})">Add to Cart</button>`;
        productList.appendChild(productDiv);
    });
}


function addProductToCart(productId) {
    const product = products.find(p => p.id === productId);

    if (product) {
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id: productId, name: product.name, price: product.price, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        displayCart();
    }
}


function displayCart() {
    const cartItems = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');


    cartItems.innerHTML = '';

    cart.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('cart-item');
        li.innerHTML = `<p>${item.name}</p>
                    <p>$${item.price} x ${item.quantity}</p>
                    <button onclick="increaseQuantity(${item.id})">+</button>
                    <button onclick="decreaseQuantity(${item.id})">-</button>
                    <button onclick="removeProductFromCart(${item.id})">Remove</button>`;
        cartItems.appendChild(li);
    });


    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    totalElement.textContent = total.toFixed(2);
}


function increaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);

    if (item) {
        item.quantity++;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }
}


function decreaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);

    if (item && item.quantity > 1) {
        item.quantity--;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }
}


function removeProductFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function applyCoupon() {
    const couponInput = document.getElementById('coupon-input');
    const couponCode = couponInput.value.trim();

    if (couponCode === 'WEB3BRIDGECOHORTx') {
        const totalElement = document.getElementById('total');
        const currentTotal = parseFloat(totalElement.textContent);
        const discount = currentTotal * 0.1;
        const discountedTotal = currentTotal - discount;

        totalElement.textContent = discountedTotal.toFixed(2);
    } else {
        alert('Invalid coupon code');
    }
}
