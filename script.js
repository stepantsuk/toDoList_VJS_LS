const inputTask = document.querySelector(".input__task");
const addTaskBtn = document.querySelector(".add__task");
const tasksList = document.querySelector(".todo__list");
const counterValue = document.querySelector(".counter__value");

addTaskBtn.addEventListener("click", (e) => {
  e.preventDefault;
  if (inputTask.value) {
    putTaskInArr();
    updateLocalStorage();
    fillTemplate();
  } else {
    alert("значение не может быть пустым");
  }
});

inputTask.addEventListener("keydown", (e) => {
  e.preventDefault;
  if (e.keyCode !== 13) {
    return null;
  }
  if (inputTask.value) {
    putTaskInArr();
    updateLocalStorage();
    fillTemplate();
  } else {
    alert("значение не может быть пустым");
  }
});

let todoArr = [];
//проверим есть ли в локалсторедж таски, если да, то наполним массив
localStorage.tasks
  ? (todoArr = JSON.parse(localStorage.getItem("tasks")))
  : (todoArr = []);

//конструктор объекта таски
//{this.description: description, this.done: done,}
const CreateTaskItem = function (description) {
  this.description = description;
  this.completed = false;
};

//создадим функцию которая пушит таск в массив и нулит инупт ввода
const putTaskInArr = () => {
  todoArr.push(new CreateTaskItem(inputTask.value));
  inputTask.value = "";
};

//сохраним в localStorage массив с тасками
const updateLocalStorage = () =>
  localStorage.setItem("tasks", JSON.stringify(todoArr));

//отсортируем массив на выполненный или нет
const filterTasks = () => {
  const completedTasks =
    todoArr.length && todoArr.filter((item) => item.completed == true);
  const unCompletedTasks =
    todoArr.length && todoArr.filter((item) => item.completed == false);
  todoArr = [...unCompletedTasks, ...completedTasks];
};

//создадим функцию, которая создает темплейт
const createTemplate = (task, index) => {
  const li = document.createElement("li");
  li.classList.add("todo__item");

  const div = document.createElement("div");
  div.classList.add("todo__text");
  div.innerText = task;
  todoArr[index].completed
    ? div.classList.add("todo__item-active")
    : div.classList.remove("todo__item-active");

  const checkbox = document.createElement("input");
  checkbox.classList.add("todo__complete");
  checkbox.setAttribute("type", "checkbox");
  todoArr[index].completed
    ? checkbox.setAttribute("checked", "")
    : checkbox.removeAttribute("checked");
  checkbox.addEventListener("click", (e) => {
    todoArr[index].completed = !todoArr[index].completed;
    updateLocalStorage();
    fillTemplate();
  });

  const del = document.createElement("button");
  del.innerText = "Удалить";
  del.classList.add("delete__task");
  del.addEventListener("click", (e) => {
    e.preventDefault;
    todoArr.splice(index, 1);
    updateLocalStorage();
    fillTemplate();
  });

  li.append(div, checkbox, del);

  tasksList.append(li);
};

const fillTemplate = () => {
  tasksList.innerHTML = "";
  if (todoArr.length > 0) {
    filterTasks();
    todoArr.forEach((item, index) => createTemplate(item.description, index));
  }
  counterValue.textContent = todoArr.length;
};

fillTemplate();


