const urlParams = new URLSearchParams(window.location.search);
const productID = urlParams.get("id");

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
    // const trailerDiv = document.getElementById('swiperSlide0');
    // trailerDiv.src = product.trailer;
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
    const pubInfo = productHtml.querySelector('#pub .pub-dev-title');
    product.pub.map(item => {
        const pubSpan = document.createElement('span');
        pubSpan.innerText = item
        pubInfo.appendChild(pubSpan);
        pubSpan.onclick = () => {
            const pubQuery = pubSpan.innerText.trim().split(" ").join("+");
            window.location.href = `search.html?pubId=${pubQuery}`;
        }
    })

    console.log(product.dev)
    const devInfo = productHtml.querySelector('#dev .pub-dev-title');
    product.dev.map(item => {
        const devSpan = document.createElement('span');
        devSpan.innerText = item
        devInfo.appendChild(devSpan);
        devSpan.onclick = () => {
            const devQuery = devSpan.innerText.trim().split(" ").join("+");
            window.location.href = `search.html?devId=${devQuery}`;
        }
    })
    // devInfo.innerText = product.dev;

    // fetch developer and display in a new page

    // long desc
    const longDescContainer = document.getElementById('longDesc');
    productHtml.querySelector('#longDesc').innerText = product.longDesc.trim();

//     setup addToCart button
    const addToCartDiv = document.getElementById('addToCart');
    addToCartDiv.addEventListener('click', () => {
        addToCart(productID);
        isInCartFunc(addToCartDiv, '#addToCartText');
    });
    const itemIsInCart = localCart.some(item => item.id === productID);
    if (itemIsInCart){
        isInCartFunc(addToCartDiv, '#addToCartText');
        console.log('itemIsInCart');
    }

    //     setup addToWishlist button
    const addToWishlistDiv = document.getElementById('addToWishlist');
    addToWishlistDiv.addEventListener('click', () => {
        addToWishlist(productID);
        isInWishlistFunc(addToWishlistDiv, '#addToWishlistText');
    });
    const itemIsInWishlist = localWishlist.some(item => item.id === productID);
    if (itemIsInWishlist){
        isInWishlistFunc(addToWishlistDiv, '#addToWishlistText');
        console.log('itemIsInWishlist');
    }

}

let isInCartFunc = (prodCartDiv, textSpan) => {
    prodCartDiv.style.backgroundColor = '#5db585';
    document.querySelector(textSpan).innerText = "ITEM IN CART";
    prodCartDiv.style.pointerEvents = 'none';
}

let isInWishlistFunc = (prodWishlistDiv, textSpan) => {
    prodWishlistDiv.style.backgroundColor = '#c2181e';
    document.querySelector(textSpan).innerText = "ITEM IN WISHLIST";
    document.querySelector(textSpan).style.color = "#e3e3d0"
    prodWishlistDiv.style.pointerEvents = 'none';

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
    localStorage.setItem('wishlistData', JSON.stringify(localWishlist));
    calculate(localWishlist, 'wishlistCount');
}

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