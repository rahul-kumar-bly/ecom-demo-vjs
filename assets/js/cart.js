const fetchCartData = async (data) => {
    try {
    const response = await fetch(data);
    if (!response.ok){
        console.log(`response is not ok`, response.status);
    }
    return await response.json();
    } catch (error){
        console.log(`error loading data ${error}`);
    }
}

let generateCartItems = async () => {
    let cartItems = calculateCartItems();
    console.log('this function hasbeen called!')
    const data = await fetchCartData('../../data/data.json');
    if (cartItems.length > 0){
        const shoppingCart = document.getElementById('products');
        shoppingCart.innerHTML = cartItems.map((item) => {
            const {id} = item;
            let search = data.gameData.find((dataItem) => dataItem.id === id) || [];
            return `
                <div class="product" id="product">
                    <a href="./product.html?id=${search.id}">
                    <div class="product-image" id="productImage">
                        <img src="${search.img}" alt="${search.name}">
                    </div>                
                    </a>
                    <div class="product-details">
                    <div class="product-name" id="productName">
                        <h3>${search.name}</h3>
                    </div>
                    <div class="product-price" id="productPrice">
                        <p>${search.price}</p>
                    </div>
                    <div class="cart-operations">
                    <div class="move-to-wishlist" id="moveToWishlit">
                        <button>Move to wishlist</button>
                    </div>                    
                    <div class="remove-from-cart" id="removeFromCart">
                        <button onclick="removeFromCart(${search.id})"><i class="bi bi-trash"></i></button>
                    </div>
                    </div>
                    </div>
                </div>
            `
        }).join("")
    }
}

generateCartItems();

const removeFromCart = (id) => {
    let cartItems = calculateCartItems();
    console.log('id is ', id.toString());
    cartItems = cartItems.filter((item) => item.id !== id.toString());
    localStorage.setItem('cartData', JSON.stringify(cartItems));
    generateCartItems();
    calculate(cartItems, 'cartCount');
}

let calculate = (localStorageDatabase, selectionCountId) => {
    let selectionCountElement = document.getElementById(selectionCountId);
    console.log(localStorageDatabase.length);
    selectionCountElement.innerHTML = localStorageDatabase.length;
}


calculate(calculateCartItems(), 'cartCount');

