/* JavaScript for functionality. */
document.getElementById('search-bar').addEventListener('input', function () {
    console.log("Search Query: ", this.value); // Replace with actual search functionality.
});

// Cart functionality
let cart = [];

// Add to Cart function
function addToCart(productName, productPrice) {
    const product = { name: productName, price: productPrice, quantity: 1 };

    // Check if the product is already in the cart
    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    }

    alert(`${productName} has been added to your cart.`);
    saveCart();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Display cart items on the cart page
function displayCart() {
    loadCart();
    const cartContainer = document.getElementById('cart-container');
    const totalContainer = document.getElementById('total-container');
    cartContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        totalContainer.innerHTML = '';
        return;
    }

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        const productRow = `
            <div class="cart-item">
                <span>${item.name}</span>
                <span>$${item.price} x ${item.quantity}</span>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
        cartContainer.innerHTML += productRow;
    });

    totalContainer.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
}

// Remove an item from the cart
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    displayCart();
}

// Load cart data on page load
loadCart();

// Toggle login/logout links
document.addEventListener('DOMContentLoaded', () => {
    const loginLink = document.getElementById('login-link');
    const logoutLink = document.getElementById('logout-link');
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn) {
        loginLink.style.display = 'none';
        logoutLink.style.display = 'inline-block';
    } else {
        loginLink.style.display = 'inline-block';
        logoutLink.style.display = 'none';
    }
});

// Simulated user credentials
const USER_CREDENTIALS = {
    username: "user",
    password: "password"
};

// Handle login
function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorElement = document.getElementById('login-error');

    if (username === USER_CREDENTIALS.username && password === USER_CREDENTIALS.password) {
        localStorage.setItem('isLoggedIn', 'true');
        alert('Login successful!');
        window.location.href = 'index.html';
    } else {
        errorElement.textContent = 'Invalid username or password.';
    }
}

// Check login status
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        alert('Please log in to access this page.');
        window.location.href = 'login.html';
    }
}

// Handle logout
function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'logout.html';
}


// Handle Signup
function handleSignup(event) {
    event.preventDefault();

    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    const errorElement = document.getElementById('signup-error');

    // Validate passwords match
    if (password !== confirmPassword) {
        errorElement.textContent = 'Passwords do not match.';
        return;
    }

    // Save user data to localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(user => user.username === username)) {
        errorElement.textContent = 'Username already exists.';
        return;
    }

    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Signup successful! You can now log in.');
    window.location.href = 'login.html';
}


// Handle Login with user data from localStorage
function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorElement = document.getElementById('login-error');

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem('isLoggedIn', 'true');
        alert('Login successful!');
        window.location.href = 'index.html';
    } else {
        errorElement.textContent = 'Invalid username or password.';
    }
}
