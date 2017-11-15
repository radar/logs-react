import React from 'react';
import { timeFormat as d3timeFormat } from 'd3-time-format';
import { timeDays as d3timeDays } from 'd3-time';
import { scaleQuantize as d3scaleQuantize } from 'd3-scale';
import { range as d3range } from 'd3-array';
import { select as d3select } from 'd3-selection';
import { json as d3json } from 'd3-request';
import { nest as d3nest } from 'd3-collection';

class PersonActivity extends React.Component {

  componentDidMount() {
    this.renderChart()
  }

  renderChart() {
    var width = 960,
      height = 136,
      cellSize = 15; // cell size

    var day = d3timeFormat("%w"),
        week = d3timeFormat("%U"),
        format = d3timeFormat("%Y-%m-%d");

    var color = d3scaleQuantize()
        .domain([0, 300])
        .range(d3range(12).map(function(d) { return "q" + d + "-11"; }));

    const node = this.node;

    var svg = d3select(node)
        .data(d3range(2012, 2016))
        .enter().append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "colours")
        .append("g")
        .attr("transform", "translate(" + ((width - cellSize * 53) / 2) + "," + (height - cellSize * 7 - 1) + ")");

    svg.append("text")
        .attr("transform", "translate(-6," + cellSize * 3.5 + ")rotate(-90)")
        .style("text-anchor", "middle")
        .text(function(d) { return d; });

    var rect = svg.selectAll(".day")
        .data(function(d) { return d3timeDays(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
      .enter().append("rect")
        .attr("class", "day")
        .attr("width", cellSize)
        .attr("height", cellSize)
        .attr("x", function(d) { return week(d) * cellSize; })
        .attr("y", function(d) { return day(d) * cellSize; })
        .datum(format);
    d3json("http://localhost:4000/api/p/Radar/activity?_format=json", function(error, json) {
      var data = d3nest()
        .key(function(d) { return d.date; })
        .rollup(function(d) { return d[0].count; })
        .map(json);

      rect.filter(function(d) { return d in data; })
        .attr("class", function(d) { console.log(color(data[d])); return "day " + color(data[d]); })
        .attr("title", function(d) { return data[d] + " messages on " + d })
        .select("title")
        .text(function(d) { return data[d] });
    });
  }
  render () {
    return (<div ref={node => this.node = node}>
    </div>)
  }
}

export default PersonActivity;
