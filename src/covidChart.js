import * as d3 from 'd3';
import { useEffect } from 'react';

const CovidChart = (props) => {
  const { data } = props;
  const keys = Object.keys(data[0]);
  const values = Object.values(data);
  const height = 400;
  const width = 600;

  useEffect(() => drawChart(), [data]);

  const drawChart = () => {
    var svg = d3.select('svg'),
      margin = { top: 20, right: 20, bottom: 30, left: 40 },
      width = +svg.attr('width') - margin.left - margin.right,
      height = +svg.attr('height') - margin.top - margin.bottom,
      g = svg
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    const x0 = d3.scaleBand().rangeRound([0, 300]).paddingInner(0.1);
    const x = d3.scaleBand().padding(0.05);
    const y = d3.scaleLinear().rangeRound([height, 0]);
    const z = d3.scaleOrdinal().range(['#16A085', '#33435C']);

    x0.domain(
      data.map(function (d) {
        console.log('coming to x0');
        return d.name;
      })
    );
    x.domain(keys).rangeRound([0, x0.bandwidth()]);
    y.domain([0, 999999]).nice();

    g.append('g')
      .selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .attr('transform', function (d) {
        return 'translate(' + x0(d.name) + ',0)';
      })
      .selectAll('rect')
      .data(function (d) {
        return keys.slice(1).map(function (key) {
          return { key: key, value: d[key] };
        });
      })
      .enter()
      .append('rect')
      .attr('x', function (d) {
        console.log(x(d.key));
        return x(d.key);
      })
      .attr('y', function (d) {
        console.log(d.value, y(d.value));
        return y(d.value);
      })
      .attr('width', x.bandwidth())
      .attr('height', function (d) {
        return height - y(d.value);
      })
      .attr('fill', function (d) {
        return z(d.key);
      });

    g.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x0));

    g.append('g')
      .attr('class', 'axis')
      .call(d3.axisLeft(y).ticks(null, 's'))
      .append('text')
      .attr('x', 2)
      .attr('y', y(y.ticks().pop()) + 0.5)
      .attr('dy', '0.32em')
      .attr('fill', '#000')
      .attr('font-weight', 'bold')
      .attr('text-anchor', 'start')
      .text('Population');

    var legend = g
      .append('g')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .attr('text-anchor', 'end')
      .selectAll('g')
      .data(keys.slice().reverse())
      .enter()
      .append('g')
      .attr('transform', function (d, i) {
        return 'translate(0,' + i * 20 + ')';
      });

    legend
      .append('rect')
      .attr('x', width - 19)
      .attr('width', 19)
      .attr('height', 19)
      .attr('fill', z);

    legend
      .append('text')
      .attr('x', width - 24)
      .attr('y', 9.5)
      .attr('dy', '0.32em')
      .text(function (d) {
        return d;
      });
  };
  return <svg></svg>;
};

export default CovidChart;
