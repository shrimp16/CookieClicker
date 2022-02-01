// Properties to use to change the values on the display
var balanceView = document.getElementById("balance");
var cookiePriceView = document.getElementById("cookie-price");
var cookiesPerSecondView = document.getElementById("cookies-per-second");

var balance = 0;
var cookieValue = 1;
var cookiesPerSecond = 0;

//Prices
const upgradePrice = 100;
const sweetGrandmaPrice = 1000;
const mixingMachinePrice = 5000;
const cookieShopPrice = 30000;
const cookieBuildingPrice = 300000; //300K
const cookieIslandPrice = 1000000; //1KK
const cookieDuperPrice = 5000000; //5KK
const blackMagicPrice = 30000000; // 30KK

var update = () => {

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
        update();
    }else{
        alert("You don't have enough cookies!");
    }
})