//const appID = "282beb85831a4aadad7086809d54e5fb";
const appID = "765c6dc585e24300a2718e68dc2c8481";
const openExchangeRatesURL = "https://openexchangerates.org/api/latest.json";


$(document).on("click", "#button1", function () {
    initTable();
});

function getDesiredRates() {
    let symbols = [];
    $.each($("input[name='currency']:checked"), function () {
        symbols.push($(this).val());
    });
    return symbols;
}

function initTable() {
    let table = $("table#currencies");
    $("tr.currency", table).remove();
    getDesiredRates().forEach(function (symbol) {
        let row = $(`<tr class="currency"><td>USD/${symbol}</td><td id="${symbol.toLowerCase()}"></td><td class="curr"></td></tr>`);
        table.append(row);
    })
}

function refreshTickerTable() {
    $.getJSON(openExchangeRatesURL, {app_id: appID}, (data) => {
        let randomizedRates = randomRates(data.rates);
        updateTicker(randomizedRates)
    })
}

function randomRates(rates) {
    getDesiredRates().forEach(function (symbol) {
        let value = Number(formatRates(rates[symbol]));
        let randomRate = Math.random() * ((value + 0.005) - value) + value;

        rates[symbol] = randomRate;
    });
    return rates;
}

function updateTicker(rates) {
    getDesiredRates().forEach(function (symbol) {
        let td = $("td#" + symbol.toLowerCase());
        let currTd = td.siblings(".curr");

        let htmlValue = Number(formatRates(td.html()));
        let value = Number(formatRates(rates[symbol]));

        td.html(value);

        currTd.empty();
        if (value > htmlValue) {
            currTd.append('<img src="images/greenArrow1.jpg">');
        } else if (value < htmlValue) {
            currTd.append('<img src="images/redArrow1.jpg">');
        }

    })
}

function formatRates(data) {
    return Number(data).toFixed(4);
}

function initTicker() {
    initTable();
    setInterval(refreshTickerTable, 1000)
}