import { createContext, useEffect, useReducer, useState } from "react"
import "./App.css"
import NewTodoForm from "./NewTodoForm"
import TodoList from "./TodoList"

const LOCAL_STORAGE_KEY = "TODOS"

export const todoContext = createContext()

const ACTION = {
  ADD: "ADD",
  UPDATE: "UPDATE",
  TOGGLE: "TOGGLE",
  DELETE: "DELETE",
}

const reducer = (todos, { type, payload }) => {
  switch (type) {
    case ACTION.ADD:
      return [
        ...todos,
        { name: payload.name, completed: false, id: Date.now() },
      ]

    case ACTION.DELETE:
      return todos.filter((todo) => todo.id !== payload)

    case ACTION.TOGGLE:
      return todos.map((todo) => {
        return todo.id === payload.id
          ? { ...todo, completed: payload.completed }
          : todo
      })

    case ACTION.UPDATE:
      return todos.map((todo) => {
        if (todo.id === payload.id) {
          return { ...todo, name: payload.name }
        }

        return todo
      })

    default:
      return todos
  }

  return todos
}

function App() {
  const [todos, dispatch] = useReducer(reducer, [], (initialState) => {
    let value = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (value == null) return initialState
    return JSON.parse(value)
  })

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const addNewTodo = (name) => {
    dispatch({ type: ACTION.ADD, payload: { name: name } })

    console.log(todos)
  }
  // Have to bring this function here anyway
  const toggleTodo = (todoId, completed) => {
    dispatch({
      type: ACTION.TOGGLE,
      payload: { id: todoId, completed: completed },
    })
  }

  const hadleDeleteTodo = (todoId) => {
    dispatch({ type: ACTION.DELETE, payload: todoId })
  }

  const updataTodoName = (id, todoName) => {
    dispatch({ type: ACTION.UPDATE, payload: { id: id, name: todoName } })
  }

  return (
    <>
      <todoContext.Provider
        value={{
          todos,
          addNewTodo,
          toggleTodo,
          hadleDeleteTodo,
          updataTodoName,
        }}
      >
        <TodoList />
        <NewTodoForm />
      </todoContext.Provider>
    </>
  )
}

export default App
