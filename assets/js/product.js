const urlParams = new URLSearchParams(window.location.search);
const productID = urlParams.get("id");




let loadProduct = async (productId) => {
    const data = await loadData('https://rahul7kumar7.github.io/ecom-demo-vjs/data/product.json');
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

    // adding head section meta-data
    const head = document.querySelector('head');
    // adding favicon
    const favicon = document.createElement('link');
    favicon.setAttribute('rel', 'icon' );
    favicon.setAttribute('type', 'image/x-icon' );
    favicon.setAttribute('href', `${product.icon}`);
    head.appendChild(favicon);
    // adding title
    document.title = `Buy ${product.name} Game Key in India`;
    // adding other meta data
    const metaTitle = document.createElement("meta");
    metaTitle.setAttribute("name", "title");
    metaTitle.setAttribute(
        "content",
        `Buy ${product.name} at best price in India Online.`
    );
    const metaDesc = document.createElement("meta");
    metaDesc.setAttribute("name", "description");
    metaDesc.setAttribute("content", product.shortDesc);
    const metaKeywords = document.createElement("meta");
    metaKeywords.setAttribute("name", "keywords");
    metaKeywords.setAttribute(
        "content",
        `${product.name},${product.dev},${product.pub}}`
    );

    document.head.appendChild(metaTitle);
    document.head.appendChild(metaDesc);
    document.head.appendChild(metaKeywords);








    // product section data
    const productHtml = document.getElementById('product');
    // icon, name
    productHtml.querySelector('#headingIcon img').src = product.icon;
    productHtml.querySelector('#headingTitle h1').innerText = product.name;
    //     releaseDate
    productHtml.querySelector('#releaseDate').innerText = product.releaseDate;
    //     releaseDate
    productHtml.querySelector('#price').innerText = product.price;

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
    productHtml.querySelector('#shortDesc').innerText = product.shortDesc.replace('\n', '');
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
    productHtml.querySelector('#longDesc').innerText = product.longDesc.trim().replace('\n\n', '');

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

calculate(localCart, 'cartCount');
calculate(localWishlist, 'wishlistCount');
