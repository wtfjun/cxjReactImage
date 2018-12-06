import React, { Component } from 'react';
import Container from './Container';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container />
        github地址：
        <a href="https://wtfjun.github.io/reactImageDemo">
          https://wtfjun.github.io/reactImageDemo
        </a>
      </div>
    );
  }
}

export default App;
