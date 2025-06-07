const compose = document.getElementById("add_button");

const write_task_box = document.getElementById("write_task_box");
const title_box = document.getElementById("title_box");
const write_note = document.getElementById("write_task");
const delete_button = document.getElementById("delete_button");
const update_button = document.getElementById("update_button");
const save_button = document.getElementById("save_button");
const show_note_section = document.getElementById("show_note_section");
const add_note_section = document.getElementById("add_note_section");

compose.addEventListener("click", () => {
  write_task_box.style.display = "block";
  show_note_section.style.display = "none";
  add_note_section.style.display = "none";
});

delete_button.addEventListener("click", () => {
  write_task_box.style.display = "none";
  show_note_section.style.display = "block";
  add_note_section.style.display = "block";
  title_box.value = "";
  write_note.value = "";
});
save_button_click();
function save_button_click() {
  save_button.addEventListener("click", () => {
    if (!write_note.value && !title_box.value) {
      alert("can't be empty");
      return;
    }

    create_note(title_box.value, write_note.value);
    title_box.value = "";
    write_note.value = "";
    write_task_box.style.display = "none";
    show_note_section.style.display = "block";
    add_note_section.style.display = "block";
  });
}

function create_note(title_box, write_note) {
  const note_box = document.createElement("div");
  note_box.className = "note_box";
  note_box.id = Date.now();

  const note_name = document.createElement("p");
  note_name.innerText = title_box;
  note_name.className = "note_name";

  if (!title_box) {
    if (write_note) {
      note_name.innerText = "Untitled-Note";
    }
  }

  const note_content = document.createElement("p");
  note_content.innerText = write_note;
  note_content.className = "note_content";

  const edit_delete_section = document.createElement("div");
  edit_delete_section.className = "edit_delete_section";

  const edit_button = document.createElement("img");
  edit_button.src = "pencil2.png";
  edit_button.className = "edit_button";

  const task_delete_button = document.createElement("img");
  task_delete_button.src = "trash.webp";
  task_delete_button.className = "task_delete_button";

  edit_delete_section.appendChild(edit_button);
  edit_delete_section.appendChild(task_delete_button);

  note_box.appendChild(note_name);
  note_box.appendChild(note_content);
  note_box.appendChild(edit_delete_section);

  show_note_section.appendChild(note_box);

  task_delete_button_working(task_delete_button, note_box);

  edit_button_working(
    edit_button,
    task_delete_button,
    edit_delete_section,
    note_content,
    note_name
  );
}

function task_delete_button_working(task_delete_button, note_box) {
  task_delete_button.addEventListener("click", () => {
    note_box.remove();
  });
}

function edit_button_working(
  edit_button,
  task_delete_button,
  edit_delete_section,
  note_content,
  note_name
) {
  edit_button.addEventListener("click", () => {
    const update_task_button = document.createElement("input");
    update_task_button.type = "button";
    update_task_button.className = "update_task_button";
    update_task_button.value = "updates";

    const cancel_button = document.createElement("input");
    cancel_button.type = "button";
    cancel_button.className = "cancel_button";
    cancel_button.value = "cancel";
    edit_delete_section.appendChild(update_task_button);
    edit_delete_section.appendChild(cancel_button);

    const title_value = note_name.innerText;
    const content_value = note_content.innerText;

    console.log(title_value);
    console.log(content_value);

    note_name.contentEditable = "true";
    note_content.contentEditable = "true";

    edit_button.style.display = "none";
    task_delete_button.style.display = "none";

    update_task_button_working(
      edit_button,
      cancel_button,
      note_content,
      note_name,
      update_task_button,
      task_delete_button
    );

    cancel_button_working(
      cancel_button,
      update_task_button,
      edit_button,
      task_delete_button,
      title_value,
      content_value,
      note_content,
      note_name
    );
  });
}

function cancel_button_working(
  cancel_button,
  update_task_button,
  edit_button,
  task_delete_button,
  title_value,
  content_value,
  note_content,
  note_name
) {
  cancel_button.addEventListener("click", () => {
    note_name.contentEditable = "false";
    note_content.contentEditable = "false";
    update_task_button.style.display = "none";
    cancel_button.style.display = "none";
    edit_button.style.display = "inline";
    task_delete_button.style.display = "inline";
    note_name.innerText = title_value;
    note_content.innerText = content_value;
  });
}

function update_task_button_working(
  edit_button,
  cancel_button,
  note_content,
  note_name,
  update_task_button,
  task_delete_button
) {
  update_task_button.addEventListener("click", () => {
    update_task_button.style.display = "none";
    cancel_button.style.display = "none";
    edit_button.style.display = "inline";
    task_delete_button.style.display = "inline";
    note_name.contentEditable = "false";
    note_content.contentEditable = "false";
  });
}

// function edit_button_working(edit_button, note_content, note_name) {
//   edit_button.addEventListener("click", () => {
//     update_button.style.display = "inline";
//     save_button.style.display = "none";

//     write_note.value = note_content.innerText;
//     title_box.value = note_name.innerText;

//     write_task_box.style.display = "block";
//     show_note_section.style.display = "none";
//     add_note_section.style.display = "none";
//   });
// }

// update_button.addEventListener("click", () => {});
