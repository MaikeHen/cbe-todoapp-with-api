const allTodos = document.querySelector("#all");
const openTodos = document.querySelector("#open");
const doneTodos = document.querySelector("#done");

const todoDescription = document.querySelector("#to-do-description");
const addBtn = document.querySelector("#add-btn");
const toDoList = document.querySelector(".to-do-list");
const filter = document.querySelector(".filter");
const removeBtn = document.querySelector("#remove-btn");

const state = {
  currentFilter: "all",
  todos: [],
};

addBtn.addEventListener("click", addTodo);
toDoList.addEventListener("change", updatedTodo);
filter.addEventListener("change", setFilter);
removeBtn.addEventListener("click", removeDoneTodos);

function addTodo(event) {
  event.preventDefault();
  if (todoDescription.value.length === 0) {
    alert("Please insert ToDo");
    return false;
  }
  const newTodo = {
    description: todoDescription.value,
    done: false,
    id: Math.floor(Math.random() * 500000),
  };
  state.todos.push(newTodo);
  todoDescription.value = "";
  todoDescription.focus();
  renderTodos();
}

function renderTodos() {
  toDoList.innerText = "";
  const currentTodoList = generateByFilterOption();
  currentTodoList.forEach(function (todo) {
    //erstellen ein Listen-Element
    const listEl = document.createElement("li");
    //erstellen eine Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "todo" + todo.id;
    checkbox.checked = todo.done;
    //Todo-ID an DOM-Element übergeben
    checkbox.todoId = todo.id;

    //erstellen das Label zur Checkbox und nutzen die description als Text
    const description = document.createElement("label");
    description.htmlFor = checkbox.id;
    description.innerText = todo.description;
    //hängen checkbox und description an die Liste an
    listEl.appendChild(checkbox);
    listEl.appendChild(description);
    toDoList.appendChild(listEl);
  });
}
function updatedTodo(event) {
  const id = event.target.todoId;
  const updatedTodo = state.todos.find(function (todo) {
    return todo.id === id;
  });
  updatedTodo.done = event.target.checked;
}

//Funktion für filterOption schreiben
//Wenn id === all, dann checkbox.done = true und false anzeigen
//Wenn id === open, dann checkbox.done = false anzeigen
//Wenn id === done, dann checkbox.done = true anzeigen
function generateByFilterOption() {
  const allTodos = state.todos.filter(
    (todo) => todo.done === false || todo.done === true
  );
  const doneTodos = state.todos.filter((todo) => todo.done === true);
  const openTodos = state.todos.filter((todo) => todo.done === false);
  if (state.currentFilter === "all") {
    return allTodos;
  } else if (state.currentFilter === "done") {
    return doneTodos;
  } else if (state.currentFilter === "open") {
    return openTodos;
  }
}

function setFilter(event) {
  if (["all", "done", "open"].includes(event.target.id)) {
    state.currentFilter = event.target.id;
    renderTodos();
  }
}

function removeDoneTodos() {
  state.todos = state.todos.filter((todo) => todo.done === false);
  renderTodos();
}

function getTodosFromApi() {
  fetch("http://localhost:4730/todos")
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      state.todos = result;
      renderTodos();
    });
}
getTodosFromApi();
