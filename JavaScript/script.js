const apikey = "8dd7yc5Y9q1jTT5s55LhNLDytmDNLUCw";

const dropList = document.querySelectorAll(".drop-list select"),
exchangeIcon = document.querySelector(".drop-list .icon"),
getButton = document.querySelector("form button"),
fromCurr = document.querySelector(".from select"),
toCurr = document.querySelector(".to select");

for (let i = 0; i < dropList.length; i++)
{
  for (curr_code in currency_code)
  {
    //set default conversion as EUR -> USD
    let selected;

    if (i == 0)
    {
      selected = curr_code == "EUR" ? "selected": "";
    }
    else if (i == 1)
    {
      selected = curr_code == "USD" ? "selected": "";
    }

    let optionTag = `<option value ="${curr_code}" ${selected}> ${curr_code}</option>`;
    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }

  dropList[i].addEventListener("change", e => {
    LoadFlag(e.target);
  });
}

getButton.addEventListener("click", e =>{
    e.preventDefault();
    getConversionRate();
});

window.addEventListener("load", () =>{
    getConversionRate();
});

exchangeIcon.addEventListener("click", ()=>{
  let tempCode = fromCurr.value;
  fromCurr.value = toCurr.value;
  toCurr.value = tempCode;

  LoadFlag(fromCurr);
  LoadFlag(toCurr);
  getConversionRate();
});

function getConversionRate()
{
  const amount = document.getElementById("amount-box");

  exchangeRateTxt = document.querySelector(".exchange-rate");

  let amountVal = amount.value;

  if (amountVal == "" || amountVal == "0")
  {
    amount.value = "1";
    amountVal = 1;
  }

  exchangeRateTxt.innerText ="Converting...";

  let base_url = `https://api.apilayer.com/exchangerates_data/latest?symbols&base=${fromCurr.value}&apikey=${apikey}`;
  fetch(base_url).then(response => response.json()).then(result =>{
    let conversion_rate = result.rates[toCurr.value];
    let convertedAmount = (amountVal * conversion_rate).toFixed(3);

    exchangeRateTxt.innerText = `${amountVal} ${fromCurr.value} = ${convertedAmount} ${toCurr.value}`;
  }).catch(() => {
    exchangeRateTxt.innerText ="An Error ocurred.";
  });
}

function LoadFlag(element)
{
  for (code in currency_code)
  {
    if (code == element.value)
    {
      let imgTag = element.parentElement.querySelector("img");
      imgTag.src = `https://countryflagsapi.com/png/${currency_code[code]}`;
    }
  }
}
