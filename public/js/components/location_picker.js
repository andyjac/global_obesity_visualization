import _ from 'lodash';
import React, { Component } from 'react';
import request from 'superagent';
import LocationStats from './location_stats';

class LocationPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locationName: null,
      locationStats: null
    };
  }

  componentDidMount() {
    var locationId = this.refs.locationPicker.value;

    this.setLocationName();
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

  setLocationName() {
    var selectEl = this.refs.locationPicker;

    if (selectEl.selectedIndex > -1) {
      var i = selectEl.selectedIndex;

      this.setState({
        locationName: selectEl.options[i].text
      });
    }
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
    this.setLocationName();
    this.requestLocationStats(e.target.value);
  }

  render() {
    return (
      <section>
        <p>Choose a location:</p>
        <select ref="locationPicker" onChange={e => this.handleChange(e)}>
          {this.renderLocationOptions()}
        </select>
        <h1>{this.state.locationName}</h1>
        <LocationStats stats={this.state.locationStats} />
      </section>
    );
  }
}

export default LocationPicker;
