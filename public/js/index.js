import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: 'hello from react'
    };
  }

  render() {
    return (
        <h1>{this.state.message}</h1>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
