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
                <a href="cart.html">
                    <div class="prod-cart">
                        <i class="bi bi-cart-fill"></i> ADD TO CART
                    </div>
                </a>
                <a href="wishlist.html">
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

