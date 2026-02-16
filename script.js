// Dummy Data to make it look full
const products = [
    { id: 1, name: "Premium Watch", price: 2999, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80" },
    { id: 2, name: "Noise Cancelling Headphones", price: 4500, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80" },
    { id: 3, name: "Smart Sunglasses", price: 1200, img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80" },
    { id: 4, name: "Minimalist Sneakers", price: 3200, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80" },
    { id: 5, name: "Leather Backpack", price: 1800, img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80" },
    { id: 6, name: "Mechanical Keyboard", price: 5500, img: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500&q=80" }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Render Products
function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">₹${product.price}</p>
            <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join('');
}

// Add to Cart
function addToCart(id) {
    const item = products.find(p => p.id === id);
    cart.push(item);
    updateCart();
}

// Update Cart UI
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    document.getElementById('cart-count').innerText = cart.length;
    
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <div>
                <h4>${item.name}</h4>
                <p>₹${item.price}</p>
            </div>
            <button onclick="removeFromCart(${index})" style="background:none; border:none; color:red; cursor:pointer;"><i class="fas fa-trash"></i></button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('total-price').innerText = total;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Toggle Cart Modal
function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = (modal.style.display === 'block') ? 'none' : 'block';
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCart();
});