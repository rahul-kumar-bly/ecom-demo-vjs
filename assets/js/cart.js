let generateCartItem = (product) => {
    const {id, name, price, img} = product;
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.id = `product-${id}`;

    productDiv.innerHTML = `
        <a href="./product.html?id=${id}">
            <div class="product-image" id="productImage">
                <img src="${img}" alt="${name}">
            </div>                
        </a>
        <div class="product-details">
            <div class="product-name-price">
                <div class="product-name" id="productName">
                    <h3 title="${name}">${name.length < 20 ? name : name.slice(0, 21) + '...'}</h3>
                </div>
                <div class="product-price" id="productPrice">
                    <p>${price}</p>
                </div>
            </div>

            <div class="cart-operations" id="cartOperations-${id}">
                <div class="move-to-wishlist"></div>
                <div class="remove-from-cart"></div>
            </div>
        </div>
    `;
    console.log('name lenght is:', name.length);
    const moveToWishlistButton = document.createElement('button');
    moveToWishlistButton.classList.add('move-to-wishlist-button');
    moveToWishlistButton.innerText = 'Move To Wishlist';

    const isInWishlist = localWishlist.some(item => item.id === id);
    if (isInWishlist) {
        moveToWishlistButton.innerText = 'Item in Wishlist';
        moveToWishlistButton.disabled = true;
    }

    moveToWishlistButton.addEventListener('click', () => {
        moveToWishlist(id);
    });

    const moveToWishlistDiv = productDiv.querySelector('.move-to-wishlist');
    moveToWishlistDiv.appendChild(moveToWishlistButton);

    const removeFromCartButton = document.createElement('button');
    removeFromCartButton.classList.add('remove-from-cart');
    removeFromCartButton.innerText = 'Remove from cart';

    removeFromCartButton.addEventListener('click', () => {
        removeFromCart(id);
    })

    const removeFromCartDiv = productDiv.querySelector('.remove-from-cart');
    removeFromCartDiv.appendChild(removeFromCartButton);
    return productDiv;
}

let generateCartItems = async () => {
    const data = await loadData('https://rahul-kumar-bly.github.io/ecom-demo-vjs/data/data.json');
    const shoppingCart = document.getElementById('products');
    if (localCart.length > 0){
        shoppingCart.innerHTML = '';
        localCart.forEach(item => {
            let search = data.gameData.find((dataItem)=> dataItem.id === item.id) || {};
            shoppingCart.append(generateCartItem(search));
        })
    } else {
        shoppingCart.innerHTML = '';
        const container = document.querySelector('.container');
        const noItem = document.querySelector('.no-item-found');
        container.style.visibility = 'hidden';
        noItem.style.visibility = 'visible';
    }
}

generateCartItems();


let removeFromCart = (productId) => {
    let search = localCart.find(item => item.id === productId);
    if (search !== undefined) {
        localCart = localCart.filter(item => item.id !== productId);
    }
    else {
        return;
    }
    localStorage.setItem('cartData', JSON.stringify(localCart));
    calculate(localCart, 'cartCount');
    generateCartItems();
    calculateCartPrice();
}

let moveToWishlist = (productId) => {
    let search = localWishlist.find(item => item.id === productId);
    console.log('adding item to wishlist....')
    if (search === undefined) {
        localWishlist.push({id:productId});
        localCart = localCart.filter(item => item.id !== productId);
        localStorage.setItem('cartData', JSON.stringify(localCart));
        localStorage.setItem('wishlistData', JSON.stringify(localWishlist));
        calculate(localCart, 'cartCount');
        calculate(localWishlist, 'wishlistCount');
        generateCartItems();
        calculateCartPrice();
    }
}

let calculateCartPrice = async () => {
    const data = await loadData('https://rahul-kumar-bly.github.io/ecom-demo-vjs/data/product.json');
    // console.log(data.gameData);
    const price = [];
    document.querySelector('.full-price').innerHTML = '';
    localCart.forEach(item => {
        let search = data.gameData.find(game => item.id === game.id);
        price.push(search.price.replace("₹", ""));
    })
    const totalPrice = price.reduce((a, b) => parseInt(a) +parseInt(b));
    console.log(totalPrice);
    document.querySelector('.full-price').innerHTML += `Full Price - ${totalPrice}`;
}
calculateCartPrice();

calculate(localCart, 'cartCount');
calculate(localWishlist, 'wishlistCount');

