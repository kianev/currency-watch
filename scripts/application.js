
const appID = "282beb85831a4aadad7086809d54e5fb";
const openExchangeRatesURL = "https://openexchangerates.org/api/latest.json";

$.getJSON(openExchangeRatesURL, {app_id: appID},
        function (data) {
    if(data){

            $("#eur").append((1 / (data.rates.EUR)).toFixed(4));
            $("#gbp").append((1 / (data.rates.GBP)).toFixed(4));
            $("#jpy").append((data.rates.JPY).toFixed(4));
            $("#aud").append((data.rates.AUD).toFixed(4));
            $("#bgn").append((data.rates.BGN).toFixed(4));

      }
        });

//alternative server request with reusable getData function to be discussed
/*
function getData(url,app_id) {
    return $.getJSON(url, {app_id: app_id }, {});
}

getData(openExchangeRatesURL,appID).done(function (newData) {
    code logic...
});*/

