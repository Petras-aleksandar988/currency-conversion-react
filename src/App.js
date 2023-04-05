import { useState, useEffect } from "react";
import "./App.css";
import Currency from "./components/Currency";
// api_key = QkLtMEp4KZ4ML6SEavFei09sX7Ctof8i
const myHeaders = new Headers();
myHeaders.append("apikey", "QkLtMEp4KZ4ML6SEavFei09sX7Ctof8i");

const requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: myHeaders,
};

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  console.log(currencyOptions);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [excangeRate, setExangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountFromCurrency, setAmountFromCurrency] = useState(true);
  console.log(excangeRate);

  let fromAmount, toAmount;
  // defining witch of two input fields we changed
  if (amountFromCurrency) {
    fromAmount = amount;
    toAmount = amount * excangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / excangeRate;
  }

  function handleFromAmount(e) {
    setAmount(e.target.value);
    setAmountFromCurrency(true);
  }
  function handleToAmount(e) {
    setAmount(e.target.value);
    setAmountFromCurrency(false);
  }

  useEffect(() => {
    // fetching data when staring app
    async function fetchData() {
      try {
        const response = await fetch(
          "https://api.apilayer.com/exchangerates_data/latest",
          requestOptions
        );
        const data = await response.json();
        console.log(data);
         // displaying first currency rate when oening page
        const firstCurrency = Object.keys(data.rates)[0];
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExangeRate(data.rates[firstCurrency]);
      } catch (error) {
        console.log(error);
      }
    }
    //  fetchData()
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        
        // fetch data in case we chane currency 
        if (fromCurrency != null && toCurrency != null) {
          const response = await fetch(
            `https://api.apilayer.com/exchangerates_data/latest?symbols=${toCurrency}&base=${fromCurrency}`,
            requestOptions
          );
          const data = await response.json();
          setExangeRate(data.rates[toCurrency]);
        }
      } catch (error) {
        console.log(error);
      }
    }
    //  fetchData()
  }, [fromCurrency, toCurrency]);
  return (
    <div className="container">
      <h1>Convert</h1>
      <Currency
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        pickCurrency={(e) => setFromCurrency(e.target.value)}
        amount={fromAmount}
        onChangeAmount={handleFromAmount}
      />
      <div className="equals">=</div>
      <Currency
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        pickCurrency={(e) => setToCurrency(e.target.value)}
        amount={toAmount}
        onChangeAmount={handleToAmount}
      />
    </div>
  );
}

export default App;
