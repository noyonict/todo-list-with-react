import React from 'react';
import todo_list from './todos'

class App extends React.Component{
state = {
  todos: todo_list,
  createTodoText: '',
  isUpdate: false,
  updateTodoText: false,
  updatedTodo: {}
}

// componentDidMount() {
//   fetch('api/link')
//     .then(res => res.json())
//     .then(json => {
//         this.setState({
//           todos: json
//         })
//     })
// }

_createTask = (e) => {
  this.setState({
    createTodoText: e.target.value
  })
}

_createTaskList = () => {
  let todo = {
    id: Date.now(),
    text: this.state.createTodoText,
    completion: false
  }
  let todos = [...this.state.todos, todo]
  this.setState({
    todos,
    createTodoText: ''
  })
}

_showTodoText = (todo) => {
  if (todo.completion){
    return <span onClick={() => this._changeTaskCompletion(todo)} className="lt">{todo.text}</span>
  }
  return <span onClick={() => this._changeTaskCompletion(todo)}>{todo.text}</span>
}

_changeTaskCompletion = (td) => {
  let todos = this.state.todos.map(todo =>{
    if (td.id === todo.id) {
      return {
        id: todo.id,
        text: todo.text,
        completion: ! todo.completion
      }
      }else{
        return todo
      }
  });
  this.setState({
    todos
  })
}
_changeTaskText = (e) => {
  this.setState({
    updateTodoText: e.target.value
  })
}

_updateTaskText = (td) => {
  let todos = this.state.todos.map( todo => {
    if (todo.id === td.id){
      return {
        id: todo.id,
        completion: todo.completion,
        text: this.state.updateTodoText
      }
    }else{
      return todo
    }
  })
  this.setState({
    todos,
    isUpdate: false,
  })
}

_updateBlock = (todo) =>{
return (
  <div className="card mt-nativeEvent2">
    <div className="card-header">
      <h2>Update your task</h2>
    </div>
    <div className="card-body">
    <input 
    type="text" 
    className="form-control"
    value={this.state.updateTodoText}
    onChange={this._changeTaskText}
    />
    <button 
    className="btn btn-primary mt-2"
    onClick={() => this._updateTaskText(todo)}
    >
    Update
    </button>
    </div>
    </div>
  )
}
_updateStart = (todo) => {
  this.setState({
    isUpdate: true,
    updatedTodo: todo,
    updateTodoText: todo.text
  })
}

_createBlock = () => {
  return <div className="card mt-3">
  <div className="card-header">
    <h2>Create new task</h2>
  </div>
  <div className="card-body">
    <input 
    type="text" 
    className="form-control"
    value={this.state.createTodoText}
    onChange={this._createTask}
    />
    <button 
    onClick={this._createTaskList}
    className="btn btn-success mt-2">
    Create</button>
  </div>
</div>
}

_deleteTask = (td) => {
  let todos = this.state.todos.filter(todo => todo.id !== td.id)
  this.setState({
    todos,

  })
}

  render(){
    // console.log('state', this.state);
    return (
      <div className="container">
    <div className="card mt-5">
    
    <div className="card-header">
      <h2>All task list</h2>
    </div>
    <div className="card-body">
        {
          this.state.todos.map(todo => {
            return <li 
            className="todo_item"  
            key={todo.id}>
            {this._showTodoText(todo)}
            <button 
            onClick={() => this._updateStart(todo)} 
            className="btn btn-success m-2">
            Edit</button>
            <button 
            onClick={() => this._deleteTask(todo)}
            className="btn btn-danger m-2">
            Delete</button>
            </li>
          })
        }
        </div>
      </div>

      {
        this.state.isUpdate ? this._updateBlock(this.state.updatedTodo) : null
      }
      {
        this._createBlock()
      }

      </div>
    )
  }
}
export default App;
