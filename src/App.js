import React, { Component } from 'react';
import Container from './Container';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container />
        github地址：
        <a href="https://github.com/wtfjun/reactImageDemo">
          https://github.com/wtfjun/reactImageDemo
        </a>
      </div>
    );
  }
}

export default App;
