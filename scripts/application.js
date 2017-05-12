/**
 * 1. Get initial FX Rates from JSON
 * 2. update HTML Table with the data
 * 3. update FX Rates JSON and comparison with the previous FX Ratas
 * 4. get the color codes for movement and arrow signals
 */

const appID = "282beb85831a4aadad7086809d54e5fb";
const openExchangeRatesURL = "https://openexchangerates.org/api/latest.json";

function getInitialData() {
    $.getJSON(openExchangeRatesURL, {app_id: appID},
        function (data) {
            let currInit = [data.rates.USD, data.rates.EUR, data.rates.GBP, data.rates.JPY, data.rates.AUD, data.rates.BGN];
                //update initial HTML table with rates
            for (let i = 1; i < currInit.length; i++) {
                $("#" + i).append((currInit[i]).toFixed(4));
            }
        });
    }

setInterval(function updateData() {

    for (let i = 1; i < 6; i++) {
       //comparison initial rates
        let cur = Number($("#" + i).html());
       //get the new rates
        $.getJSON(openExchangeRatesURL, {app_id: appID},
            function (data) {
                let currUpdate = [data.rates.USD, data.rates.EUR, data.rates.GBP, data.rates.JPY, data.rates.AUD, data.rates.BGN];

                let diff = cur - Number((currUpdate[i]).toFixed(4));
                let colorCurr = diff == 0 ? "blue" : (diff > 0 ? "red" : "green");

                $("#" + i).css("color", colorCurr)
                        .empty()
                        .append((currUpdate[i])
                        .toFixed(4));

                if(diff > 0){
                    $(".curr" + i)
                        .empty()
                        .append('<img src="images/redArrow1.jpg"/>');
                }else if(diff < 0){
                    $(".curr" + i)
                        .empty()
                        .append('<img src="images/greenArrow1.jpg"/>');
                }
            });
    }
}, 6000);

let randomEurRates = setInterval(function () {getRandomFXRates(1.084,1.089)}, 2000);

function getRandomFXRates(min, max) {
    console.log((Math.random() * (max - min) + min).toFixed(4));
}
//clearInterval(randomRates);

//to be discussed

 function getData(url,app_id) {
 return $.getJSON(url, {app_id: app_id }, {});
 }

 getData(openExchangeRatesURL,appID).done(function (newData) {

    //console.log(newData);
 });

