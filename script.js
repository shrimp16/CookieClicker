// Properties to use to change the values on the display
var balanceView = document.getElementById("balance");
var cookiePriceView = document.getElementById("cookie-price");
var cookiesPerSecondView = document.getElementById("cookies-per-second");

var balance = 1000;
var cookieValue = 1;
var cookiesPerSecond = 0;

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

var notEnoughCookies = () => {
    alert("You don't have enough cookies!");
}

var update = () => {

    //NEED TO REFACTOR ASAP
    if(balance >= 1000000){
        balanceView.innerHTML = `<p>Balance: ${balance / 1000000}KK Cookies</p>`;
    }else if(balance >= 100000){
        balanceView.innerHTML = `<p>Balance: ${balance / 1000}K Cookies</p>`;
    }else{
        balanceView.innerHTML = `<p>Balance: ${balance} Cookies</p>`;
    }

    if(cookieValue >= 1000000){
        cookiePriceView.innerHTML = `<p>Cookie Value: ${cookieValue / 1000000}KK Cookies</p>`;
    }else if(cookieValue >= 100000){
        cookiePriceView.innerHTML = `<p>Cookie Value: ${cookieValue / 1000}K Cookies</p>`;
    }else{
        cookiePriceView.innerHTML = `<p>Cookie Value: ${cookieValue} Cookies</p>`;
    }

    if(cookiesPerSecond >= 1000000){
        cookiesPerSecondView.innerHTML = `<p>Cookies/s: ${cookiesPerSecond / 1000000}KK Cookies</p>`;
    }else if(cookiesPerSecond >= 100000){
        cookiesPerSecondView.innerHTML = `<p>Cookies/s: ${cookiesPerSecond / 1000}K Cookies</p>`;
    }else{
        cookiesPerSecondView.innerHTML = `<p>Cookies/s: ${cookiesPerSecond} Cookies</p>`;
    }

}

setInterval(() => {
    balance = balance + cookiesPerSecond;
    update();
}, 1000)

$("#cookie").click( () => {
    balance = balance + cookieValue;
    update();
})

$("#upgrade").click( () => {
    if(balance >= upgradePrice){
        cookieValue++;
        balance = balance - upgradePrice;
        document.getElementById("click-sound").play();
        update();
    }else{
        notEnoughCookies();
    }
})

function loadPageOne(){
    for(var i = 0; i < buttonsID.length; i++){

        let id = buttonsID[i];
        let price = prices[i];
        let prod = production[i];

        $(`#${id}`).click( () => {
            if(balance >= price){
                balance = balance - price;
                cookiesPerSecond = cookiesPerSecond + prod;
                update();
            }else{
                notEnoughCookies();
            }
        })

    }
}