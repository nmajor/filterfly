import React, { Component } from 'react';
import FilterImageContainer from '../ImageContainer/ImageContainer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <div>FilterFly.js</div>
        </header>
        <FilterImageContainer />
      </div>
    );
  }
}

export default App;
