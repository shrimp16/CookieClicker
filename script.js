// Properties to use to change the values on the display
let balanceView = document.getElementById("balance");
let cookiePriceView = document.getElementById("cookie-price");
let cookiesPerSecondView = document.getElementById("cookies-per-second");
let waifuBonusView = document.getElementById("waifus-bonus");

let grid = document.getElementById("upgrade-grid");
let cookieImage = document.getElementById("cookie");
let userMenu = document.getElementById("user-values");
let waifu = document.getElementById("waifu");
let waifuImage = document.getElementById("waifu-image");

let buyWaifu = document.getElementById("buy-waifu");
let ownedWaifu = document.getElementById("owned-waifu");
let waifuPrice = document.getElementById("waifu-price");

let pages = document.getElementById("pages");

let currentPage = 1;
let waifuPointer = 0;

let balance = 0;
let cookieValue = 1000;
let cookiesPerSecond = 0;

//Prices
const upgradePrice = 100;
const prices = [
    1000,
    5000,
    30000,
    300000,
    1000000,
    5000000,
    30000000
]

//Cookies per second from each upgrade
const production = [
    10,
    50,
    300,
    3000,
    10000,
    50000,
    300000
]

//IDs of the buttons
const buttonsID = [
    "grandma",
    "mixing-machine",
    "shop",
    "building",
    "island",
    "duper",
    "black-magic"
];

let waifusPower = 0;
const waifus = [
    {
        "name": "02",
        "img": "img/waifus/02.jpg",
        "price": 100000000,
        "priceView": "100KK",
        "bonus": 5,
        "obtained": false
    },
    {
        "name": "Rias Gremory",
        "img": "img/waifus/rias.png",
        "price": 500000000,
        "priceView": "500KK",
        "bonus": 10,
        "obtained": false
    }
]

let notEnoughCookies = () => {
    alert("You don't have enough cookies!");
}

function update() {

    //NEED TO REFACTOR ASAP
    if (balance >= 1000000) {
        balanceView.innerHTML = `<p>Balance: ${balance / 1000000}KK Cookies</p>`;
    } else if (balance >= 100000) {
        balanceView.innerHTML = `<p>Balance: ${balance / 1000}K Cookies</p>`;
    } else {
        balanceView.innerHTML = `<p>Balance: ${balance} Cookies</p>`;
    }

    if (cookieValue >= 1000000) {
        cookiePriceView.innerHTML = `<p>Cookie Value: ${cookieValue / 1000000}KK Cookies</p>`;
    } else if (cookieValue >= 100000) {
        cookiePriceView.innerHTML = `<p>Cookie Value: ${cookieValue / 1000}K Cookies</p>`;
    } else {
        cookiePriceView.innerHTML = `<p>Cookie Value: ${cookieValue} Cookies</p>`;
    }

    if (cookiesPerSecond >= 1000000) {
        cookiesPerSecondView.innerHTML = `<p>Cookies/s: ${cookiesPerSecond / 1000000}KK Cookies</p>`;
    } else if (cookiesPerSecond >= 100000) {
        cookiesPerSecondView.innerHTML = `<p>Cookies/s: ${cookiesPerSecond / 1000}K Cookies</p>`;
    } else {
        cookiesPerSecondView.innerHTML = `<p>Cookies/s: ${cookiesPerSecond} Cookies</p>`;
    }

    waifuBonusView.innerHTML = `<p>Bonus: ${waifusPower}%</p>`;

}

setInterval(() => {
    let waifuBonus = cookiesPerSecond * (waifusPower / 100);
    balance = balance + cookiesPerSecond + waifuBonus;
    update();
}, 1000)

$("#cookie").click(() => {
    let waifuBonusOnClick = cookieValue * (waifusPower / 100);
    balance = balance + cookieValue + waifuBonusOnClick;
    update();
})

$("#upgrade").click(() => {
    if (balance >= upgradePrice) {
        cookieValue++;
        balance = balance - upgradePrice;
        document.getElementById("click-sound").play();
        update();
    } else {
        notEnoughCookies();
    }
})

document.body.onload = () => {
    for (let i = 0; i < buttonsID.length; i++) {

        let id = buttonsID[i];
        let price = prices[i];
        let prod = production[i];

        $(`#${id}`).click(() => {
            if (balance >= price) {
                balance = balance - price;
                cookiesPerSecond = cookiesPerSecond + prod;
                update();
            } else {
                notEnoughCookies();
            }
        })

    }
}

$("#next-page").click(() => {

    grid.style.display = "none";
    userMenu.style.display = "none";
    waifu.style.display = "block";
    waifuPointer = 0;
    console.log(waifuImage);
    waifuImage.src = waifus[waifuPointer].img;

    if (currentPage >= 2) {
        pages.innerHTML = `<p id="pages"> ${currentPage} / 2</p>`
    } else {
        currentPage++;
        pages.innerHTML = `<p id="pages"> ${currentPage} / 2</p>`
    }

    loadWaifu();

})

$("#previous-page").click(() => {

    grid.style.display = "grid";
    userMenu.style.display = "block";
    waifu.style.display = "none";

    if (currentPage <= 1) {
        pages.innerHTML = `<p id="pages"> ${currentPage} / 2</p>`
    } else {
        currentPage--;
        pages.innerHTML = `<p id="pages"> ${currentPage} / 2</p>`
    }

    loadWaifu();
})

$("#previous-waifu").click(() => {

    if (waifuPointer <= 0) {
        waifuImage.src = waifus[waifuPointer].img;
    } else {
        waifuPointer--;
        waifuImage.src = waifus[waifuPointer].img;
    }

    loadWaifu();
})

$("#next-waifu").click(() => {


    if (waifuPointer >= waifus.length - 1) {
        waifuImage.src = waifus[waifuPointer].img;
    } else {
        waifuPointer++;
        waifuImage.src = waifus[waifuPointer].img;
    }

    loadWaifu();

})

$("#buy-waifu").click( () => {
    if(balance >= waifus[waifuPointer].price){
        balance = balance - waifus[waifuPointer].price;
        waifus[waifuPointer].obtained = true;
        waifusPower = waifusPower + waifus[waifuPointer].bonus;
        update();
    }else{
        notEnoughCookies();
    }
    loadWaifu();
})

function loadWaifu() {

    waifuImage.style.filter = "blur(10px) grayscale() invert()";

    if(waifus[waifuPointer].obtained){
        waifuImage.style.filter = "none";
        buyWaifu.style.display = "none";
        ownedWaifu.style.display = "block";
        waifuPrice.style.display = "none";
    }else{
        buyWaifu.style.display = "flex";
        buyWaifu.style.margin = "auto";
        ownedWaifu.style.display = "none";
        waifuPrice.innerText = `Price: ${waifus[waifuPointer].priceView}`;
        waifuPrice.style.display = "block";
    }
}