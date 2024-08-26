import { useState } from "react"
import "./App.css"

const App = () => {
  const [todoList, setTodoList] = useState([{ text: "one", completed: false }])
  const [todo, setTodo] = useState("")

  const addTodo = () => {
    if (todo.length > 0) {
      setTodoList([...todoList, { text: todo, completed: false }])
      setTodo("")
    }
  }
  const removeTodo = (idx) => {
    const tmpList = todoList.filter((_, id) => id !== idx)
    setTodoList([...tmpList])
  }

  const toggleComplete = (idx) => {
    const tmpList = todoList.map((it, id) =>
      id !== idx ? it : { ...it, completed: !it.completed }
    )
    setTodoList([...tmpList])
  }

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
