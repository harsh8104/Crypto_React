import React, { useContext, useEffect, useState } from "react";
import "./Coin.css";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";
import LineChart from "../../components/LineChart/LineChart";

function Coin() {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState();
  const currency = useContext(CoinContext);
  const [histData, setHistData] = useState();
  const fetchCoinData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-R77recR1dBBBN8sqpU8KCbaJ",
      },
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then((response) => response.json())
      .then((response) => setCoinData(response))
      .catch((err) => console.error(err));
  };
  const fetchHistData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-R77recR1dBBBN8sqpU8KCbaJ",
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.currency.name}&days=10&interval=daily`,
      options
    )
      .then((response) => response.json())
      .then((response) => setHistData(response))
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    fetchCoinData();
    fetchHistData();
  }, [currency]);

  if (coinData && histData)
    return (
      <div className="coin">
        <div className="coin-name">
          <img src={coinData.image.large} alt="" />
          <p>
            <b>
              {coinData.name} ({coinData.symbol.toUpperCase()})
            </b>
          </p>
        </div>
        <div className="coin-chart">
          <LineChart histData={histData}></LineChart>
        </div>
        <div className="coin-info">
          <ul>
            <li>Crypto Market Rank</li>
            <li>{coinData.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Price</li>
            <li>
              {currency.currency.symbol}
              {coinData.market_data.current_price[
                currency.currency.name
              ].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>Market Cap</li>
            <li>
              {currency.currency.symbol}
              {coinData.market_data.market_cap[
                currency.currency.name
              ].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24 Hour high</li>
            <li>
              {currency.currency.symbol}
              {coinData.market_data.high_24h[
                currency.currency.name
              ].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24 Hour low</li>
            <li>
              {currency.currency.symbol}
              {coinData.market_data.low_24h[
                currency.currency.name
              ].toLocaleString()}
            </li>
          </ul>
        </div>
      </div>
    );
  else
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
}

export default Coin;
