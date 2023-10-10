import { Component } from 'react'
import './Task.css'
import classNames from 'classnames'

export default class Task extends Component {
  state = {
    description: this.props.description,
  }
  onTaskEdit = (event) => {
    this.setState({
      description: event.target.value,
    })
  }

  onEdit = (event) => {
    this.props.stopTimer()
    if (event.key === 'Enter') {
      this.props.onTaskEdit(this.state.description)
      this.props.onToggleEdit()
    }
    if (event.key === 'Escape' || event.type === 'blur') {
      this.setState({
        description: this.props.description,
      })
      this.props.onToggleEdit()
    }
  }

  secondsToTime(sec) {
    const minString = String(Math.floor(sec / 60)).padStart(2, '0')
    const secString = String(sec % 60).padStart(2, '0')
    return `${minString}:${secString}`
  }

  render() {
    const {
      completed,
      editing,
      description,
      time,
      timer,
      onDeleted,
      onToggleDone,
      onToggleEdit,
      startTimer,
      stopTimer,
    } = this.props
    let check = false
    let liClassName = classNames(this.props.className, {
      completed: completed,
      editing: editing,
    })

    const timeString = this.secondsToTime(timer)
    if (completed) {
      check = true
    }
    if (editing) {
      liClassName = 'editing'
      return (
        <input
          type="text"
          className="edit"
          value={this.state.description}
          onChange={this.onTaskEdit}
          onKeyUp={this.onEdit}
          onBlur={this.onEdit}
        />
      )
    }
    return (
      <li className={liClassName}>
        <div className="view">
          <input className="toggle" type="checkbox" onChange={onToggleDone} checked={check} />
          <label>
            <span className="title">{description}</span>
            <span className="description">
              <button className="icon icon-play" onClick={startTimer}></button>
              <button className="icon icon-pause" onClick={stopTimer}></button> {timeString}
            </span>
            <span className="created">{time}</span>
          </label>
          <button className="icon icon-edit" onClick={onToggleEdit}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
      </li>
    )
  }
}
