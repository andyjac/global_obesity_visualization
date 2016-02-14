import _ from 'lodash';
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom'
import d3 from 'd3';

const WIDTH = 1000;
const HEIGHT = 500;
const MARGINS = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 50
};

class LocationStats extends Component {
  constructor(props) {
    super(props);
  }

  getYScale(stats) {
    var max = d3.max(stats, s => { return s.average; });

    return d3.scale.linear()
      .range([HEIGHT - MARGINS.top, MARGINS.bottom])
      .domain([0, max]);
  }

  getXScale(stats) {
    var min = d3.min(stats, s => { return s.year; });
    var max = d3.max(stats, s => { return s.year; });

    return d3.scale.linear()
      .range([MARGINS.left, WIDTH - MARGINS.right])
      .domain([min, max]);
  }

  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    if (!this.props.stats) {
      return null;
    }

    var stats = this.props.stats;
    var xScale = this.getXScale(stats);
    var yScale = this.getYScale(stats);

    var xAxis = d3.svg.axis()
        .orient('bottom')
        .scale(xScale);

    var yAxis = d3.svg.axis()
        .orient('left')
        .scale(yScale);

    d3.select(findDOMNode(this.refs.xAxis))
      .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
      .call(xAxis);

    d3.select(findDOMNode(this.refs.yAxis))
      .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
      .call(yAxis);
  }

  render() {
    if (!this.props.stats) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <h1>Location Stats:</h1>
        <svg height={HEIGHT} width={WIDTH}>
          <g ref="xAxis"></g>
          <g ref="yAxis"></g>
        </svg>
      </div>
    );
  }
}

export default LocationStats;
