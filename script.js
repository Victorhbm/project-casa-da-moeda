const getButton = document.getElementById('btn');
const getCurrencyList = document.getElementById('currency-list');
const getInputCurrency = document.getElementById('input-currency');
const getInputNumber = document.getElementById('input-number');
const getSubtitle = document.getElementById('sub-title');
const getCurrencys = document.querySelectorAll('.currency');

function changeSubtitle(info, ref) {
  getSubtitle.innerText = `Exibindo cotação de ${ref} ${info}`;
}

function fetchCurrency(currency) {
  const URL = `https://api.exchangerate.host/latest?base=${currency}`;

  const getFetch = fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      changeSubtitle(data.base, getInputNumber.value);
      return data.rates;
    });
  
  return getFetch;
}

getButton.addEventListener('click', async () => {
  const getFetch = await fetchCurrency(getInputCurrency.value);
  getCurrencyList.innerHTML = '';

  for (const key in getFetch) {
    const createLi = document.createElement('li');
    createLi.className = 'currency';
    const multiply = getFetch[key] * getInputNumber.value;
    createLi.innerHTML = `<span class="span-key">${key}:</span> ${multiply.toFixed(2)}`;
    getCurrencyList.appendChild(createLi);
  }
})