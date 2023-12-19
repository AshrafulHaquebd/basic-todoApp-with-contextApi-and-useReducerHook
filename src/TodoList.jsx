import React, { useContext } from "react"
import TodoItem from "./TodoItem"
import { todoContext } from "./App"

const TodoList = () => {
  const { todos } = useContext(todoContext)
  return (
    <ul id="list">
      {todos &&
        todos.map((item) => {
          return <TodoItem {...item} key={item.id} />
        })}
    </ul>
  )
}

export default TodoList
