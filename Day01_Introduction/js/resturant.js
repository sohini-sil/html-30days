
// ===============================
// Restaurant Menu JavaScript
// ===============================

const categoryButtons = document.querySelectorAll(".category-btn");
const menuCards = document.querySelectorAll(".menu-card");
const searchInput = document.getElementById("searchInput");

const cart = document.getElementById("cart");
const cartOverlay = document.getElementById("cartOverlay");
const cartBtn = document.getElementById("cartBtn");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");

let selectedCategory = "all";
let order = [];

// ===============================
// Filter Menu
// ===============================

function filterMenu() {
    const searchTerm = searchInput.value.toLowerCase().trim();

    menuCards.forEach(card => {
        const category = card.dataset.category;
        const name = card.dataset.name.toLowerCase();

        const categoryMatch =
            selectedCategory === "all" ||
            category === selectedCategory;

        const searchMatch =
            name.includes(searchTerm);

        if (categoryMatch && searchMatch) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

categoryButtons.forEach(button => {
    button.addEventListener("click", () => {

        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        selectedCategory = button.dataset.category;

        filterMenu();
    });
});

searchInput.addEventListener("input", filterMenu);

// ===============================
// Add Item To Cart
// ===============================

const addButtons = document.querySelectorAll(".add-btn");

addButtons.forEach(button => {
    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const existingItem = order.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            order.push({
                name: name,
                price: price,
                quantity: 1
            });
        }

        updateCart();

        // Open cart automatically
        openCart();

        // Small button feedback
        const originalText = button.textContent;
        button.textContent = "Added ✓";

        setTimeout(() => {
            button.textContent = originalText;
        }, 1000);
    });
});

// ===============================
// Update Cart
// ===============================

function updateCart() {

    cartItems.innerHTML = "";

    if (order.length === 0) {
        cartItems.innerHTML =
            '<p class="empty-cart">Your order is empty.</p>';

        cartCount.textContent = "0";
        cartTotal.textContent = "0";
        return;
    }

    let total = 0;
    let itemCount = 0;

    order.forEach((item, index) => {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;
        itemCount += item.quantity;

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <p>
                    ₹${item.price} × ${item.quantity}
                    = ₹${itemTotal}
                </p>
            </div>

            <button
                class="remove-item"
                data-index="${index}"
                title="Remove item">
                ×
            </button>
        `;

        cartItems.appendChild(cartItem);
    });

    cartCount.textContent = itemCount;
    cartTotal.textContent = total;

    // Remove item events
    document.querySelectorAll(".remove-item").forEach(button => {

        button.addEventListener("click", () => {

            const index = Number(button.dataset.index);

            if (order[index].quantity > 1) {
                order[index].quantity--;
            } else {
                order.splice(index, 1);
            }

            updateCart();
        });
    });
}

// ===============================
// Open Cart
// ===============================

function openCart() {
    cart.classList.add("open");
    cartOverlay.classList.add("show");
    document.body.style.overflow = "hidden";
}

// ===============================
// Close Cart
// ===============================

function closeCartPanel() {
    cart.classList.remove("open");
    cartOverlay.classList.remove("show");
    document.body.style.overflow = "";
}

cartBtn.addEventListener("click", openCart);

closeCart.addEventListener("click", closeCartPanel);

cartOverlay.addEventListener("click", closeCartPanel);

// ===============================
// Checkout
// ===============================

checkoutBtn.addEventListener("click", () => {

    if (order.length === 0) {
        alert("Your order is empty.");
        return;
    }

    const total = order.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    alert(
        `Thank you for your order!\n\n` +
        `Order Total: ₹${total}\n\n` +
        `Our restaurant team will contact you shortly.`
    );

    order = [];
    updateCart();
    closeCartPanel();
});


updateCart();
