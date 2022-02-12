const API = "192.168.1.103/"
let isLogged = false;

// Properties to use to change the values on the display
let balanceView = document.getElementById("balance");
let cookiePriceView = document.getElementById("cookie-price");
let cookiesPerSecondView = document.getElementById("cookies-per-second");
let waifuBonusView = document.getElementById("waifus-bonus");

let accountManager = document.getElementById("account-manager");
let goToAccount = document.getElementById("go-to-account");
let userPanel = document.getElementById("user-panel");


let grid = document.getElementById("upgrade-grid");
let cookieImage = document.getElementById("cookie");
let userMenu = document.getElementById("user-values");
let waifu = document.getElementById("waifu");
let waifuImage = document.getElementById("waifu-image");

let buyWaifu = document.getElementById("buy-waifu");
let ownedWaifu = document.getElementById("owned-waifu");
let waifuPrice = document.getElementById("waifu-price");

let price1 = document.getElementById("price1");

let pages = document.getElementById("pages");

let currentPage = 1;
let waifuPointer = 0;


//Default Values
let balance = 0;
let cookieValue = 1;
let cookiesPerSecond = 0;

//Prices
let upgradePrice = 100;

const structures = [
    {
        "amount": 0,
        "name": "grandma",
        "production": 10,
        "price": 1000
    },
    {
        "amount": 0,
        "name": "mixing-machine",
        "production": 50,
        "price": 5000
    },
    {
        "amount": 0,
        "name": "shop",
        "production": 300,
        "price": 30000
    },
    {
        "amount": 0,
        "name": "building",
        "production": 3000,
        "price": 300000
    },
    {
        "amount": 0,
        "name": "island",
        "production": 10000,
        "price": 1000000
    },
    {
        "amount": 0,
        "name": "duper",
        "production": 50000,
        "price": 5000000
    },
    {
        "amount": 0,
        "name": "black-magic",
        "production": 300000,
        "price": 30000000
    }
]

let waifusPower = 0;
const waifus = [
    {
        "img": "img/waifus/02.jpg",
        "price": 100000000,
        "priceView": "100m",
        "bonus": 5,
        "obtained": false
    },
    {
        "img": "img/waifus/rias.png",
        "price": 300000000,
        "priceView": "300m",
        "bonus": 10,
        "obtained": false
    },
    {
        "img": "img/waifus/akeno.jpg",
        "price": 500000000,
        "priceView": "500m",
        "bonus": 15,
        "obtained": false
    },
    {
        "img": "img/waifus/hinata.jpg",
        "price": 1000000000,
        "priceView": "1b",
        "bonus": 20,
        "obtained": false
    },
    {
        "img": "img/waifus/mirajane.png",
        "price": 5000000000,
        "priceView": "5b",
        "bonus": 25,
        "obtained": false
    },
]

let notEnoughCookies = () => {
    alert("You don't have enough cookies!");
}

function update() {

    balanceView.innerHTML = `<p>Balance: ${numeral(balance).format('0.00 a')} Cookies</p>`;
    cookiePriceView.innerHTML = `<p>Cookie Value: ${numeral(cookieValue).format('0.00 a')} Cookies</p>`;
    cookiesPerSecondView.innerHTML = `<p>Cookies/s: ${numeral(cookiesPerSecond).format('0.00 a')} Cookies</p>`;

    waifuBonusView.innerHTML = `<p>Bonus: ${waifusPower}%</p>`;

}

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

setInterval(() => {
    let waifuBonus = cookiesPerSecond * (waifusPower / 100);
    balance = balance + cookiesPerSecond + waifuBonus;
    update();
}, 1000)

$("#account-button").click( () => {
    goToAccount.style.display = "none";
    accountManager.style.display = "block";
    userPanel.style.display = "none";
})

$("#testeee").click( () => {
    goBack();
})

function goBack() {
    goToAccount.style.display = "flex";
    accountManager.style.display = "none";
    userPanel.style.display = "block";
}

$("#cookie").click(() => {
    let waifuBonusOnClick = cookieValue * (waifusPower / 100);
    balance = balance + cookieValue + waifuBonusOnClick;
    update();
})

$("#upgrade").click(() => {
    if (balance >= upgradePrice) {
        cookieValue++;
        balance = balance - upgradePrice;
        update();
    } else {
        notEnoughCookies();
    }
})

document.body.onload = () => {
    for (let i = 0; i < structures.length; i++) {

        $(`#${structures[i].name}`).click(() => {
            if (balance >= structures[i].price) {
                balance = balance - structures[i].price;
                cookiesPerSecond = cookiesPerSecond + structures[i].production;
                structures[i].amount++;
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

function showAlert(answer) {
    alert(answer);
}

function login(cb) {
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;

    fetch("http://192.168.1.103:3000/login", {
        method: "POST",
        body: JSON.stringify({
            "username": username,
            "password": password
        }),
        headers: {
            "Content-type" : "application/json; charset=UTF-8"
        }
    }).then(response => response.text()).then((answer) => {
        cb(answer);
    });
}

$("#register").click( () => {

    let newUsername = document.querySelector("#username").value;
    let newPassword = document.querySelector("#password").value;

    fetch("http://192.168.1.103:3000/register", {
        method: "POST",
        body: JSON.stringify({
            "user": newUsername,
            "password" : newPassword
        }),
        headers: {
            "Content-type" : "application/json; charset=UTF-8"
        }
    }).then(response => response.text()).then((answer) => {
        validate(answer);
    })
})

$("#load").click( () => {

    login(load);

})

$("#save").click( () => {
    login(save);
})

function load(id){
    document.querySelector("#password").value = "";
    document.querySelector("#username").value = "";
    goBack();
    fetch(`http://192.168.1.103:3000/load/${id}`)
    .then(response => response.json())
    .then((response) => {
        console.log(response);
        cookieValue = response.cookieValue;
        balance = response.balance;
        for(let i = 0; i < structures.length; i++){
            structures[i].amount = response.structures[i];
            cookiesPerSecond = cookiesPerSecond + (structures[i].amount * structures[i].production);
        }
        for(let i = 0; i < waifus.length; i++){
            waifus[i].obtained = response.waifus[i];
            if(waifus[i].obtained){
                waifusPower = waifusPower + waifus[i].bonus;
            }
        }
        showAlert("Loaded data with success");
    })
}

function save() {
    //WIP
    showAlert("Saving");
}