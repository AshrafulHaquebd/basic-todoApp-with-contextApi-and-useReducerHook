import { useContext, useRef, useState } from "react"
import { todoContext } from "./App"

const TodoItem = ({ id, completed, name }) => {
  const [isEditing, setIsEditing] = useState(false)
  const { toggleTodo, hadleDeleteTodo, updataTodoName } =
    useContext(todoContext)

  const editText = useRef()

  const onEditSubmit = (e) => {
    e.preventDefault()
    if (editText.current.value == "") return

    updataTodoName(id, editText.current.value)
    setIsEditing(false)
  }

  return (
    <>
      <li className="list-item">
        {isEditing ? (
          <form onSubmit={onEditSubmit}>
            <input type="text" autoFocus defaultValue={name} ref={editText} />
            <button data-button-save>save</button>
          </form>
        ) : (
          <>
            <label className="list-item-label">
              <input
                checked={completed}
                type="checkbox"
                onChange={(e) => toggleTodo(id, e.target.checked)}
                data-list-item-checkbox
              />
              <span data-list-item-text>{name}</span>
            </label>
            <button data-button-edit onClick={() => setIsEditing(!isEditing)}>
              edit
            </button>
            <button data-button-delete onClick={() => hadleDeleteTodo(id)}>
              delete
            </button>
          </>
        )}
      </li>
    </>
  )
}

export default TodoItem
