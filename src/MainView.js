import React, { Component } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { fetchTasks, createTask, deleteTask, markCompleted } from './reducer';

import { connect } from 'react-redux';

import './MainView.scss'

class MainView extends Component {
  constructor() {
    super();
    this.state = {
      showEdit: false,
      inpTitle:'',
      forceRefresh: false,
      rerender: 'false',
    }
  }

  componentDidMount() {
    this.props.fetchTasks()
 
  }
  handleTitle = (e) => {
    this.setState({inpTitle: e.target.value})
  }
  onSubmit (e) {
    e.preventDefault();  
  }
  taskDelete = (id) => {
    // this.setState(this.state)
    // this.forceUpdate()
    this.props.deleteTask(id);
    this.props.history.push('/')
  }
  
  taskCompleted=(id)=>{
    this.props.markCompleted(id);
    this.props.history.push('/')
  }
  reloader() {
    window.location.replace('/')
}  
addNew() {
  this.props.createTask(this.state.inpTitle);
  // this.forceUpdate()
  this.props.history.push('/')
}

  render() {
    console.log(this.props.tasks)
    const { tasks } = this.props
    let tasklist = tasks ? tasks.map((task, index) => {
      return <div className='list' key={index}>
          
          { task.completed
          ?
          <><h3 className='disabled'>{task.title}</h3>
          <button disabled={true}>Complete</button></>
          :
          <><Link to={`/edit/${task.id}`}><h3>{task.title}</h3></Link>
          <button onClick={() => this.taskCompleted(task.id)}>Complete</button></>

          }
          <h1 onClick={() => this.taskDelete(task.id)}>X</h1>
        </div> 
    }) : null;
    return (
      
      <div className='mainVbody'>
        <div className='todoInput'> 
            <form onSubmit={(e) => this.onSubmit(e)} className='head'>
                <h1>TO-DO:</h1>
                <input onChange={(e) => this.handleTitle(e)}></input>
                {!this.state.forceRefresh
                ?
                <button onClick={() => this.addNew()}>Add new To-do</button>
                  : <Redirect to='/'></Redirect>
                  }
            </form>
            </div>
            <div className='listBody'>
              {tasklist}
        </div>
      </div>
    );
  }
}



const mapStateToProps = state => {
  return {
    tasks:state.tasks
  } 
}

const mapDispatchToProps = {
  fetchTasks, createTask, deleteTask, markCompleted
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainView));

