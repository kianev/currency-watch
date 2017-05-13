
const appID = "282beb85831a4aadad7086809d54e5fb";
const appID1 = "765c6dc585e24300a2718e68dc2c8481";
const openExchangeRatesURL = "https://openexchangerates.org/api/latest.json";

let desiredRates =["EUR","GBP", "JPY", "AUD", "BGN",];

function setTable(currencies) {
    currencies.forEach(function (symbol) {
        let cell = $(`<tr><td>USD/${symbol}</td><td id="${symbol.toLowerCase()}"></td><td class="curr"></td></tr>`);
        $("table#currencies").append(cell);
    })
}

function getRates() {
    $.getJSON(openExchangeRatesURL,{app_id: appID1}, (data) => {
        let randomizedRates = randomRates(data.rates);
        showRates(randomizedRates)
    })
}

function randomRates(rates) {
    desiredRates.forEach(function (symbol) {
        let value = Number(formatRates(rates[symbol]));
        let randomRate = Math.random() * ((value + 0.005) - value) + value;

        rates[symbol] = randomRate;
    });
    return rates;
}

function showRates(rates) {
    desiredRates.forEach(function (symbol) {
        let td = $("td#" + symbol.toLowerCase());
        let currTd = td.siblings(".curr");

        let htmlValue = Number(formatRates(td.html()));
        let value = Number(formatRates(rates[symbol]));

        td.html(value);

        currTd.empty();
        if(value > htmlValue){
            currTd.append('<img src="images/greenArrow1.jpg">');
        }else if(value < htmlValue){
            currTd.append('<img src="images/redArrow1.jpg">');
        }

    })
}

function formatRates(data) {
    return Number(data).toFixed(4);
}

setInterval(getRates, 5000);