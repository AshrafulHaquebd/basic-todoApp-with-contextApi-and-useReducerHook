import { useContext, useRef } from "react"
import { todoContext } from "./App"

const NewTodoForm = () => {
  const { addNewTodo } = useContext(todoContext)
  const newRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newRef.current.value == "") return
    addNewTodo(newRef.current.value)

    newRef.current.value = ""
  }

  return (
    <form onSubmit={handleSubmit} id="new-todo-form">
      <label htmlFor="todo-input">New Todo</label>
      <input type="text" id="todo-input" ref={newRef} />
      <button>Add Todo</button>
    </form>
  )
}

export default NewTodoForm
