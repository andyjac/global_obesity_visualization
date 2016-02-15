import _ from 'lodash';
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import d3 from 'd3';
import Axis from './axis';
import Line from './line';

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

    this.state = {
      male: null,
      female: null,
      both: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.stats) {
      var stats = nextProps.stats;

      this.setState(this.separateStatsBySex(stats));
    }
  }

  separateStatsBySex(stats) {
    return _.reduce(stats, (obj, value) => {
      obj[value.sex] = obj[value.sex] ?
        obj[value.sex].concat(value) :
        [].concat(value);

      return obj;
    }, {});
  }

  getYScale(stats) {
    var max = d3.max(stats, s => { return s.average; });
    var min = d3.min(stats, s => { return s.average; });

    return d3.scale.linear()
      .range([HEIGHT - MARGINS.top, MARGINS.bottom])
      .domain([min, max]);
  }

  getXScale(stats) {
    var min = d3.min(stats, s => { return s.year; });
    var max = d3.max(stats, s => { return s.year; });

    return d3.scale.linear()
      .range([MARGINS.left, WIDTH - MARGINS.right])
      .domain([min, max]);
  }

  render() {
    if (!this.props.stats) {
      return <p>Loading...</p>;
    }

    var xAxisSettings = {
      orient: 'bottom',
      scale: this.getXScale(this.props.stats),
      translate: 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')'
    };

    var yAxisSettings = {
      orient: 'left',
      scale: this.getYScale(this.props.stats),
      translate: 'translate(' + (MARGINS.left) + ',0)'
    };

    var maleLineSettings = {
      xScale: this.getXScale(this.state.male),
      yScale: this.getYScale(this.state.male),
      dataPoints: this.state.male,
      strokeColor: 'blue'
    };

    var femaleLineSettings = {
      xScale: this.getXScale(this.state.female),
      yScale: this.getYScale(this.state.female),
      dataPoints: this.state.female,
      strokeColor: 'green'
    };

    var bothLineSettings = {
      xScale: this.getXScale(this.state.both),
      yScale: this.getYScale(this.state.both),
      dataPoints: this.state.both,
      strokeColor: 'orange'
    };

    return (
      <div>
        <h1>Location Stats:</h1>
        <svg height={HEIGHT} width={WIDTH}>
          <Axis {...xAxisSettings} />
          <Axis {...yAxisSettings} />
          <Line {...maleLineSettings} />
          <Line {...femaleLineSettings} />
          <Line {...bothLineSettings} />
        </svg>
      </div>
    );
  }
}

export default LocationStats;
