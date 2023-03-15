const taskName = document.querySelector("input#task-name");
const taskPriority = document.querySelector("select#task-priority");
const addButton = document.querySelector(".add-btn");
const addTaskForm = document.querySelector("#add-new-task");
const todoList = document.querySelector("ul#todo");
const doingList = document.querySelector("ul#doing");
const completeList = document.querySelector("ul#complete");
const emptyMessage = document.querySelector(".empty");
const deleteBtn = document.querySelector("button.delete-btn");

const TODO = "todo";
const DOING = "doing";
const COMPLETE = "complete";
const TASKS = "tasks";

const state = retrieveData();
console.log(state);

addTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(addTaskForm));

  const taskNode = createTaskNode(formData);
  state.todo.push(formData);
  todoList.appendChild(taskNode);

  saveInLocalStorage()
  reorderTasks(TODO)
  addTaskForm.reset();
});

function addDeleteBtn() {
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");

  deleteBtn.addEventListener('click', ()=>{
    deleteTask(deleteBtn);
  });

  return deleteBtn;
}

function deleteTask(clickedElement){
  clickedElement.parentElement.parentElement.remove();
}

function createTaskNode(data) {
  const wrapper = document.createElement("li");
  const description = document.createElement("p");
  const actionsWrapper = document.createElement("div");
  const label = document.createElement('label')
  const moveSelect = createMoveSelector();
  const deleteBtn = addDeleteBtn();

  const priorities = { 0: 'normal' , 1: 'medium' ,  2: 'high' };

  wrapper.classList.add("task-container", priorities[data.tPriority]);
  actionsWrapper.classList.add("actions-wrapper");

  description.textContent = data.tName;
  label.textContent = 'Mover tarea'

  wrapper.appendChild(description);
  actionsWrapper.appendChild(label)
  actionsWrapper.appendChild(moveSelect);
  actionsWrapper.appendChild(deleteBtn);
  wrapper.appendChild(actionsWrapper);

  label.addEventListener('click', ()=> {
    toggleSelector(label);
  })

  return wrapper;
}

function toggleSelector(clickedElement){
  const selector = clickedElement.nextElementSibling;
  selector.classList.toggle('active');
}

function createMoveSelector(currentCategory = TODO) {
  const select = document.createElement("select");
  const categories = [{ 0: TODO }, { 1: DOING }, { 2: COMPLETE }];
  categories
    .filter((v) => Object.values(v)[0] !== currentCategory)
    .map((v) => {
      const option = document.createElement("option");
      const [key, value] = Object.entries(v)[0];
      option.value = key;
      option.textContent = value;
      select.appendChild(option);
    });
  return select;
}

function saveInLocalStorage() {
  localStorage.setItem(TASKS, JSON.stringify(state));
}

function retrieveData() {
  try {
    const data = JSON.parse(localStorage.getItem(TASKS));
    return data ?? { [`${TODO}`]: [], [`${DOING}`]: [], [`${COMPLETE}`]: [] };
  } catch {
    return { [`${TODO}`]: [], [`${DOING}`]: [], [`${COMPLETE}`]: [] };
  }
}

function reorderTasks(list){
  const listName = `ul#${list}`;
  const listObject = document.querySelector(listName);
  for (const [key, tasks] of Object.entries(state)) {
  if (key === list) {
        tasks.sort((a, b) => b.tPriority - a.tPriority)
        listObject.textContent = '';
        tasks.forEach(element => {
          listObject.appendChild(createTaskNode(element))
        });
    }
  }
}

(function renderAllTasks(){
  reorderTasks(TODO);
  reorderTasks(DOING);
  reorderTasks(COMPLETE);
})()