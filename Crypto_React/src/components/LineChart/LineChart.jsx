import React, { useEffect, useState } from "react";
import chart, { Chart } from "react-google-charts";
import "./LineChart.css";
const LineChart = ({ histData }) => {
  const [data, setData] = useState([["Date", "Prices"]]);
  useEffect(() => {
    let dataCopy = [["Date", "Prices"]];
    if (histData.prices) {
      histData.prices.map((item) => {
        dataCopy.push([
          `${new Date(item[0]).toLocaleDateString().slice(0, -5)}`,
          item[1],
        ]);
      });
      setData(dataCopy);
    }
  }, [histData]);
  return <Chart chartType="LineChart" data={data} height="100%" />;
};

export default LineChart;
