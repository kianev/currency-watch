/**
 * 1. Load currency rates
 *    + Currency data is loaded from Open Exchange rates
 *    + We use JSON and jQuery to load the rates
 * 2. Show currency rates (EUR, GPB, JPY, BGN)
 *    + Currency rates are to be shown in tabular format
 *      + when a rate goes up, a green arrow should be shown
 *      + when a rate goes down, a red arrow should be shown
 * 3. The rates are to be updated every 5 seconds
 */

let currenciesToShow = ["EUR", "GBP", "JPY", "BGN", "AUD"];

function initializeTable(currencies) {
  currencies.forEach((symbol) => {
    let row = $(`<tr><td>USD/${symbol}</td><td id="${symbol}"></td><td class="arrow"></td></tr>`);
    $("table#currencies").append(row);
  });
}

function loadCurrencyRates() {
  $.getJSON("https://openexchangerates.org/api/latest.json", { app_id: "282beb85831a4aadad7086809d54e5fb" }, (data) => {
    let randomRates = randomizeCurrencyRates(data.rates);
    showCurrencyRates(randomRates);
  });
}

function randomizeCurrencyRates(rates) {
  currenciesToShow.forEach(function(symbol) {
    let value = currency(rates[symbol]);
    let randomized = Math.random() * ((value + 0.05) - value) + value;

    rates[symbol] = randomized;
  });

  return rates;
}

function showCurrencyRates(rates) {
  currenciesToShow.forEach(function(symbol) {
    let td = $("td#" + symbol.toUpperCase());
    let arrowTd = td.siblings(".arrow");

    let value = currency(rates[symbol]);
    let oldValue = currency(td.html());

    td.html(formatCurrency(value));
    console.log({ value, oldValue, symbol });

    arrowTd.empty();
    if (value > oldValue) {
      arrowTd.append('<img src="images/greenArrow1.jpg">');
    } else if (value < oldValue) {
      arrowTd.append('<img src="images/redArrow1.jpg">');
    }
  });
}

function currency(value) {
  return Number(formatCurrency(value));
}

function formatCurrency(value) {
  return Number(value).toFixed(4);
}

$(document).ready(function() {
  initializeTable(currenciesToShow);
  setInterval(loadCurrencyRates, 1000);
});
