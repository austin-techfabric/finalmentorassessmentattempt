import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { fetchTasks, createTask, deleteTask, markCompleted } from './reducer';

import routes from './routes'

import './App.css';


export default class App extends Component {
  render() {
    return (
      <div className="App">
      {routes}
      </div>
    );
  }
}