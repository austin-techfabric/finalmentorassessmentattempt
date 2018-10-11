import axios from 'axios';

const initialState = {
    tasks: [],
}
const ONE_TASK = 'ONE_TASK'
const FETCH_TASKS = 'FETCH_TASKS'
const CREATE_TASK = 'CREATE_TASK'
const EDIT_TASK = 'EDIT_TASK'
const DELETE_TASK = 'DELETE_TASK'
const SET_COMPLETE = 'SET_COMPLETE'

export default function reducer( state = initialState, action) {
    console.log(action.payload)
    switch(action.type){
        case FETCH_TASKS + `_FULFILLED`:
            return {...state, tasks: action.payload}
        case ONE_TASK + `_FULFILLED`:
            return {...state, tasks: action.payload}
        case CREATE_TASK + `_FULFILLED`:
            return {...state, tasks: action.payload}
        case EDIT_TASK + `_FULFILLED`:
            return {...state, tasks: action.payload}
        case DELETE_TASK + `_FULFILLED`:
            return {...state, tasks: action.payload}
        case SET_COMPLETE + `_FULFILLED`:
            return {...state, tasks: action.payload}
        default:
        return state
    }
}
export function fetchTasks(){
    return {
        type: FETCH_TASKS,
        payload: axios.get('https://practiceapi.devmountain.com/api/tasks').then(response => {
            return response.data
        })
    }
}
export function createTask(title){
    return {
        type: CREATE_TASK,
        payload: axios.post('https://practiceapi.devmountain.com/api/tasks', {title: title}).then(response => {
            
            return response.data
        })
    }
}
export function editTask(id, title, description){
    return {
        type: EDIT_TASK,
        payload: axios.patch(`https://practiceapi.devmountain.com/api/tasks/${id}`, {title: title, description: description}).then(response => {
            return response.data
        })
    }
}

export function deleteTask(id){
    return {
        type: DELETE_TASK,
        payload: axios.delete(`https://practiceapi.devmountain.com/api/tasks/${id}`).then(response => {
            console.log('response', response)
            return response.data
        })
    }
}

export function markCompleted(id){
    let tasks = axios.put(`https://practiceapi.devmountain.com/api/tasks/${id}`).then(response => {
            return response.data
        })
    return {
        type: SET_COMPLETE,
        payload: tasks
    }
}

export function oneTask(id){
    let tasks = axios.get('https://practiceapi.devmountain.com/api/tasks').then(response => {
        return response.data.filter(item => item.id == id)
    })
    return {
        type: ONE_TASK,
        payload: tasks
    }
}