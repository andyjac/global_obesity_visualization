import LocationPicker from './components/location_picker';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';

const API_BASE_URL = '/api/stats';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locations: null
    };
  }

  componentWillMount() {
    request
      .get(API_BASE_URL)
      .end((err, res) => {
        if (err) {
          return console.log(err);
        }

        this.setState({locations: res.body});
      });
  }

  render() {
    if (!this.state.locations) {
      return <p>Loading...</p>;
    }

    return (
      <LocationPicker baseUrl={API_BASE_URL} locations={this.state.locations} />
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
