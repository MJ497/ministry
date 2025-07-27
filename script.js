tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: "#4F46E5",
                        secondary: "#10B981",
                        accent: "#F59E0B"
                    },
                   
                }
            }
        };


           // Shopping Cart Functionality
        let cart = [];
        
        // DOM Elements
        const cartButton = document.getElementById('cart-button');
        const cartModal = document.getElementById('cart-modal');
        const closeCart = document.getElementById('close-cart');
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        const cartCount = document.getElementById('cart-count');
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        const checkoutBtn = document.getElementById('checkout-btn');
        
        // Toggle Cart Modal
        cartButton.addEventListener('click', () => {
            cartModal.classList.remove('hidden');
            updateCartDisplay();
        });
        
        closeCart.addEventListener('click', () => {
            cartModal.classList.add('hidden');
        });
        
        // Add to Cart
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                const title = e.target.getAttribute('data-title');
                const price = parseFloat(e.target.getAttribute('data-price'));
                
                // Check if item already in cart
                const existingItem = cart.find(item => item.id === id);
                
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({
                        id,
                        title,
                        price,
                        quantity: 1
                    });
                }
                
                updateCartCount();
                updateCartDisplay();
                
                // Show cart modal
                cartModal.classList.remove('hidden');
            });
        });
        
        // Update Cart Count
        function updateCartCount() {
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
        
        // Update Cart Display
        function updateCartDisplay() {
            // Clear current items
            cartItemsContainer.innerHTML = '';
            
            // Add each item
            cart.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'flex justify-between items-center mb-4 pb-4 border-b';
                itemElement.innerHTML = `
                    <div>
                        <h4 class="font-medium">${item.title}</h4>
                        <p class="text-gray-600">$${item.price.toFixed(2)} x ${item.quantity}</p>
                    </div>
                    <div class="flex items-center">
                        <span class="font-bold mr-4">$${(item.price * item.quantity).toFixed(2)}</span>
                        <button class="text-red-500 remove-item" data-id="${item.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
                cartItemsContainer.appendChild(itemElement);
            });
            
            // Calculate and display total
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            cartTotal.textContent = `$${total.toFixed(2)}`;
            
            // Add event listeners to remove buttons
            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', (e) => {
                    const id = e.target.closest('button').getAttribute('data-id');
                    cart = cart.filter(item => item.id !== id);
                    updateCartCount();
                    updateCartDisplay();
                });
            });
        }
        
        // Checkout
        checkoutBtn.addEventListener('click', () => {
            // In a real implementation, this would redirect to a payment processor
            alert('Redirecting to payment processor...');
            // For demo purposes, we'll just clear the cart
            cart = [];
            updateCartCount();
            updateCartDisplay();
            cartModal.classList.add('hidden');
        });
        
        // Form Submissions
        document.getElementById('donation-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const amount = document.getElementById('amount').value;
            const message = document.getElementById('message').value;
            
            // In a real implementation, this would process the donation
            alert(`Thank you for your donation of $${amount}!`);
            e.target.reset();
        });
        