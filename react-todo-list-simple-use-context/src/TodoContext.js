import { createContext, useState } from "react"

const TodoContext = createContext()

const TodoProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([{ text: "uno", completed: false }])
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
    <TodoContext.Provider
      value={{
        todoList,
        setTodo,
        addTodo,
        removeTodo,
        toggleComplete,
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}

export { TodoContext, TodoProvider }
