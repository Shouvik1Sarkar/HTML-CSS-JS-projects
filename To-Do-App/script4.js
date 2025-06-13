// incomplete but using object

const add_task_section = document.getElementById("add_task_section");
const write_task = document.getElementById("write_task");
const add_button = document.getElementById("add_button");
const show_task_section = document.getElementById("show_task_section");

const tasks_array = [];

add_button.addEventListener("click", () => {
  const task_object = {
    id: Date.now(),
    task: write_task.value,
    is_completed: false,
  };
  tasks_array.push(task_object);
  console.log(tasks_array);

  const task_row = document.createElement("div");
  task_row.className = "task_row";
  task_row.id = task_object.id;
  //   console.log("id: ", task_row.id);

  task_done_button(task_row);
  my_task(task_object, task_row);
  delete_btn(task_row, task_row.id);
  edit_btn(task_row);

  show_task_section.appendChild(task_row);

  localStorage.setItem(task_object.id, JSON.stringify(tasks_array));

  write_task.value = "";
});
function task_done_button(task_row) {
  const task_done = document.createElement("input");
  task_done.type = "checkbox";
  task_done.className = "task_done";
  task_row.appendChild(task_done);
}
function my_task(task_object, task_row) {
  const my_task = document.createElement("p");
  my_task.className = "task";
  my_task.innerText = task_object.task;
  //   my_task.id = task_object.id;
  task_row.appendChild(my_task);
}

function delete_btn(task_row, t) {
  console.log("----", task_row.id);

  const delete_button = document.createElement("input");
  delete_button.type = "button";
  delete_button.className = "delete_button";
  delete_button.value = "X";
  task_row.appendChild(delete_button);
  delete_btn_action(task_row, t, delete_button);
}
function delete_btn_action(task_row, t, delete_button) {
  delete_button.addEventListener("click", () => {
    console.log("task_row.id: ", t);
    for (let i = 0; i < localStorage.length; i++) {
      if (t == localStorage.key(i)) {
        localStorage.removeItem(localStorage.key(i));
      }
    }
    task_row.remove();
  });
}
function edit_btn(task_row, task_object) {
  const edit_button = document.createElement("input");
  edit_button.type = "button";
  edit_button.className = "edit_button";
  edit_button.value = "edit";
  task_row.appendChild(edit_button);
  edit_btn_action(task_row, edit_button);
}

function edit_btn_action(task_row, edit_button) {
  edit_button.addEventListener("click", () => {
    // write_task.value = "---";

    const save_button = document.createElement("input");
    save_button.type = "button";
    save_button.className = "save_button";
    save_button.value = "save";

    const cancel_button = document.createElement("input");
    cancel_button.type = "button";
    cancel_button.className = "cancel_button";
    cancel_button.value = "cancel";

    add_task_section.appendChild(save_button);
    add_task_section.appendChild(cancel_button);
    add_button.style.display = "none";
    save_button_action(save_button, cancel_button, task_row.id);

    for (let i = 0; i < localStorage.length; i++) {
      if (task_row.id == localStorage.key(i)) {
        write_task.value = JSON.parse(
          localStorage.getItem(localStorage.key(i))
        ).task;
      }
    }
  });
}

function save_button_action(save_button, cancel_button, t) {
  save_button.addEventListener("click", () => {
    for (let i = 0; i < localStorage.length; i++) {
      if (t == localStorage.key(i)) {
        console.log("Turu love: ");
        let obj = JSON.parse(localStorage.getItem(t));

        // Update the property
        obj.task = write_task.value;

        // Save it back to localStorage
        localStorage.setItem(t, JSON.stringify(obj));
      }
    }
    save_button.remove();
    cancel_button.remove();
    add_button.style.display = "inline";
  });
}

window.addEventListener("load", () => {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const names = JSON.parse(localStorage.getItem(key)).task;
    const task_row = document.createElement("div");
    task_row.className = "task_row";
    task_row.id = key;

    task_done_button(task_row);
    const my_task = document.createElement("p");
    my_task.className = "task";
    my_task.innerText = names;
    my_task.id = key;
    task_row.appendChild(my_task);

    delete_btn(task_row, key);
    edit_btn(task_row);

    show_task_section.appendChild(task_row);
  }
});
