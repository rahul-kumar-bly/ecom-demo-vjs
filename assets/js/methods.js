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
    if (localCart.length === 10){
        alert('Buy some items before adding more');
        return;
    }
    let search = localCart.find(item => item.id === productId);
    if (search === undefined) {
        localCart.push({id:productId});
        localStorage.setItem('cartData', JSON.stringify(localCart));
        calculate(localCart, 'cartCount');
    }
    else {
        console.log('item already in cart');
        return;
    }
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

// for all pages

function handlSearch (event) {
    event.preventDefault();
    const searchValue = document.getElementById('search').value;
    console.log(searchValue)
    if (window.location.href.includes("index.html")) {
        window.location.href = `pages/search.html?searchQuery=${searchValue.trim().split(" ").join("+")}`;
    } else {
        window.location.href = `search.html?searchQuery=${searchValue.trim().split(" ").join("+")}`;
    }
}

function showLimitWarning(type){
    const warningDiv = document.querySelector('.warning');
    const warningDivP = document.querySelector('.warning p');
    let interval = 1000;
    let warningInterval = setInterval(showWarningMessage, 1000)
    function showWarningMessage(){
        if (interval === 1009){
            warningDiv.style.display = 'none';
            clearInterval(warningInterval);
            warningDivP.innerHTML = ``;
            return;
        }
        if (type==='cart'){
            warningDivP.innerHTML = `<i class="bi bi-exclamation-diamond-fill"></i>
            Cart Maximum Reached! Buy or remove some items before adding more to cart.`
        } else if (type==='wishlist'){
            warningDivP.innerHTML = `<i class="bi bi-exclamation-diamond-fill"></i>
            Wishlist Maximum Reached! Move items to cart before adding more to wishlist.`
        }
        console.log(interval);
        window.scroll(0,0);
        warningDiv.style.display = 'flex';
        interval++;
        }

}