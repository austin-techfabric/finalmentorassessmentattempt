import React, { Component } from 'react';
import { editTask, deleteTask, markCompleted, oneTask } from './reducer';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './EditView.scss'

class EditView extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            description: '',
            task: '',
            id: '',
            completed: null
         }
    }

    componentDidMount() {
        this.props.oneTask(this.props.match.params.id).then(response=>{
            let task = response.value[0]
            this.setState({
                task: task.title,
                id: task.id,
                description: task.description,
                completed: task.completed
            })
        })
        
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handlePost = (id, title, description) => {
        this.props.editTask(id, title, description);
        this.props.history.push('/');
    }
    taskComplete=(id)=>{
      this.props.markCompleted(id);
      this.props.history.push(`/`)
    }
    taskDelete=(id)=>{
        this.props.deleteTask(id);
        setTimeout(() => this.props.history.push('/'), 500)
    }
   

    render() { 
        let { task, description, completed} = this.state;
        let { tasks } = this.props;
        let mappedTasks = tasks ? tasks.map((task, index) => {
            return <div key={index}></div>}) : 'loading...'
        return ( 
            <div >
                {mappedTasks}
                <div className='singleItem'>
                <Link className='Linkbutton' to='/'>Back to Tasks</Link>
                <div>
                        <h2>Title</h2>
                        <input value={task} name='task' onChange={this.handleChange}></input>
                        {completed ? 
                        <button className='button'>Completed</button>
                        : 
                        <button className='button' onClick={() => {this.taskComplete(this.props.match.params.id)}}>Completed</button>
                        }
                </div>
                    <h2>Description</h2>
                    <textarea type='text' value={description} name='description' onChange={this.handleChange}></textarea>
                    <div>
                        <button className='button' onClick={()=> { this.handlePost(this.props.match.params.id, task, description)}}>Save</button>
                        <Link className='Linkbutton' to='/'>Cancel</Link>
                        <button className='button' onClick={()=> {this.taskDelete(this.props.match.params.id)}}>Delete</button>
                    </div>
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
    deleteTask, markCompleted, editTask, oneTask
  }
  
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditView));
