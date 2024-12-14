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

let generateShop = async () => {
    const gameDatabase = await loadData('../../data/data.json')
    const shop = document.getElementById('shop')
    return (shop.innerHTML = gameDatabase.gameData.map((item) => {
        console.log(item.name)
        const {id, name, price, img} = item;
        return `
            <div class="prod" id="prod-id-${id}">
        <div class="prod-image">
            <a href="#">
                <img src="${img}" alt="${name}">
            </a>
        </div>
        <div class="prod-info">
            <div class="prod-details">
                <a href="#" class="item-title">${name}</a>
                <div class="item-price">${price}</div>
            </div>
            <div class="prod-action">
                <a onclick="addToCart(${id})">
                    <div class="prod-cart">
                        <i class="bi bi-cart-fill"></i> ADD TO CART
                    </div>
                </a>
                <a onclick="addToWishlist(${id})">
                    <div class="prod-wishlist">
                        <i class="bi bi-heart"></i>
                    </div>
                </a>
            </div>
        </div>
    </div>
`
    }).join(""))
}

generateShop();

let localCart = JSON.parse(localStorage.getItem('cartData')) || [];

let addToCart = async (prodcutId) => {
    let search = localCart.find(item => item.id === prodcutId);
    if (search === undefined) {
        localCart.push({id:prodcutId});
        localStorage.setItem('cartData', JSON.stringify(localCart));
        calculate(localCart, 'cartAmount');
    } else {return;}
}

let localWishlist = JSON.parse(localStorage.getItem('wishlistData')) || [];

let addToWishlist = async (prodcutId) => {
    let search = localWishlist.find(item => item.id === prodcutId);
    if (search === undefined) {
        localWishlist.push({id:prodcutId});
        localStorage.setItem('wishlistData', JSON.stringify(localWishlist));
        calculate(localWishlist, 'wishlistAmount');
    }
    else {return;}
}

// selectionCountId - cartAmount

let calculate = async (localStorageDatabase, selectionCountId) => {
    let selectionCountElement = document.getElementById(selectionCountId);
    console.log(localStorageDatabase.length);
    selectionCountElement.innerHTML = localStorageDatabase.length;
}

calculate(localCart, 'cartCount');
calculate(localWishlist, 'wishlistCount');