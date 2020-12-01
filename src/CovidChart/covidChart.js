import { useEffect } from "react";

const CovidChart = (props) => {
  const data = [];

  for (let key in props.data) {
    let pair = { key: key, value: props.data[key] };
    data.push(pair);
  }
  const colorPallete = {
    active: "orange",
    confirmed: "blue",
    recovered: "red",
    deceased: "green",
  };
  const dimensions={
    height: 500,
    width: 400
  }
  //props.drawChart()
  useEffect(() => {
    props.drawChart(
      "#chart",
      data.filter((d) => d.key !== "name"),
      colorPallete,
      dimensions
    );
    console.log("enter useEffect")
  },[data]);

  return <div id="chart" />;
};

export default CovidChart;
