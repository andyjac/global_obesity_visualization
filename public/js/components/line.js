import React, { Component } from 'react';
import d3 from 'd3';

class Line extends Component {
  constructor(props) {
    super(props);
  }

  renderLine() {
    var line = d3.svg.line()
        .x(d => { return this.props.xScale(d.year); })
        .y(d => { return this.props.yScale(d.average); })
        .interpolate('basis');

    return line(this.props.dataPoints);
  }

  render() {
    if (!this.props.dataPoints) {
      return null;
    }

    return (
      <path d={this.renderLine()} stroke={this.props.strokeColor}
            strokeWidth="2" fill="none">
      </path>
    );
  }
}

export default Line;
