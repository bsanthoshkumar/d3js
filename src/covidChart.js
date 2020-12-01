import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

const CovidChart = (props) => {
  const data = [];
  const margin = { top: 20, bottom: 50, left: 50, right: 20 };
  const svgHeight = 500;
  const svgWidth = 400;
  const barsHeight = svgHeight - margin.top - margin.bottom;
  const barsWidth = svgWidth - margin.left - margin.right;
  const colors = {
    active: 'orange',
    recovered: 'green',
    deceased: 'red',
    confirmed: 'brown',
  };

  for (let key in props.data) {
    let pair = { key: key, value: props.data[key] };
    data.push(pair);
  }
  const chart = useRef(null);

  const drawChart = (element) => {
    const max = d3.max(data, (d) => (d.key !== 'name' ? d.value : 0));
    const yScale = d3.scaleLinear().domain([0, max]).range([barsHeight, 0]);
    const xScale = d3
      .scaleBand()
      .domain(data.map((p) => p.key).filter((d) => d !== 'name'))
      .range([0, barsWidth])
      .paddingInner(0.3)
      .paddingOuter(0.3);
    d3.select(element).selectAll('svg').remove();

    const svg = d3
      .select(element)
      .append('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const rects = svg
      .selectAll('rect')
      .data(data.filter((d) => d.key !== 'name'));

    rects
      .enter()
      .append('rect')
      .attr('x', (d) => xScale(d.key))
      .attr('y', (d) => yScale(d.value))
      .attr('width', xScale.bandwidth)
      .attr('height', (d) => barsHeight - yScale(d.value))
      .attr('fill', (d) => colors[d.key]);

    const xAxis = d3.axisBottom(xScale);
    svg
      .append('g')
      .attr('transform', `translate(0, ${barsHeight})`)
      .call(xAxis);

    const yAxis = d3.axisLeft(yScale);
    svg.append('g').call(yAxis);
  };

  useEffect(() => {
    drawChart(chart.current);
  });

  return <div ref={chart} id="chart" />;
};

export default CovidChart;
