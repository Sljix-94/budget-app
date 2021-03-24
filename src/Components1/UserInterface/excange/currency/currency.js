import React from "react";
import Aux from "../../../../hoc/Auxilary/Auxilary";
import classes from "./currency.module.css";

const currency = (props) => {
  return (
    <Aux>
      <select className={classes.Select} defaultValue="EUR">
        <option defaultValue="AED">AED</option>
        <option defaultValue="ARS">ARS</option>
        <option defaultValue="AUD">AUD</option>
        <option defaultValue="BGN">BGN</option>
        <option defaultValue="BRL">BRL</option>
        <option defaultValue="BSD">BSD</option>
        <option defaultValue="CAD">CAD</option>
        <option defaultValue="CHF">CHF</option>
        <option defaultValue="CLP">CLP</option>
        <option defaultValue="CNY">CNY</option>
        <option defaultValue="COP">COP</option>
        <option defaultValue="CZK">CZK</option>
        <option defaultValue="DKK">DKK</option>
        <option defaultValue="DOP">DOP</option>
        <option defaultValue="EGP">EGP</option>
        <option defaultValue="EUR">EUR</option>
        <option defaultValue="FJD">FJD</option>
        <option defaultValue="GBP">GBP</option>
        <option defaultValue="GTQ">GTQ</option>
        <option defaultValue="HKD">HKD</option>
        <option defaultValue="HRK">HRK</option>
        <option defaultValue="HUF">HUF</option>
        <option defaultValue="IDR">IDR</option>
        <option defaultValue="ILS">ILS</option>
        <option defaultValue="INR">INR</option>
        <option defaultValue="ISK">ISK</option>
        <option defaultValue="JPY">JPY</option>
        <option defaultValue="KRW">KRW</option>
        <option defaultValue="KZT">KZT</option>
        <option defaultValue="MXN">MXN</option>
        <option defaultValue="MYR">MYR</option>
        <option defaultValue="NOK">NOK</option>
        <option defaultValue="NZD">NZD</option>
        <option defaultValue="PAB">PAB</option>
        <option defaultValue="PEN">PEN</option>
        <option defaultValue="PKR">PKR</option>
        <option defaultValue="PLN">PLN</option>
        <option defaultValue="PYG">PYG</option>
        <option defaultValue="RON">RON</option>
        <option defaultValue="RUB">RUB</option>
        <option defaultValue="SAR">SAR</option>
        <option defaultValue="SEK">SEK</option>
        <option defaultValue="SGD">SGD</option>
        <option defaultValue="THB">THB</option>
        <option defaultValue="TRY">TRY</option>
        <option defaultValue="TWD">TWD</option>
        <option defaultValue="UAH">UAH</option>
        <option defaultValue="USD">USD</option>
        <option defaultValue="UYU">UYU</option>
        <option defaultValue="VND">VND</option>
        <option defaultValue="ZAR">ZAR</option>
      </select>
    </Aux>
  );
};
export default currency;
