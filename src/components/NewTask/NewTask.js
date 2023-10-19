import { useState } from 'react'
import './NewTask.css'

function NewTask(props) {
  const [description, setDescription] = useState('')
  const [timerM, setTimerM] = useState('')
  const [timerS, setTimerS] = useState('')
  const [timer, setTimer] = useState('')

  const onTaskAdded = (event) => {
    setDescription(event.target.value)
    setTimer(timer)
  }
  const onSubmit = (event) => {
    if (event.key === 'Enter' && description !== '') {
      let timer = timerM * 60 + timerS
      props.onTaskAdded(description, timer)
      setDescription('')
      setTimerM('')
      setTimerS('')
    }
  }

  const onMinSubmit = (event) => {
    let min = event.target.value
    setTimerM(min)
  }

  const onSecSubmit = (event) => {
    let sec = Number(event.target.value)
    setTimerS(sec)
  }

  return (
    <form className="new-todo-form">
      <input
        className="new-todo"
        onChange={onTaskAdded}
        onKeyUp={onSubmit}
        placeholder="What needs to be done?"
        value={description}
        autoFocus
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        onChange={onMinSubmit}
        onKeyUp={onSubmit}
        value={timerM}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        onChange={onSecSubmit}
        onKeyUp={onSubmit}
        value={timerS}
      />
    </form>
  )
}

export default NewTask
