import React from 'react'
import axios from 'axios';
import TodoList from './TodoList'
const URL = 'http://localhost:9000/api/todos'

const fetchList = (URL) => {
  return (
    axios.get(URL)
    .then((res) => {
    return(res.data.data)
    }).catch((err) => {
      console.error(err)
    })
  )
}
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [],
      hiding: false,
      hidden: [],
      newTodo: ''
    }
  }
  componentDidMount() {
    fetchList(URL).then((res) => {
      this.setState({list: res})
    })
  }
  onClick = (item) => {
    this.setState({
      ...this.state, list: this.state.list.map((node) => {
        if (node.id === item.id) {
          return ({ ...node, completed: !node.completed })
        } else {
          return node;
        }
        
      })
    })
    //PATCH http://localhost:9000/api/todos/:id
    axios.patch(`http://localhost:9000/api/todos/${item.id}`)
      .then((res) => {
      console.log(res)
      }).catch((err) => {
      console.error(err)
    })
  }
  hide = () => {
    if (!this.state.hiding) {
      this.setState({
        ...this.state, hiding: true,
        hidden: this.state.list.filter((item) => {
                  return (item.completed)
                }),
        list: this.state.list.filter((item) => {
                return (!item.completed)
              })
      })
    } else {
      this.setState({
        ...this.state, hiding: false, 
        list: [...this.state.list, ...this.state.hidden]
      })
    }
  }
  onChange = (evt) => {
    this.setState({ ...this.state, newTodo: evt.target.value })
  }
  addItem = (evt) => {
    evt.preventDefault();
    const newItem = {
      name: this.state.newTodo,
      completed: false
    }
    axios.post('http://localhost:9000/api/todos', newItem)
      .then((res) => {
      this.setState({ ...this.state, list: [...this.state.list, res.data.data], newTodo: '' })
    })
  }
  componentDidUpdate() {
    console.log(this.state.newTodo)
  }
  render() {
    return (
      <>
        <TodoList
          list={this.state.list}
          onClick={this.onClick}
          hide={this.hide}
          hiding={this.state.hiding}
          newTodo={this.state.newTodo}
          addItem={this.addItem}
          onChange={this.onChange}
        />
      </>
    )
  }
}
