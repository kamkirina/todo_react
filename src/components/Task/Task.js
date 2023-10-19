import React, { useState, useEffect } from 'react'
import './Task.css'
import classNames from 'classnames'

function Task(props) {
  const [description, setDescription] = useState(props.description)
  const [timer, setTimer] = useState(props.timer)
  const [checkTimer, setCheckTimer] = useState(props.checkTimer)
  const [editing, setEditing] = useState(false)
  const currentTask = React.createRef()

  useEffect(() => {
    if (currentTask.current) {
      currentTask.current.focus()
    }
    if (checkTimer) {
      setTimeout(() => {
        let newTimer = timer + 1
        setTimer(newTimer)
      }, 1000)
    }
  })

  const onTaskEdit = (event) => {
    setCheckTimer(false)
    setDescription(event.target.value)
  }
  const onToggleEdit = () => {
    setEditing(!editing)
  }
  const onEdit = (event) => {
    if (event.key === 'Enter') {
      setDescription(description)
      onToggleEdit()
    }
    if (event.key === 'Escape' || event.type === 'blur') {
      setDescription(props.description)
      setEditing(false)
    }
  }

  const secondsToTime = (sec) => {
    const minString = String(Math.floor(sec / 60)).padStart(2, '0')
    const secString = String(sec % 60).padStart(2, '0')
    return `${minString}:${secString}`
  }
  const onChecked = () => {
    setCheckTimer(false)
    props.onToggleDone()
  }
  let check = false
  let liClassName = classNames('', {
    completed: props.completed,
    editing,
  })

  const timeString = secondsToTime(timer)

  if (props.completed) {
    check = true
  }
  if (editing) {
    liClassName = 'editing'
    return (
      <input
        type="text"
        className="edit"
        value={description}
        onChange={onTaskEdit}
        onKeyUp={onEdit}
        onBlur={onEdit}
        ref={currentTask}
      />
    )
  }

  return (
    <li className={liClassName}>
      <div className="view">
        <input className="toggle" type="checkbox" onChange={() => onChecked()} checked={check} />
        <label>
          <span className="title" ref={currentTask}>
            {description}
          </span>
          <span className="description">
            <button className="icon icon-play" onClick={() => setCheckTimer(true)}></button>
            <button className="icon icon-pause" onClick={() => setCheckTimer(false)}></button> {timeString}
          </span>
          <span className="created">{props.time}</span>
        </label>
        <button className="icon icon-edit" onClick={onToggleEdit}></button>
        <button className="icon icon-destroy" onClick={props.onDeleted}></button>
      </div>
    </li>
  )
}

export default Task
