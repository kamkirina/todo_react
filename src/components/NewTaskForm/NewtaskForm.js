import { Component } from 'react'
import '../NewTaskForm/NewTaskForm.css'

export default class NewTask extends Component {
  state = {
    description: '',
    timerM: '',
    timerS: '',
  }

  onTaskAdded = (event) => {
    this.setState({
      description: event.target.value,
      timer: this.timer,
    })
  }
  onSubmit = (event) => {
    if (event.key === 'Enter' && this.state.description !== '') {
      this.timer = this.state.timerM * 60 + this.state.timerS
      this.props.onTaskAdded(this.state.description, this.timer)
      this.setState({
        description: '',
        timerM: '',
        timerS: '',
      })
    }
  }

  onMinSubmit = (event) => {
    let min = event.target.value
    this.setState({
      timerM: min,
    })
  }

  onSecSubmit = (event) => {
    let sec = Number(event.target.value)
    this.setState({
      timerS: sec,
    })
  }
  render() {
    return (
      <form className="new-todo-form">
        <input
          className="new-todo"
          onChange={this.onTaskAdded}
          onKeyUp={this.onSubmit}
          placeholder="What needs to be done?"
          value={this.state.description}
          autoFocus
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={this.onMinSubmit}
          onKeyUp={this.onSubmit}
          value={this.state.timerM}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={this.onSecSubmit}
          onKeyUp={this.onSubmit}
          value={this.state.timerS}
        />
      </form>
    )
  }
}
