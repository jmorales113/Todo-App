import { getTodos, toggleTodo, removeTodo } from "./todos.js"
import { getFilters} from "./filters.js"

// Render application todos based on filters
const renderTodos = () => {
    const todoEl = document.querySelector("#todos")
    const filters = getFilters()
    let filterTodos = getTodos().filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed
        return searchTextMatch && hideCompletedMatch
    })

    const incompleteTodos = filterTodos.filter((todo) => !todo.completed)

    todoEl.innerHTML = ""
    todoEl.appendChild(generateSummaryDOM(incompleteTodos))

    if (filterTodos.length > 0) {
    filterTodos.forEach((todo) => {
        const newTodo = generateTodoDOM(todo)
        todoEl.appendChild(newTodo)
    })
    } else {
        const messageEl = document.createElement("p")
        messageEl.classList.add("empty-message")
        messageEl.textContent = "No to-dos to show!"
        todoEl.appendChild(messageEl)
    }
}

// Get the DOM elements for an individual note
const generateTodoDOM = (todo) => {
    const todoEl = document.createElement("label")
    const containerEl = document.createElement("div")
    const checkbox = document.createElement("input")
    const todoText = document.createElement("span")
    const removeButton = document.createElement("button")

    // Setup todo checkbox
    checkbox.setAttribute("type", "checkbox")
    checkbox.checked = todo.completed
    containerEl.appendChild(checkbox)
    checkbox.addEventListener("change", () => {
        toggleTodo(todo.id)
        renderTodos()
    })
    
    // Setup up todo text
    todoText.textContent = todo.text
    containerEl.appendChild(todoText)

    // Setup container
    todoEl.classList.add("list-item")
    containerEl.classList.add("list-item_container")
    todoEl.appendChild(containerEl)

    // Setup the remove button
    removeButton.textContent = "remove"
    removeButton.classList.add("button", "button-text")
    todoEl.appendChild(removeButton)

    removeButton.addEventListener("click", () => {
        removeTodo(todo.id)
        renderTodos()
    })
    
    return todoEl
}

// Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement("h2")
    const plural = incompleteTodos.length === 1 ? "" : "s"
    summary.classList.add("list-title")
    summary.textContent = `You have ${incompleteTodos.length} todo${plural} left`
    return summary
}

export { generateTodoDOM, renderTodos, generateSummaryDOM }