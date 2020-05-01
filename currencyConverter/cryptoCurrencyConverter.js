const cryptoCurrency = document.getElementById('cryptoCurrency');
const convertedCurrency = document.getElementById('convertedCurrency');
const converterButton = document.getElementById('button');
const coinsList = document.getElementById('select1');
const currencyList = document.getElementById('select2');

const getCoinsList = () => {
  fetch('https://api.coingecko.com/api/v3/coins/list')
    .then(data => data.json())
    .then(data => {
      data = data.slice(200, 1000);
      for (let i = 0; i < data.length; i++) {
        coinsList.innerHTML = coinsList.innerHTML +
          '<option value="' + data[i]['id'] + '">' + data[i]['id'].toUpperCase() + '</option>';
      }
    });

};

const getSupportedCurrencyList = () => {
  fetch('https://api.coingecko.com/api/v3/simple/supported_vs_currencies')
    .then(data => data.json())
    .then(data => {
      console.log(data);

      for (var i = 0; i < data.length; i++) {
        currencyList.innerHTML = currencyList.innerHTML +
          '<option value="' + data[i] + '">' + data[i].toUpperCase() + '</option>';
      }
    });
};

const getCurrentPrice = () => {
  console.log(cryptoCurrency.value);
  const selectedCurrency = currencyList.value;
  const selectedCoin = coinsList.value;
  fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${selectedCoin}&vs_currencies=${selectedCurrency}`)
    .then(data => data.json())
    .then(data => {
      convertedCurrency.value = parseInt(cryptoCurrency.value) * data[selectedCoin][selectedCurrency];
    });
}

getSupportedCurrencyList();
getCoinsList();
