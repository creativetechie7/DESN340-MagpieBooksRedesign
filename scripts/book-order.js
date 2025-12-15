// Book Detail Page - Quantity Selector and Add to Cart Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const decreaseBtn = document.getElementById('decreaseBtn');
    const increaseBtn = document.getElementById('increaseBtn');
    const quantityInput = document.querySelector('.quantityInput');
    const addToCartBtn = document.querySelector('.addToCartButton');
    const clearCartBtn = document.getElementById('clearCartButton'); // TEMPORARY: Dev function
    const shoppingBagIcon = document.querySelector('.shoppingAccountActions button:last-child');

    // Initialize cart count from localStorage
    let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
    const stockStatus = document.querySelector('.stockStatus');
    updateCartBadge();
    updateStockStatus();

    // Decrease quantity
    decreaseBtn.addEventListener('click', function() {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });

    // Increase quantity
    increaseBtn.addEventListener('click', function() {
        let currentValue = parseInt(quantityInput.value);
        quantityInput.value = currentValue + 1;
    });

    // Add to cart
    addToCartBtn.addEventListener('click', function() {
        let quantityToAdd = parseInt(quantityInput.value);

        // Check if adding this quantity would exceed stock
        if (cartCount + quantityToAdd > 5) {
            // Only add what's available
            quantityToAdd = 5 - cartCount;
            if (quantityToAdd <= 0) {
                return; // Can't add any more
            }
        }

        cartCount += quantityToAdd;

        // Save to localStorage
        localStorage.setItem('cartCount', cartCount);

        // Update the badge and stock status
        updateCartBadge();
        updateStockStatus();

        // Optional: Reset quantity to 1 after adding to cart
        quantityInput.value = 1;

        // Optional: Add visual feedback
        addToCartBtn.textContent = 'Added!';
        setTimeout(() => {
            addToCartBtn.textContent = 'Add to Cart';
        }, 1000);
    });

    // TEMPORARY: Clear cart button for development
    clearCartBtn.addEventListener('click', function() {
        cartCount = 0;
        localStorage.removeItem('cartCount');
        updateCartBadge();
        updateStockStatus();

        // Visual feedback
        clearCartBtn.textContent = 'Cleared!';
        setTimeout(() => {
            clearCartBtn.textContent = 'Clear Cart (Dev)';
        }, 1000);
    });

    // Function to update cart badge
    function updateCartBadge() {
        // Remove existing badge if present
        const existingBadge = shoppingBagIcon.querySelector('.cartBadge');
        if (existingBadge) {
            existingBadge.remove();
        }

        // Add new badge if cart has items
        if (cartCount > 0) {
            const badge = document.createElement('span');
            badge.className = 'cartBadge';
            badge.textContent = cartCount;
            shoppingBagIcon.style.position = 'relative';
            shoppingBagIcon.appendChild(badge);
        }
    }

    // Function to update stock status
    function updateStockStatus() {
        const maxStock = 5;
        const remainingStock = maxStock - cartCount;

        if (remainingStock <= 0) {
            stockStatus.textContent = 'Out of Stock';
            stockStatus.classList.add('outOfStock');
            addToCartBtn.disabled = true;
            addToCartBtn.style.opacity = '0.5';
            addToCartBtn.style.cursor = 'not-allowed';
        } else {
            stockStatus.textContent = `${remainingStock} in stock`;
            stockStatus.classList.remove('outOfStock');
            addToCartBtn.disabled = false;
            addToCartBtn.style.opacity = '1';
            addToCartBtn.style.cursor = 'pointer';
        }
    }
});
