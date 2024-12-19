let localCart = JSON.parse(localStorage.getItem('cartData')) || [];
let localWishlist = JSON.parse(localStorage.getItem('wishlistData')) || [];

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
    linear-gradient(rgba(44, 45, 59, 0.95), rgba(45, 46, 52, 0.95)),
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