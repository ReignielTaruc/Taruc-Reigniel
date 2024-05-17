let openShopping = document.querySelector('.icon-cart');
let closeShopping = document.querySelector('.CloseShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.ProductList');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.cart-count');

openShopping.addEventListener('click', () => {
    body.classList.add('active');
});
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

let products = [
    {
        id: 1,
        name: 'Lime Basil & Mandarin Cologne',
        price: 6500,
    },
    {
        id: 2,
        name: 'Fig & Lotus Flower Cologne',
        price: 9300,
    },
    {
        id: 3,
        name: 'Wood Sage & Sea Salt Cologne',
        price: 6500,
    },
    {
        id: 4,
        name: 'CK One',
        price: 5090,
    },
    {
        id: 5,
        name: 'CK BE',
        price: 5980,
    },
    {
        id: 6,
        name: 'Eternity Aqua Men',
        price: 5500,
    },
    {
        id: 7,
        name: 'Versace Eros EDT',
        price: 6500,
    },
    {
        id: 8,
        name: 'Versace Man Eau',
        price: 5800,
    },
    {
        id: 9,
        name: 'Versace Blue Jeans',
        price: 3400,
    },
    {
        id: 10,
        name: 'Legend Red',
        price: 4500,
    },
    {
        id: 11,
        name: 'Explorer',
        price: 4700,
    },
    {
        id: 12,
        name: 'Emblem',
        price: 3900,
    }
];

let listCards = [];

function addToCart(name, key) {
    let productIndex = listCards.findIndex(item => item.name === name);
    if (productIndex === -1) {
        listCards.push({ ...products[key], quantity: 1 });
    } else {
        listCards[productIndex].quantity++;
    }
    reloadCard();
}

function reloadCard() {
    listCard.innerHTML = '';
    let totalPrice = 0;
    let count = 0;
    listCards.forEach((value, key) => {
        totalPrice += value.price * value.quantity;
        count += value.quantity;
        let newDiv = document.createElement('li');
        newDiv.innerHTML = `
           <div>${value.name}</div>
            <div>${value.price.toLocaleString()}</div>
            <div>
            <div class="quantity-container">
                <button class="quantity-btn" onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                <div class="count">${value.quantity}</div>
                <button class="quantity-btn" onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
            </div>`;
        listCard.appendChild(newDiv);
    });
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}

function changeQuantity(key, quantity) {
    if (quantity <= 0) {
        listCards.splice(key, 1);
    } else {
        listCards[key].quantity = quantity;
    }
    reloadCard();
}

document.querySelector('.Confirm').addEventListener('click', () => {
    if (listCards.length === 0) {
        alert('Your cart is currently empty. Please add items to your cart before proceeding with your order.');
    } else {
        if (confirm(`Do you want to continue with this order? Total: ₱${total.innerText}`)) {
            alert('Thank you for your order!');
            listCards = [];
            reloadCard();
        }
    }
});
