import uuidv4 from "uuid/v4"

let todos = []

// Fetch existing todos from localStorage
const loadTodos = () => {
    const todosJSON = localStorage.getItem("todos")

    try {
        todos = todosJSON ? JSON.parse(todosJSON) : []
    } catch (e) {
        todos = []
    }
}

const saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
}

const getTodos = () => todos

const createTodo = (text) => {
    todos.push({
      id: uuidv4(),
      text,
      completed: false
    })
    saveTodos()
}

// Remove Todo by id
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)
    
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
        saveTodos()
    }
}

// Toggle completed value for a given todo
const toggleTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id)

    if (todo) {
        todo.completed = !todo.completed
        saveTodos()
    }
}

loadTodos()

export { loadTodos, getTodos, createTodo, removeTodo, toggleTodo }
