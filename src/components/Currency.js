import React from "react";

export default function Currency({
  currencyOptions,
  selectedCurrency,
  pickCurrency,
  amount,
  onChangeAmount
}) {
  return (
    <div>
      <input type="number" className="input" value={amount} onChange={onChangeAmount}/>
      <select value={selectedCurrency} onChange={pickCurrency}>
        {currencyOptions.map((currency, index) => {
          return (
            <option key={index} value={currency}>
              {currency}
            </option>
          );
        })}
      </select>
    </div>
  );
}
