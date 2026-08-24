let cart = [];
let total = 0;

// Add item to cart
function addToCart(name, price) {

    cart.push({
        name: name,
        price: price
    });

    total += price;

    updateCart();

    alert(name + " added to cart!");
}




// Update cart display
function updateCart() {

    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const totalElement = document.getElementById("total");

    cartCount.textContent = cart.length;
    totalElement.textContent = total;

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cart.forEach((item, index) => {

        const div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `
            <span>
                ${item.name} - ₹${item.price}
            </span>

            <button
                class="remove-btn"
                onclick="removeFromCart(${index})">
                Remove
            </button>
        `;

        cartItems.appendChild(div);
    });
}


// Remove item from cart
function removeFromCart(index) {

    total -= cart[index].price;

    cart.splice(index, 1);

    updateCart();
}


// Filter menu items
function filterMenu(category) {

    const items = document.querySelectorAll(".menu-item");

    items.forEach(item => {

        if (category === "all") {
            item.style.display = "block";
        }

        else if (item.classList.contains(category)) {
            item.style.display = "block";
        }

        else {
            item.style.display = "none";
        }
    });
}


// Checkout
function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert(
        "Thank you for your order! Your total is ₹" + total
    );

    cart = [];
    total = 0;

    updateCart();
}


// Initial cart display
updateCart();