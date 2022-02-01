// Properties to use to change the values on the display
var balanceView = document.getElementById("balance");
var cookiePriceView = document.getElementById("cookie-price");
var cookiesPerSecondView = document.getElementById("cookies-per-second");

var balance = 0;
var cookiePrice = 1;
var cookiesPerSecond = 0;

var update = () => {
    balanceView.innerHTML = `<p>Balance: ${balance} Cookies</p>`;
    cookiePriceView.innerHTML = `<p>Cookie Price: ${cookiePrice} Cookies</p>`;
    cookiesPerSecondView.innerHTML = `<p>Cookies/s: ${cookiesPerSecond} Cookies</p>`;
}

setInterval(() => {
    balance = balance + cookiesPerSecond;
    update();
}, 1000)

$("#cookie").click( () => {
    balance = balance + cookiePrice;
    update();
})