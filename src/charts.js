import * as d3 from 'd3';

const drawChart = (width, height, data) => {
  console.log(data);
  const svg = d3
    .select('#chart')
    .append('svg')
    .attr('height', height)
    .attr('width', width)
    .style('border', '1px solid black');

  const selection = svg.selectAll('rect').data(data);
  const yScale = d3
    .scaleLinear()
    //data [10, 40, 30, 20, 50, 10], height 400
    .domain([0, d3.max(data)])
    .range([0, height - 50]);

  // selection
  //   .transition()
  //   .duration(300)
  //   .attr('height', (d) => yScale(d))
  //   .attr('y', (d) => height - yScale(d));

  selection
    .enter()
    .append('rect')
    .attr('x', (d, i) => {
      console.log(d, i);
      return i * 55;
    })
    .attr('y', (d) => {
      console.log(height);
      return height;
    })
    .attr('width', 40)
    .attr('height', 0)
    .attr('fill', 'green')
    .transition()
    .duration(300)
    .attr('height', (d) => {
      console.log('data', d, yScale(d));
      return yScale(d);
    })
    .attr('y', (d) => height - yScale(d));

  // selection
  //   .exit()
  //   .transition()
  //   .duration(300)
  //   .attr('y', (d) => height)
  //   .attr('height', 0)
  //   .remove();
};

export default drawChart;
