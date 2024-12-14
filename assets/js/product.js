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
    const productHtml = document.getElementById('product');
}


