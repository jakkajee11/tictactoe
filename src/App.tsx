import React from 'react';
import logo from './logo.svg';
import { Button } from 'antd';
import 'antd/dist/reset.css';
import './App.css';
import Game from './components/Game';

function App() {
  return (
    <div className='App'>
      <Game />
    </div>
  );
}

export default App;
