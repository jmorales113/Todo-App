"use strict"

// Fetch existing todos from localStorage
const getSavedTodos = () => {
    const todosJSON = localStorage.getItem("todos")

    try {
        return todosJSON ? JSON.parse(todosJSON) : []
    } catch (e) {
        return []
    }
}

// save todos to LocalStorage
const saveTodos = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos))
}

// Remove Todo by id
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)
    
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

// Toggle completed value for a given todo
const toggleTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id)

    if (todo) {
        todo.completed = !todo.completed
    }
}

// Render application todos based on filters
const renderTodos = (todos, filters) => {
    const todoEl = document.querySelector("#todos")
    let filterTodos = todos.filter((todo) => {
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
        saveTodos(todos)
        renderTodos(todos, filters)
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
        saveTodos(todos)
        renderTodos(todos, filters)
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
