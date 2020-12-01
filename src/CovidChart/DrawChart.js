import * as d3 from "d3";

const drawChart = (element, data, colorPallete) => {
  const margin = { top: 20, bottom: 50, left: 50, right: 20 };
  const svgHeight = 500;
  const svgWidth = 400;
  const barsHeight = svgHeight - margin.top - margin.bottom;
  const barsWidth = svgWidth - margin.left - margin.right;

  const max = d3.max(data, (d) => d.value);
  const yScale = d3.scaleLinear().domain([0, max]).range([barsHeight, 0]);
  const xScale = d3
    .scaleBand()
    .domain(data.map((p) => p.key))
    .range([0, barsWidth])
    .paddingInner(0.3)
    .paddingOuter(0.3);
  d3.select(element).selectAll("svg").remove();

  const svg = d3
    .select(element)
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const rects = svg.selectAll("rect").data(data);

  rects
    .enter()
    .append("rect")
    .attr("x", (d) => xScale(d.key))
    .attr("y", (d) => yScale(d.value))
    .attr("width", xScale.bandwidth)
    .attr("height", (d) => barsHeight - yScale(d.value))
    .attr("fill", (d) => {
      console.log("d.key" + colorPallete[d.key]);
      return colorPallete[d.key];
    });

  const xAxis = d3.axisBottom(xScale);
  svg.append("g").attr("transform", `translate(0, ${barsHeight})`).call(xAxis);

  const yAxis = d3.axisLeft(yScale);
  svg.append("g").call(yAxis);
};

export default drawChart;
