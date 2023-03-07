let DomStrings = {
  form: document.getElementById("new-task-form"),
  input: document.getElementById("new-task-input"),
  submit: document.getElementById("new-task-submit"),
  list: document.getElementById("tasks"),
  date: document.querySelector(".date"),
  titleDate: document.querySelector(".title"),
};
DomStrings.submit.addEventListener("click", (e) => {
  e.preventDefault();
  if (DomStrings.input.value !== "") {
    let inputValue = DomStrings.input.value;
    let getLocal = localStorage.getItem("New todo list");
    getLocal == null ? (listArr = []) : (listArr = JSON.parse(getLocal));
    listArr.push(inputValue);
    localStorage.setItem("New todo list", JSON.stringify(listArr));
    addTodoListInputValue();
  } else {
    alert("Та бичих зүйлээ оруулна уу");
  }
});
function addTodoListInputValue() {
  let getLocal = localStorage.getItem("New todo list");
  getLocal == null ? (listArr = []) : (listArr = JSON.parse(getLocal));
  let newTag = "";
  listArr.forEach((element, index) => {
    newTag = `
          <div class="task">
          <div class="content">
            <input
              type="input"
              class="text"
              value="${element}"
              readonly>
          </div>
          <div class="actions">
            <button class="edit" id="edit" >Edit</button>
            <button class="delete" id="delete" onclick="deleteTask(${index})">Delete</button>
          </div>
        </div>`;
  });
  DomStrings.list.innerHTML = newTag;
  DomStrings.input.value = "";

  const edit = document.querySelector(".edit");
  edit.addEventListener("click", () => {
    const inputValue = document.querySelector(".text");
    if (edit.innerText.toLowerCase() == "edit") {
      edit.innerText = "Save";
      inputValue.removeAttribute("readonly");
      inputValue.focus();
    } else {
      edit.innerText = "Edit";
      inputValue.setAttribute("readonly", "readonly");
    }
  });
}

function deleteTask(index) {
  let getLocal = localStorage.getItem("New todo list");
  listArr = JSON.parse(getLocal);
  listArr.splice(index, 1);
  localStorage.setItem("New todo list", JSON.stringify(listArr));
  addTodoListInputValue();
}
const date = new Date();
(DomStrings.date.innerText = `Todo list ${date.getFullYear()}`),
  (DomStrings.titleDate.innerHTML = `Todo list ${date.getFullYear()}`);
