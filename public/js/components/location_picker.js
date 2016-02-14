import _ from 'lodash';
import React, { Component } from 'react';
import request from 'superagent';

class LocationPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: null
    }
  }

  componentDidMount() {
    var locationId = this.refs.locationPicker.value;

    this.requestLocationStats(locationId);
  }

  requestLocationStats(id) {
    var locationUrl = `${this.props.baseUrl}/${id}`;

    request
      .get(locationUrl)
      .end((err, data) => {
        if (err) {
          return console.log(err);
        }

        this.setState({location: JSON.parse(data.text)});
      })
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
      </div>
    )
  }
}

export default LocationPicker;
