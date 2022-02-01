// Properties to use to change the values on the display
var balanceView = document.getElementById("balance");
var cookiePriceView = document.getElementById("cookie-price");
var cookiesPerSecondView = document.getElementById("cookies-per-second");

var balance = 30000;
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

//Cookies per second from each upgrade
const sweetGrandmaProd = 10;
const mixingMachineProd = 50;
const cookieShopProd = 300;
const cookieBuildingProd = 3000;
const cookieIslandProd = 10000;
const cookieDuperProd = 50000;
const blackMagicProd = 300000;

var notEnoughCookies = () => {
    alert("You don't have enough cookies!");
}

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
        notEnoughCookies();
    }
})

$("#grandma").click( () => {
    if(balance >= sweetGrandmaPrice){
        cookiesPerSecond = cookiesPerSecond + sweetGrandmaProd;
        balance = balance - sweetGrandmaPrice;
        update();
    }else{
        notEnoughCookies();
    }
})

$("#mixing-machine").click( () => {
    if(balance >= mixingMachinePrice){
        cookiesPerSecond = cookiesPerSecond + mixingMachineProd;
        balance = balance - mixingMachinePrice;
        update();
    }else{
        notEnoughCookies();
    }
})

$("#mixing-machine").click( () => {
    if(balance >= mixingMachinePrice){
        cookiesPerSecond = cookiesPerSecond + mixingMachineProd;
        balance = balance - mixingMachinePrice;
        update();
    }else{
        notEnoughCookies();
    }
})

$("#shop").click( () => {
    if(balance >= cookieShopPrice){
        cookiesPerSecond = cookiesPerSecond + cookieShopProd;
        balance = balance - cookieShopPrice;
        update();
    }else{
        notEnoughCookies();
    }
})