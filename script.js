// ---------- Select elements ----------
const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const clearAllBtn = document.querySelector("#clear-all");

const MAX_LENGTH = 200;
const CATEGORY_LABELS = {
  personal: "Personal",
  work: "Work",
  study: "Study",
};

// ---------- Data ----------
// Each note: { id, text, category, createdAt }
let notes = [];

// ---------- Render ----------
function getCountMessage() {
  if (notes.length === 0) {
    return "You have no notes yet.";
  }
  if (notes.length === 1) {
    return "You have 1 note.";
  }
  return `You have ${notes.length} notes.`;
}

function createNoteCard(note) {
  const category = CATEGORY_LABELS[note.category] ? note.category : "personal";

  const item = document.createElement("li");
  item.classList.add("note", `category-${category}`);

  const text = document.createElement("p");
  text.classList.add("note-text");
  text.textContent = note.text;

  const meta = document.createElement("div");
  meta.classList.add("note-meta");

  const label = document.createElement("span");
  label.classList.add("category-label");
  label.textContent = CATEGORY_LABELS[category];

  const date = document.createElement("span");
  date.textContent = note.createdAt;

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => deleteNote(note.id));

  meta.append(label, date, deleteBtn);
  item.append(text, meta);
  return item;
}

function render() {
  notesList.replaceChildren();

  for (const note of notes) {
    notesList.append(createNoteCard(note));
  }

  noteCount.textContent = getCountMessage();
  clearAllBtn.disabled = notes.length === 0;
}

// ---------- Actions ----------
function showError(message) {
  errorMessage.textContent = message;
}

function addNote(event) {
  event.preventDefault();
  const text = noteInput.value.trim();

  if (text === "") {
    showError("Please type a note first.");
    return;
  }
  if (text.length > MAX_LENGTH) {
    showError("Notes must be 200 characters or fewer.");
    return;
  }

  const note = {
    id: Date.now(),
    text: text,
    category: categorySelect.value,
    createdAt: new Date().toLocaleString(),
  };

  notes.push(note);
  showError("");
  noteInput.value = "";
  noteInput.focus();
  render();
}

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  render();
}

function clearAll() {
  if (notes.length === 0) {
    return;
  }
  if (confirm("Delete all notes?")) {
    notes = [];
    render();
  }
}

// ---------- Events ----------
form.addEventListener("submit", addNote);
clearAllBtn.addEventListener("click", clearAll);

// ---------- Start ----------
render();