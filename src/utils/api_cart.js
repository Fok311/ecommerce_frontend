

export function addToCart(product) {
    // Retrieve existing cart data from local storage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if the product already exists in the cart
    const Products = cart.findIndex(p => p._id === product._id);
    if (Products !== -1) {
        // If the product exists, update its quantity
        console.log('Existing product found:', cart[Products]);
        cart[Products].quantity += 1;
        console.log('Updated quantity:', cart[Products].quantity);
    } else {
        // If the product doesn't exist, add it to the cart
        console.log('Product not found, adding to cart:', product);
        cart.push({ ...product, quantity: 1 });
    }
    
    // Save the updated cart data back to local storage
    localStorage.setItem('cart', JSON.stringify(cart));
}
export function getCart() {
    // Retrieve cart data from local storage
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    return cartData;
  }

  export function removeItemFromCart(id) {
    // Retrieve cart data from local storage
    let cart = JSON.parse(localStorage.getItem('cart'));
  
    // Filter out the item with the specified id
    const updatedCart = cart.filter(p => p._id !== id);
  
    // Save the updated cart data back to local storage
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  
}
