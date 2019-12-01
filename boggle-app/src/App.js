import React, { Component } from 'react';
import logo from './images/logo.png'
import './App.css';
import Game from './components/Game';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="header">
          <img src={logo} className="header-logo" alt="logo" />
        </div>
        <Game />
      </div>
    );
  }
}

export default App;
