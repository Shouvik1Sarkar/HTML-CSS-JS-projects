// ############## Basic first ##############

/**
 * add the task ( done )
 * delete button working
 * edit button working
 * check box done
 */

const add_task_section = document.getElementById("add_task_section");
const write_task = document.getElementById("write_task");
const add_task = document.getElementById("add_button");
const show_task = document.getElementById("show_task_section");

//  * add the task

add_task.addEventListener("click", () => {
  const task_row = document.createElement("div");
  task_row.className = "task_row";

  const task_done = document.createElement("input");
  task_done.type = "checkbox";
  task_done.className = "task_done";

  const task = document.createElement("p");
  task.className = "task";

  const edit_button = document.createElement("button");
  edit_button.className = "edit_button";
  edit_button.innerText = "edit";

  const delete_button = document.createElement("button");
  delete_button.className = "delete_button";
  delete_button.innerText = "delete";

  // appending task to the dom
  task.innerText = write_task.value;
  task_row.appendChild(task_done);
  task_row.appendChild(task);
  task_row.appendChild(delete_button);
  task_row.appendChild(edit_button);
  show_task.appendChild(task_row);

  delete_task(delete_button, task_row);
  edit_task(
    edit_button,
    task,
    write_task,
    add_task,
    show_task,
    add_task_section
  );

  task_conplete(task_done, task);

  write_task.value = "";
});

// * delete button working

function delete_task(delete_button, task_row) {
  delete_button.addEventListener("click", () => {
    task_row.remove();
  });
}
// * edit button working
function edit_task(
  edit_button,
  task,
  write_task,
  add_task,
  show_task,
  add_task_section
) {
  edit_button.addEventListener("click", () => {
    write_task.value = task.innerText;
    show_task.style.pointerEvents = "none";
    add_task.style.display = "none";

    // create 2 save and cancel button

    const save_button = document.createElement("button");
    save_button.className = "save_button";
    save_button.innerText = "save";

    const cancel_button = document.createElement("button");
    cancel_button.className = "cancel_button";
    cancel_button.innerText = "cancel";

    add_task_section.appendChild(save_button);
    add_task_section.appendChild(cancel_button);

    save_button_working(save_button, write_task, task, add_task, cancel_button);
    cancel_button_working(
      save_button,
      write_task,

      add_task,
      cancel_button
    );
  });
}

function save_button_working(
  save_button,
  write_task,
  task,
  add_task,
  cancel_button
) {
  save_button.addEventListener("click", () => {
    task.innerText = write_task.value;
    write_task.value = "";
    add_task.style.display = "inline";
    save_button.remove();
    cancel_button.remove();
    show_task.style.pointerEvents = "auto";
  });
}

function cancel_button_working(
  save_button,
  write_task,
  add_task,
  cancel_button
) {
  cancel_button.addEventListener("click", () => {
    write_task.value = "";
    add_task.style.display = "inline";
    save_button.remove();
    cancel_button.remove();
    show_task.style.pointerEvents = "auto";
  });
}

// * check box done

function task_conplete(task_done, task) {
  task_done.addEventListener("change", function () {
    if (this.checked) {
      task.style.textDecoration = "line-through";
    } else {
      task.style.textDecoration = "none";
    }
  });
}
