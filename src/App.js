import React, { Component } from 'react';
import Button from './Button';
import './App.css';
import './normalize.css';
import './style.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
				<Button />
      </div>
    );
  }
}

export default App;
