import React from 'react'
import { useEffect } from 'react';
import Todo from './Todo.js'
import '../styles/styles.css'
export default class TodoList extends React.Component {
  constructor() {
    super();
    this.state = {

    }
  }
  render() {
    return (
      <>
        {this.props.list.map((item) => (
          <Todo
            key={item.id}
            item={item}
            onClick={this.props.onClick}
          />
        ))}
        <form onSubmit={this.props.addItem}>
          <input
            type='text'
            value={this.props.newTodo}
            placeholder='enter new item'
            onChange={this.props.onChange}
          />
          <button type='submit'>Add Item</button>
        </form>
        <button id='hide-button' onClick={this.props.hide}>{this.props.hiding ? 'Show Completed' : 'Hide Completed'}</button>
      </>
    )
  }
}
