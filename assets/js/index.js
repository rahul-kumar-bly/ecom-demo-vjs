let generateShopItem = (product) => {
    const {id, name, price, img} = product;
    const productItem = document.createElement('div');
    productItem.classList.add('prod');
    productItem.id = `prod-id-${id}`;
    productItem.innerHTML = `
            <div class="prod-image">
            <a href="pages/product.html?id=${id}">
                <img src="${img}" alt="${name}">
            </a>
        </div>
        <div class="prod-info">
            <div class="prod-details">
                <a href="#" class="item-title">${name}</a>
                <div class="item-price">${price}</div>
            </div>
            <div class="prod-action">  
            </div>
    `;

    const prodCartAnchor = document.createElement('a');
    prodCartAnchor.id = 'addToCart';
    const prodCartDiv = document.createElement('div');
    prodCartDiv.classList.add('prod-cart');
    prodCartDiv.innerHTML = `<i class="bi bi-cart-fill"></i> ADD TO CART`;
    productItem.querySelector('.prod-action').appendChild(prodCartAnchor);
    prodCartAnchor.appendChild(prodCartDiv);

    const isInCart = localCart.some(item => item.id === id);
    if (isInCart){
        isInCartFunc(prodCartDiv)
    }

    prodCartAnchor.addEventListener('click', () => {
        addToCart(id);
        isInCartFunc(prodCartDiv);
    });

    const prodWishlistAnchor = document.createElement('a');
    prodWishlistAnchor.id = 'addToWishlist';
    const prodWishlistDiv = document.createElement('div');
    prodWishlistDiv.classList.add('prod-wishlist');
    prodWishlistDiv.innerHTML = `<i class="bi bi-heart"></i>`;
    productItem.querySelector('.prod-action').appendChild(prodWishlistAnchor);
    prodWishlistAnchor.appendChild(prodWishlistDiv);
    const isInWishlist = localWishlist.some(item => item.id === id);

    if (isInWishlist) {
        isInWishlistFunc(prodWishlistDiv)
    }

    prodWishlistAnchor.addEventListener('click', () => {
        addToWishlist(id);
        isInWishlistFunc(prodWishlistDiv);
    });


    return productItem;
}


let generateShop = async () => {
    const gameDatabase = await loadData('../../data/data.json')
    const shop = document.getElementById('shop')
    gameDatabase.gameData.map((item) =>{
        console.log('name is', item.name);
        shop.append(generateShopItem(item));
    })
}

generateShop();

let isInCartFunc = (prodCartDiv) => {
    prodCartDiv.style.backgroundColor = '#5db585';
    prodCartDiv.innerHTML = `<i class="bi bi-cart-fill"></i> ITEM IN CART`;
    prodCartDiv.style.pointerEvents = 'none';
}

let isInWishlistFunc = (prodWishlistDiv) => {
    prodWishlistDiv.innerHTML = `<i class="bi bi-heart-fill"></i>`
    prodWishlistDiv.style.backgroundColor = '#c2181e';
    prodWishlistDiv.style.pointerEvents = 'none';
}



let addToCart = (prodcutId) => {
    prodcutId = String(prodcutId);
    let search = localCart.find(item => item.id === prodcutId);
    if (search === undefined) {
        localCart.push({id:prodcutId});
        localStorage.setItem('cartData', JSON.stringify(localCart));
        calculate(localCart, 'cartCount');
    } else {return;}
}

let addToWishlist = (prodcutId) => {
    prodcutId = String(prodcutId);
    let search = localWishlist.find(item => item.id === prodcutId);
    if (search === undefined) {
        localWishlist.push({id:prodcutId});
        localStorage.setItem('wishlistData', JSON.stringify(localWishlist));
        calculate(localWishlist, 'wishlistCount');
    }
    else {return;}
}

// selectionCountId - cartAmount

let calculate = (localStorageDatabase, selectionCountId) => {
    let selectionCountElement = document.getElementById(selectionCountId);
    console.log(localStorageDatabase.length);
    selectionCountElement.innerHTML = localStorageDatabase.length;
}

calculate(localCart, 'cartCount');
calculate(localWishlist, 'wishlistCount');