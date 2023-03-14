const taskName = document.querySelector("input#task-name");
const taskPriority = document.querySelector("select#task-priority");
const addButton = document.querySelector(".add-btn");
const addTaskForm = document.querySelector("#add-new-task");

const ul = document.querySelector("ul");
const emptyMessage = document.querySelector(".empty");
const deleteBtn = document.querySelector("button.delete-btn");

addTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(addTaskForm));

  const taskNode = createTaskNode(formData);
  ul.appendChild(taskNode);
  checkTaskQ();
  addTaskForm.reset();
});

function addDeleteBtn() {
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Borrar";
  deleteBtn.classList.add("delete-btn");
  return deleteBtn;
}

function checkTaskQ() {
  let tasks = ul.childNodes.length;
  if (tasks > 0) {
    emptyMessage.style.display = "none";
  } else {
    emptyMessage.style.display = "block";
  }
}

function createTaskNode(data) {
  const wrapper = document.createElement("li");
  const description = document.createElement("p");
  const actionsWrapper = document.createElement("div");
  const moveSelect = createMoveSelector(data.tPriority);
  const deleteBtn = addDeleteBtn();

  wrapper.classList.add(["task-container", data.tPriority]);
  actionsWrapper.classList.add("actions-wrapper");

  description.textContent = data.tName;

  wrapper.appendChild(description);
  actionsWrapper.appendChild(moveSelect);
  actionsWrapper.appendChild(deleteBtn);
  wrapper.appendChild(actionsWrapper);

  return wrapper;
}

function createMoveSelector(currentPriority) {
  const select = document.createElement("select");
  const priorities = [{ 2: "Alta" }, { 1: "Media" }, { 0: "Normal" }];
  priorities
    .filter((v) => +Object.keys(v)[0] !== +currentPriority)
    .map((v) => {
      const option = document.createElement("option");
      const [key, value] = Object.entries(v)[0];
      option.value = key;
      option.textContent = value;
      select.appendChild(option);
    });
  return select;
}
