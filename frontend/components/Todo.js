import React from 'react'

export default class Todo extends React.Component {
  render() {
    return (
      <>
        <p onClick={() => this.props.onClick(this.props.item)}>{this.props.item.name}{this.props.item.completed ? '✔️' : ''}</p>
      </>
    )
  }
}
