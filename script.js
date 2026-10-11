// ---------- Select elements ----------
const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");

const CATEGORY_LABELS = {
  personal: "Personal",
  work: "Work",
  study: "Study",
};

// ---------- Data ----------
// Each note: { id, text, category, createdAt }
let notes = [];

// ---------- Render ----------
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

  meta.append(label, date);
  item.append(text, meta);
  return item;
}

function render() {
  notesList.replaceChildren();

  for (const note of notes) {
    notesList.append(createNoteCard(note));
  }
}

// ---------- Actions ----------
function addNote(event) {
  event.preventDefault();
  const text = noteInput.value.trim();

  const note = {
    id: Date.now(),
    text: text,
    category: categorySelect.value,
    createdAt: new Date().toLocaleString(),
  };

  notes.push(note);
  noteInput.value = "";
  noteInput.focus();
  render();
}

// ---------- Events ----------
form.addEventListener("submit", addNote);

// ---------- Start ----------
render();
