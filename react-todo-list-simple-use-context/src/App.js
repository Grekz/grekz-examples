import { useContext } from "react"
import "./App.css"
import { TodoContext } from "./TodoContext"

const App = () => {
  const { todo, todoList, setTodo, addTodo, toggleComplete, removeTodo } = useContext(TodoContext)
  return (
    <main>
      <h1>Todo App!</h1>
      <hr />
      <div>
        <h2>Add your todo item:</h2>
        <input value={todo} onChange={(e) => setTodo(e.currentTarget.value)} />
        <button onClick={() => addTodo()}>Add</button>
        <hr />
        <ul>
          {todoList.map((it, idx) => (
            <li>
              <span onClick={() => toggleComplete(idx)}>
                {it.completed ? <s>{it.text}</s> : <>{it.text}</>}
              </span>{" "}
              <button onClick={() => removeTodo(idx)}>delete</button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}

export default App
