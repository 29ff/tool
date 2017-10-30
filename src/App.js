import React, { Component } from 'react';
import Textbox from './Textbox';
import Result from './Result';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="temando.gif" className="App-logo" alt="logo" />
        </header>
        <Textbox />
        <Result />
      </div>
    );
  }
}

export default App;
