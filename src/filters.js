const filters = {
    searchText: "",
    hideCompleted: false
}

const getFilters = () => filters


// setFilters
// Arguments: updates object with optional searchText or hideCompleted
// Return value: none

const setFilters = (updates) => {
    if (typeof updates.searchText === "string") {
        filters.searchText = updates.searchText
    }
    if (typeof updates.hideCompleted === "boolean") {
        filters.hideCompleted = updates.hideCompleted
    }
}

export { getFilters, setFilters }