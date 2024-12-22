const urlParams = new URLSearchParams(window.location.search);
const productID = urlParams.get("id");

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

let loadProduct = async (productId) => {
    const data = await loadData('../../data/product.json');
    const product = data.gameData.find(item => item.id === productID);
    console.log(product);
    await generateProductListing(product);
}

loadProduct(productID);

let generateProductListing = async (product) => {
    // product section background
    let container = document.getElementById('topContainerBg');
    container.style.backgroundImage = `
    linear-gradient(rgba(44, 45, 59, 0.90), rgba(45, 46, 52, 0.90)),
    url(${product.screenshots[1]})
`;
    container.style.backgroundSize = 'cover';
    container.style.backgroundPosition = 'center';
    // product section data
    const productHtml = document.getElementById('product');
    // icon, name
    productHtml.querySelector('#headingIcon img').src = product.icon;
    productHtml.querySelector('#headingTitle h1').innerText = product.name;
    //     releaseDate
    productHtml.querySelector('#releaseDate').innerText = product.releaseDate;

    //  screenshot
    const trailerDiv = document.getElementById('swiperSlide0');
    trailerDiv.src = product.trailer;
    let swiperWrapper = document.querySelector('.swiper-wrapper');
    product.screenshots.forEach(screenshot => {
        let swiperSlide = document.createElement('div')
        swiperSlide.setAttribute('class', 'swiper-slide');
        let swiperSlideImg = document.createElement('img')
        swiperSlideImg.src=screenshot;
        swiperSlide.appendChild(swiperSlideImg);
        swiperWrapper.appendChild(swiperSlide);
    });
    //     mini image
    productHtml.querySelector('#miniImageContainer img').src = product.img;
    //     shortDesc
    productHtml.querySelector('#shortDesc').innerText = product.shortDesc;
    //     pub-dev
    productHtml.querySelector('#pub .pub-dev-title').innerText = product.pub;
    productHtml.querySelector('#dev .pub-dev-title').innerText = product.dev;
    // long desc
    const longDescContainer = document.getElementById('longDesc');
    productHtml.querySelector('#longDesc').innerText = product.longDesc.trim();
}

let toggleAddToCart = (productId) => {
    let search = localCart.find(item => item.id === productId);
    console.log('search is', search);
    let addToCartText = document.getElementById('addToCartText');
    let clickAddToCart = document.getElementById('addToCart');
    if (search === undefined) {
        addToCartText.innerHTML =  'add to cart';
        clickAddToCart.addEventListener('click', (event)=> {
            event.preventDefault();
            console.log('clicked', event);
            addToCart(productId);
            console.log('item added to cart');
        })
    }
    else {
        addToCartText.innerHTML =  'Remove from cart';
        clickAddToCart.addEventListener('click', (event)=> {
            event.preventDefault();
            console.log('clicked', event);
            removeFromCart(productId);
            console.log('item removed from cart');
        })
    }

}



let addToCart = async (productId) => {
    let search = localCart.find(item => item.id === productId);
    if (search === undefined) {
        localCart.push({id:productId});
    }
    else if (search) {
        console.log('item already in cart');
        return;
    }
    localStorage.setItem('cartData', JSON.stringify(localCart));
    calculate(localCart, 'cartCount');
    toggleAddToCart(productId);
}

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
    toggleAddToCart(productId);
}

let toggleAddToWishlist = (productId) => {
    let search = localWishlist.find(item => item.id === productId);
    console.log('search is', search);
    let addToCartText = document.getElementById('addToWishlistText');
    let clickAddToCart = document.getElementById('addToWishlist');
    if (search === undefined) {
        addToCartText.innerHTML =  'add to wishlist';
        clickAddToCart.addEventListener('click', (event)=> {
            event.preventDefault();
            console.log('clicked', event);
            addToWishlist(productId);
            console.log('item added to wishlist');
        })
    }
    else {
        addToCartText.innerHTML =  'Remove from wishlist';
        clickAddToCart.addEventListener('click', (event)=> {
            event.preventDefault();
            console.log('clicked', event);
            removeFromWishlist(productId);
            console.log('item removed from wishlist');
        })
    }

}


let addToWishlist = async (productId) => {
    let search = localWishlist.find(item => item.id === productId);
    if (search === undefined) {
        localWishlist.push({id:productId});
    }
    else if (search) {
        console.log('item already in cart');
        return;
    }
    localStorage.setItem('wishlistData', JSON.stringify(localCart));
    calculate(localWishlist, 'wishlistCount');
    toggleAddToWishlist(productId);
}

let removeFromWishlist = (productId) => {
    let search = localWishlist.find(item => item.id === productId);
    if (search !== undefined) {
        localWishlist = localWishlist.filter(item => item.id !== productId);
    }
    else {
        return;
    }
    localStorage.setItem('wishlistData', JSON.stringify(localCart));
    calculate(localWishlist, 'wishlistCount');
    toggleAddToWishlist(productId);
}


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

calculate(localCart, 'cartCount');
calculate(localWishlist, 'wishlistCount');
toggleAddToCart(productID);
toggleAddToWishlist(productID);