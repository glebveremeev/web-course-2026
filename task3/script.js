// ============ ДАННЫЕ ============
let todos = [];
let currentFilter = "all";
let nextId = 1;

// ============ DOM-ЭЛЕМЕНТЫ ============
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const stats = document.getElementById("todo-stats");
const filters = document.getElementById("todo-filters");

// ============ ФУНКЦИИ ============

function addTodo(text) {
    const trimmed = text.trim();

    if (trimmed === "") {
        alert("Введите текст задачи");
        return;
    }

    const newTodo = {
        id: nextId,
        text: trimmed,
        completed: false,
    };
    nextId++;

    todos.push(newTodo);
    render();
}

function toggleTodo(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    render();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    render();
}

function createTodoElement(todo) {
    const li = document.createElement("li");
    li.className = "todo-item";
    if (todo.completed) {
        li.classList.add("completed");
    }
    li.dataset.id = todo.id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "todo-checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", () => toggleTodo(todo.id));

    const span = document.createElement("span");
    span.className = "todo-text";
    span.textContent = todo.text;

    const btn = document.createElement("button");
    btn.className = "todo-delete";
    btn.textContent = "✕";
    btn.setAttribute("aria-label", "Удалить");
    btn.addEventListener("click", () => deleteTodo(todo.id));

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(btn);

    return li;
}

function updateStats() {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const remaining = total - completed;

    stats.textContent = `Осталось: ${remaining}, Выполнено: ${completed}`;
}

function render() {
    list.innerHTML = "";

    let visibleTodos = todos;
    if (currentFilter === "active") {
        visibleTodos = todos.filter(t => !t.completed);
    } else if (currentFilter === "completed") {
        visibleTodos = todos.filter(t => t.completed);
    }

    if (visibleTodos.length === 0) {
        const empty = document.createElement("li");
        empty.className = "todo-empty";
        empty.textContent = "Задач пока нет";
        list.appendChild(empty);
    } else {
        visibleTodos.map(todo => {
            const li = createTodoElement(todo);
            list.appendChild(li);
        });
    }

    updateStats();
}

// ============ СОБЫТИЯ ============

// Отправка формы (Enter или клик по кнопке)
form.addEventListener("submit", (e) => {
    e.preventDefault();
    addTodo(input.value);
    input.value = "";
    input.focus();
});

// Фильтры (делегирование)
filters.addEventListener("click", (e) => {
    if (!e.target.classList.contains("filter-btn")) return;

    currentFilter = e.target.dataset.filter;

    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.classList.toggle("active", btn === e.target);
    });

    render();
});

// ============ ЗАПУСК ============
render();