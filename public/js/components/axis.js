import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import d3 from 'd3';

class Axis extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    var axis = d3.svg.axis()
        .orient(this.props.orient)
        .scale(this.props.scale);

    d3.select(findDOMNode(this)).call(axis);
  }

  render() {
    return (
      <g transform={this.props.translate}></g>
    );
  }
}

export default Axis;
