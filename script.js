const input = document.querySelector("#taskInput");
const btn = document.querySelector("#addButton");
const list = document.querySelector("#taskList");

let tasks = [
  { text: "task 1", completed: true },
  { text: "task 2", completed: false },
  { text: "task 3", completed: false },
];

btn.addEventListener("click", () => {
  let inputValue = input.value;
  if (inputValue.trim() === "") {
    console.error("Error: input value must contain at least one symbol");
    return;
  } else {
    tasks.push({ text: inputValue, completed: false });
    input.value = "";
    save();
    render();
  }
});

function render() {
  list.textContent = "";
  for (let i = 0; i < tasks.length; i++) {
    const li = document.createElement("li");
    const button = document.createElement("button");
    const span = document.createElement("span");

    list.append(li);
    li.append(span, button);

    button.textContent = "Delete";

    span.textContent = tasks[i].text;
    if (tasks[i].completed) {
      span.classList.add("completed");
    }
    span.addEventListener("click", () => {
      tasks[i].completed = !tasks[i].completed;
      save();
      render();
    });
    button.addEventListener("click", () => {
      tasks.splice(i, 1);
      save();
      render();
    });
  }
}

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function load() {
  if (localStorage.getItem("tasks")) {
    const data = JSON.parse(localStorage.getItem("tasks"));
    tasks = data;
  }
}
load();
render();