
const fetchDataFromJson = async() => {
    const fetchData = await fetch('../../data/product.json');
    const res = await fetchData.json();
    const dataMap = res.gameData
    let fetchedData = undefined;
    const urlParams = new URLSearchParams(window.location.search);
    console.log('i am ata here');
    if (urlParams.has('pubId')) {
        const pubId = urlParams.get('pubId');
        fetchedData = dataMap.filter(item => item.pub.find(ifind => ifind.trim() === pubId.trim())) || [];
    } else if (urlParams.has('devId')) {
        const devId = urlParams.get('devId');
        fetchedData = dataMap.filter(item => item.dev.find(ifind => ifind.trim() === devId.trim())) || [];
    } else if (urlParams.has('searchQuery')) {
        const searchQuery = urlParams.get('searchQuery');
        console.log('hello there')
        console.log('searchquery is', searchQuery);
        const regex = new RegExp(searchQuery, "i");
        fetchedData = dataMap.filter(item => Object.values(item).some(value=> regex.test(String(value))));
        console.log(fetchedData);
    }
    else {
        console.log("something is wrong");
    }

    const shop = document.getElementById('shop');
    fetchedData.forEach((item) => {
        // console.log('name is', item.name);
        shop.append(generateShopItem(item));
    })
}
fetchDataFromJson();


let generateShopItem = (product) => {
    const {id, name, price, img} = product;
    const productItem = document.createElement('div');
    productItem.classList.add('prod');
    productItem.id = `prod-id-${id}`;
    productItem.innerHTML = `
            <div class="prod-image">
            <a href="product.html?id=${id}">
                <img src="${img}" alt="${name}">
            </a>
        </div>
        <div class="prod-info">
            <div class="prod-details">
                <a href="#" class="item-title">${name}</a>
                <div class="item-price">${price}</div>
            </div>
            <div class="prod-action">  
            </div>
    `;

    // const prodCartAnchor = document.createElement('a');
    // prodCartAnchor.id = 'addToCart';
    // const prodCartDiv = document.createElement('div');
    // prodCartDiv.classList.add('prod-cart');
    // prodCartDiv.innerHTML = `<i class="bi bi-cart-fill"></i> ADD TO CART`;
    // productItem.querySelector('.prod-action').appendChild(prodCartAnchor);
    // prodCartAnchor.appendChild(prodCartDiv);

    // const isInCart = localCart.some(item => item.id === id);
    // if (isInCart){
    //     isInCartFunc(prodCartDiv)
    // }
    //
    // prodCartAnchor.addEventListener('click', () => {
    //     addToCart(id);
    //     isInCartFunc(prodCartDiv);
    // });

    // const prodWishlistAnchor = document.createElement('a');
    // prodWishlistAnchor.id = 'addToWishlist';
    // const prodWishlistDiv = document.createElement('div');
    // prodWishlistDiv.classList.add('prod-wishlist');
    // prodWishlistDiv.innerHTML = `<i class="bi bi-heart"></i>`;
    // productItem.querySelector('.prod-action').appendChild(prodWishlistAnchor);
    // prodWishlistAnchor.appendChild(prodWishlistDiv);
    // const isInWishlist = localWishlist.some(item => item.id === id);

    // if (isInWishlist) {
    //     isInWishlistFunc(prodWishlistDiv)
    // }
    //
    // prodWishlistAnchor.addEventListener('click', () => {
    //     addToWishlist(id);
    //     isInWishlistFunc(prodWishlistDiv);
    // });


    return productItem;
}

