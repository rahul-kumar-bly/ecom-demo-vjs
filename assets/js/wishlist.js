let generateWishlistItem = (product) => {
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

            <div class="wishlist-operations" id="wishlistOperations-${id}">
                <div class="move-to-cart"></div>
                <div class="remove-from-wishlist"></div>
            </div>
        </div>
    `;
    console.log('name length is:', name.length);
    const moveToCartButton = document.createElement('button');
    moveToCartButton.classList.add('move-to-cart-button');
    moveToCartButton.innerText = 'Move To Cart';

    const isInCart = localCart.some(item => item.id === id);
    if (isInCart) {
        moveToCartButton.innerText = 'Move to Cart';
        moveToCartButton.disabled = true;
    }

    moveToCartButton.addEventListener('click', () => {
        moveToCart(id);
    });

    const moveToCartDiv = productDiv.querySelector('.move-to-cart');
    moveToCartDiv.appendChild(moveToCartButton);

    const removeFromWishlistButton = document.createElement('button');
    removeFromWishlistButton.classList.add('remove-from-wishlist');
    removeFromWishlistButton.innerText = 'Remove from Wishlist';

    removeFromWishlistButton.addEventListener('click', () => {
        removeFromWishlist(id);
    })

    const removeFromWishlistDiv = productDiv.querySelector('.remove-from-wishlist');
    removeFromWishlistDiv.appendChild(removeFromWishlistButton);
    return productDiv;
}

let generateWishlistItems = async () => {
    const data = await loadData('https://rahul-kumar-bly.github.io/ecom-demo-vjs/data/data.json');
    const shoppingWishlist = document.getElementById('products');
    if (localWishlist.length > 0){
        shoppingWishlist.innerHTML = '';
        localWishlist.forEach(item => {
            let search = data.gameData.find((dataItem)=> dataItem.id === item.id) || {};
            shoppingWishlist.append(generateWishlistItem(search));
        })
    } else {
        shoppingWishlist.innerHTML = '';
        const container = document.querySelector('.container');
        const noItem = document.querySelector('.no-item-found');
        container.style.visibility = 'hidden';
        noItem.style.visibility = 'visible';

    }
}

generateWishlistItems();


let removeFromWishlist = (productId) => {
    let search = localWishlist.find(item => item.id === productId);
    if (search !== undefined) {
        localWishlist = localWishlist.filter(item => item.id !== productId);
    }
    else {
        return;
    }
    localStorage.setItem('wishlistData', JSON.stringify(localWishlist));
    calculate(localWishlist, 'wishlistCount');
    search = null;
    productId = null;
    generateWishlistItems();
    calculateWishlistPrice();
}

let moveToCart = (productId) => {
    let search = localCart.find(item => item.id === productId);
    console.log('adding item to wishlist....')
    if (search === undefined) {
        localCart.push({id:productId});
        localWishlist = localWishlist.filter(item => item.id !== productId);
        localStorage.setItem('wishlistData', JSON.stringify(localWishlist));
        localStorage.setItem('cartData', JSON.stringify(localCart));
        calculate(localCart, 'cartCount');
        calculate(localWishlist, 'wishlistCount');
        generateWishlistItems();
        calculateWishlistPrice();
    }
}

let calculateWishlistPrice = async () => {
    if(localWishlist.length < 1) return;
    const data = await loadData('https://rahul-kumar-bly.github.io/ecom-demo-vjs/data/data.json');
    const price = [];
    document.querySelector('.full-price').innerHTML = '';
    localWishlist.forEach(item => {
        let search = data.gameData.find(game => item.id === game.id);
        price.push(search.price.replace('₹', ''));
    })
    const totalPrice = price.reduce((a, b) => parseInt(a) +parseInt(b));
    console.log(totalPrice);
    document.querySelector('.full-price').innerHTML += `${totalPrice}`;
}
calculateWishlistPrice();

calculate(localCart, 'cartCount');
calculate(localWishlist, 'wishlistCount');

