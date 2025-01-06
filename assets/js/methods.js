let loadData = async (data) => {
    try {
        const response = await fetch(data);
        if (!response.ok) {
            console.error(response.status);
        }
        return await response.json();
    } catch (err) {
        console.error(`Error loading JSON ${err.message}`);
    }
}

// addToCart and addToWishlist methods are for index and product pages only
let addToCart = async (productId) => {
    let search = localCart.find(item => item.id === productId);
    if (search === undefined) {
        localCart.push({id:productId});
    }
    else {
        console.log('item already in cart');
        return;
    }
    localStorage.setItem('cartData', JSON.stringify(localCart));
    calculate(localCart, 'cartCount');
}


let addToWishlist = async (productId) => {
    let search = localWishlist.find(item => item.id === productId);
    if (search === undefined) {
        localWishlist.push({id:productId});
    }
    else {
        console.log('item already in cart');
        return;
    }
    localStorage.setItem('wishlistData', JSON.stringify(localWishlist));
    calculate(localWishlist, 'wishlistCount');
}

// isInCartFunc and isInWishlistFunc methods are for index and product pages only
let isInCartFunc = (prodCartDiv, textSpan) => {
    prodCartDiv.style.backgroundColor = '#5db585';
    prodCartDiv.innerHTML = `<i class="bi bi-cart-fill"></i> ITEM IN CART`;
    prodCartDiv.style.pointerEvents = 'none';
}

let isInWishlistFunc = (prodWishlistDiv) => {
    prodWishlistDiv.innerHTML = `<i class="bi bi-heart-fill"></i>`
    prodWishlistDiv.style.backgroundColor = '#c2181e';
    prodWishlistDiv.style.pointerEvents = 'none';
    if (window.location.href.includes("product.html")) {
        prodWishlistDiv.innerHTML += " ITEM IN WISHLIST";
        prodWishlistDiv.style.color = "#e3e3d0"
    }
}

// calculate works for all pages
let calculate = (basketType, selector) => {
    const lengthOfBasket = basketType.length;
    const counter = document.getElementById(selector);
    if (lengthOfBasket > 0){
        counter.innerText = lengthOfBasket;
        counter.style.visibility = 'visible';
    }
    if (lengthOfBasket === 0){
        counter.style.visibility = 'hidden';
    }
}