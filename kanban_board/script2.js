const write_task = document.getElementById("write_task");
const add_button = document.getElementById("add_button");

const not_started = document.getElementById("not_started");
const started = document.getElementById("started");
const finished = document.getElementById("finished");
const failed = document.getElementById("failed");
let tasks = [];
let selected = null;

window.addEventListener("load", () => {
  const stored = JSON.parse(localStorage.getItem("tasks"));
  if (stored) {
    tasks = stored;
  }
  tasks.forEach((task) => render_task(task));
});
add_button.addEventListener("click", () => {
  const task_object = {
    name: write_task.value,
    id: Date.now(),
    status: "not_started",
  };

  tasks.push(task_object);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  render_task(task_object);
});
const zones = [not_started, started, finished, failed];

function render_task(task_object) {
  const task_box = document.createElement("div");
  task_box.className = "list";
  task_box.setAttribute("draggable", true);
  task_box.innerText = task_object.name;
  task_box.id = task_object.id;

  const delete_button = document.createElement("input");
  delete_button.type = "button";
  delete_button.value = "del";
  delete_button.className = "delete_button";
  task_box.appendChild(delete_button);
  //   console.log(task_object.status);
  for (let zone of zones) {
    // console.log(zone);

    if (task_object.status == zone.id) {
      zone.appendChild(task_box);
    }
  }
  task_box.addEventListener("dragstart", (e) => {
    selected = e.target;
    console.log("Dragging: ", selected);
  });

  //   not_started.appendChild(task_box);
  console.log(tasks);

  delete_button_action(delete_button, task_box);
}
drag_item();
function drag_item() {
  for (let zone of zones) {
    zone.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    zone.addEventListener("drop", (e) => {
      //   task_object.status = zone.id;
      for (let task of tasks) {
        if (task.id == selected.id) {
          task.status = zone.id;
        }
        console.log("1at", task.id);
        console.log("1at", selected.id);
        // console.log(task.status);
        // console.log(zone.id);
      }
      if (selected) {
        console.log("selected: ", selected);

        zone.appendChild(selected);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        selected = null;
      }
    });
  }
}

function delete_button_action(delete_button, task_box) {
  delete_button.addEventListener("click", () => {
    task_box.remove();
  });
}
