let localCart = JSON.parse(localStorage.getItem('cartData')) || [];
let localWishlist = JSON.parse(localStorage.getItem('wishlistData')) || [];

const urlParams = new URLSearchParams(window.location.search);
const productID = urlParams.get("id");
console.log(productID);

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
    console.log(product.name);
    let container = document.getElementById('container');
    container.style.backgroundImage = `
    linear-gradient(rgba(44, 45, 59, 0.95), rgba(45, 46, 52, 0.95)),
    url(${product.screenshots[1]})
`;
    container.style.backgroundSize = 'cover';
    container.style.backgroundPosition = 'center';

    const productHtml = document.getElementById('product');

    // icon, name
    productHtml.querySelector('#headingIcon img').src = product.icon;
    productHtml.querySelector('#headingTitle h1').innerText = product.name;

    //     releaseDate
    productHtml.querySelector('#releaseDate').innerText = product.releaseDate;

    //     screenshot
    productHtml.querySelector("#productImageContainer img").src=product.screenshots[0]

//     mini image
    productHtml.querySelector('#miniImageContainer img').src = product.img;

//     shortDesc
    productHtml.querySelector('#shortDesc').innerText = product.shortDesc;

//     pub-dev
    productHtml.querySelector('#pub .pub-dev-title').innerText = product.pub;
    productHtml.querySelector('#dev .pub-dev-title').innerText = product.dev;

// long desc
    const middleLeftContainer = document.getElementById('middleContainer');
    const longDescContainer = middleLeftContainer.querySelector('#longDesc');
    console.log(product.longDesc)
    // productHtml.querySelector('#longDesc').innerText = product.longDesc;
    const wordLimit = 150;
    const words = product.longDesc.split(' ');
    const visibleContent = words.slice(0, wordLimit).join(' ');
    const hiddenContent = words.slice(wordLimit).join(' ');
    const longDesContainer = productHtml.querySelector('#longDesc');
    const visibleParagraph = document.createElement('p');
    visibleParagraph.innerText = visibleContent;
    const hiddenParagraph = document.createElement('p');
    hiddenParagraph.innerText = hiddenContent;
    hiddenParagraph.classList.add('hidden');

    const toggleButton = document.createElement('a');
    toggleButton.id = 'toggleButton';
    toggleButton.textContent = 'Show More';

    longDescContainer.appendChild(visibleParagraph);
    longDescContainer.appendChild(hiddenParagraph);
    longDescContainer.appendChild(toggleButton);
    //
    toggleButton.addEventListener('click', () => {
        if (hiddenParagraph.classList.contains('hidden')) {
            hiddenParagraph.classList.remove('hidden');
            toggleButton.textContent = 'Show Less';
        } else {
            hiddenParagraph.classList.add('hidden');
            toggleButton.textContent = 'Show More';
        }
    });



}


