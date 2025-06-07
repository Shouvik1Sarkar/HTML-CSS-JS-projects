// Selecting elements
const add = document.getElementById("add_button");
const write_task_box = document.getElementById("write_task_box");
const title_box = document.getElementById("title_box");
const write_task = document.getElementById("write_task");
const delete_button = document.getElementById("delete_button");
const save_button = document.getElementById("save_button");
const show_note_section = document.getElementById("show_note_section");

// Show write box
add.addEventListener("click", () => {
  write_task_box.style.display = "block";
});

// Cancel write
delete_button.addEventListener("click", () => {
  title_box.value = "";
  write_task.value = "";
  write_task_box.style.display = "none";
});

// Save note
save_button.addEventListener("click", () => {
  if (title_box.value.trim() === "" && write_task.value.trim() === "") {
    alert("Cannot save an empty note.");
    return;
  }

  create_note(title_box.value, write_task.value);
  title_box.value = "";
  write_task.value = "";
  write_task_box.style.display = "none";
});

// Create note function
function create_note(title, content) {
  const note_box = document.createElement("div");
  note_box.className = "note_box";

  const note_title = document.createElement("p");
  note_title.className = "note_title";
  note_title.innerText = title;

  const note_content = document.createElement("p");
  note_content.className = "note_content";
  note_content.innerText = content;

  note_box.appendChild(note_title);
  note_box.appendChild(note_content);
  show_note_section.appendChild(note_box);
}
