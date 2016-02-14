import _ from 'lodash';
import React, { Component } from 'react';
import request from 'superagent';
import LocationStats from './location_stats';

class LocationPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locationStats: null
    };
  }

  componentDidMount() {
    var locationId = this.refs.locationPicker.value;

    this.requestLocationStats(locationId);
  }

  requestLocationStats(id) {
    var locationStatsUrl = `${this.props.baseUrl}/${id}`;

    request
      .get(locationStatsUrl)
      .end((err, res) => {
        if (err) {
          return console.log(err);
        }

        this.setState({locationStats: res.body});
      });
  }

  renderLocationOptions() {
    return _.map(this.props.locations, location => {
      return (
        <option key={location.location_id} value={location.location_id}>
          {location.location_name}
        </option>
      );
    });
  }

  handleChange(e) {
    var locationId = e.target.value;

    this.requestLocationStats(locationId);
  }

  render() {
    return (
      <div>
        <p>Choose a location:</p>
        <select ref="locationPicker" onChange={e => this.handleChange(e)}>
          {this.renderLocationOptions()}
        </select>
        <LocationStats stats={this.state.locationStats} />
      </div>
    );
  }
}

export default LocationPicker;
