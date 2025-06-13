const add_task_section = document.getElementById("add_task_section");
const write_task = document.getElementById("write_task");
const add_button = document.getElementById("add_button");
const show_task_section = document.getElementById("show_task_section");
let tasks_array = [];

window.addEventListener("load", () => {
  const stored = JSON.parse(localStorage.getItem("tasks"));
  if (stored) {
    tasks_array = stored;
    tasks_array.forEach((task) => render_task(task));
  }
});

add_button.addEventListener("click", () => {
  if (!write_task.value.trim()) {
    write_task.value = "";
    return;
  }
  const task_object = {
    id: Date.now(),
    name: write_task.value,
    is_completed: false,
  };
  tasks_array.push(task_object);
  localStorage.setItem("tasks", JSON.stringify(tasks_array));

  render_task(task_object);

  write_task.value = "";
});

function render_task(task_object) {
  const task_row = document.createElement("div");
  task_row.className = "task_row";
  task_row.id = task_object.id;

  const task_done = document.createElement("input");
  task_done.type = "checkbox";
  task_done.className = "task_done";
  task_done.checked = task_object.is_completed;

  const task = document.createElement("p");
  task.className = "task";
  task.innerText = task_object.name;

  task.style.textDecoration = task_object.is_completed
    ? "line-through"
    : "none";

  const delete_button = document.createElement("input");
  delete_button.type = "button";
  delete_button.className = "delete_butto";
  delete_button.value = "X";

  const edit_button = document.createElement("input");
  edit_button.type = "button";
  edit_button.className = "edit_button";
  edit_button.value = "edit";

  task_row.appendChild(task_done);
  task_row.appendChild(task);
  task_row.appendChild(delete_button);
  task_row.appendChild(edit_button);

  show_task_section.appendChild(task_row);

  task_done_action(task_done, task_object.id, task);

  delete_button_action(delete_button, task_row, task_object);
  edit_button_action(edit_button, task_object);
}
function delete_button_action(delete_button, task_row, task_object) {
  delete_button.addEventListener("click", () => {
    console.log("task_row.id", task_row.id);
    console.log("task_object.id", task_object.id);

    if (task_row.id == task_object.id) {
      console.log("Turu id");
      tasks_array = tasks_array.filter((task) => task.id != task_row.id);
      localStorage.setItem("tasks", JSON.stringify(tasks_array));
    }

    task_row.remove();
  });
}

function edit_button_action(edit_button, task_object) {
  edit_button.addEventListener("click", () => {
    write_task.value = task_object.name;
    // save;
    const save_button = document.createElement("input");
    save_button.type = "button";
    save_button.className = "save_butto";
    save_button.value = "save";

    const cancel_button = document.createElement("input");
    cancel_button.type = "button";
    cancel_button.className = "cancel_button";
    cancel_button.value = "cancel";

    add_button.style.display = "none";

    add_task_section.appendChild(save_button);
    add_task_section.appendChild(cancel_button);

    save_button_action(save_button, cancel_button, task_object.id);
    cancel_button_action(save_button, cancel_button);
  });
}

function save_button_action(save_button, cancel_button, id) {
  save_button.addEventListener("click", () => {
    const index = tasks_array.findIndex((t) => t.id == id);
    if (index != -1) {
      tasks_array[index].name = write_task.value;

      localStorage.setItem("tasks", JSON.stringify(tasks_array));
    }
    write_task.value = "";
    save_button.remove();
    cancel_button.remove();
    add_button.style.display = "inline";
    location.reload(true);
  });
}

function cancel_button_action(save_button, cancel_button) {
  cancel_button.addEventListener("click", () => {
    write_task.value = "";
    save_button.remove();
    cancel_button.remove();
    add_button.style.display = "inline";
  });
}

function task_done_action(task_done, id, task) {
  task_done.addEventListener("change", function () {
    const index = tasks_array.findIndex((t) => t.id == id);
    console.log("index", index);

    if (this.checked) {
      tasks_array[index].is_completed = true;
    } else {
      tasks_array[index].is_completed = false;
    }
    if (tasks_array[index].is_completed) {
      task.style.textDecoration = "line-through";
    } else {
      task.style.textDecoration = "none";
    }

    localStorage.setItem("tasks", JSON.stringify(tasks_array));
  });
}
