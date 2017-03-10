import React, { Component } from 'react';
import '../App.css';
import MainComponent from './mainComponent';

class App extends Component {
  render() {
    return (
      <div className='container-fluid'>
        <div className='col-md-1'></div>
        <div className='col-md-10'>
          <MainComponent></MainComponent>
        </div>
        <div className='col-md-1'></div>

      </div>
    );
  }
}

export default App;
