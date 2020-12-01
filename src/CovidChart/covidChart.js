import { useEffect, useRef } from 'react';
import drawChart from "./DrawChart"

const CovidChart = (props) => {
  const data = [];

  for (let key in props.data) {
    let pair = { key: key, value: props.data[key] };
    data.push(pair);
  }
  const chart = useRef(null);
  const colorPallete={
    'active': 'orange',
    'confirmed': 'blue',
    'recovered':'red',
    'deceased': 'green'
  }

  useEffect(() => {
    drawChart(chart.current, data.filter((d) => d.key !== 'name'),colorPallete);
  });

  return <div ref={chart} id="chart" />;
};

export default CovidChart;
