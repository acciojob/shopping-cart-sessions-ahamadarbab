// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearBtn = document.getElementById("clear-cart-btn");

const CART_KEY = "cart";

// get cart from sessionStorage
function getCart() {
	return JSON.parse(sessionStorage.getItem(CART_KEY)) || [];
}

// save cart to sessionStorage
function setCart(cart) {
	sessionStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
  const cart = getCart();
  cartList.innerHTML = "";

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
	const product = products.find((p) => p.id === Number(productId));
	if (!product) return;

	// ALWAYS get latest cart from sessionStorage
	const cart = getCart();

	// push new item (allow duplicates)
	cart.push({
		id: product.id,
		name: product.name,
		price: product.price
	});

	// save updated cart
	setCart(cart);

	// re-render UI
	renderCart();

}

// Remove item from cart
function removeFromCart(productId) {
	let cart = getCart();

	cart = cart.filter((item) => item.id !== Number(productId));

	setCart(cart);
	renderCart();
}

// Clear cart
function clearCart() {
	sessionStorage.removeItem(CART_KEY);
	renderCart();
}

// Event delegation for product buttons
productList.addEventListener("click", (e) => {
	if (e.target.classList.contains("add-to-cart-btn")) {
		const id = e.target.getAttribute("data-id");
	    addToCart(id);
	}
});

// Event delegation for remove buttons in cart
cartList.addEventListener("click", (e) => {
	if (e.target.classList.contains("remove-btn")) {
	    const id = e.target.getAttribute("data-id");
	    removeFromCart(id);
	}
});

// Clear cart button
clearBtn.addEventListener("click", clearCart);


// Initial render
renderProducts();
renderCart();
