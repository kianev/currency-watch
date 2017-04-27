
let ratesJSON = $.get("https://openexchangerates.org/api/latest.json",{app_id: "282beb85831a4aadad7086809d54e5fb"},
    function (data) {$("#eur").append((1/(data.rates.EUR)).toFixed(4));
                     $("#gbp").append((1/(data.rates.GBP)).toFixed(4));
                     $("#jpy").append((data.rates.JPY).toFixed(4));
                     $("#aud").append((data.rates.AUD).toFixed(4));
                     $("#bgn").append((data.rates.BGN).toFixed(4))});

