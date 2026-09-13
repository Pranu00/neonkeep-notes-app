let selectedColor = "#1e1e1e";

document.querySelectorAll(".color-dot").forEach(dot => {
  dot.addEventListener("click", () => {
    document.querySelectorAll(".color-dot").forEach(d => d.classList.remove("selected"));
    dot.classList.add("selected");
    selectedColor = dot.dataset.color;
  });
});

async function loadNotes() {
  const res = await fetch("/api/notes");
  const notes = await res.json();
  const grid = document.getElementById("notesGrid");
  grid.innerHTML = "";
  notes.forEach(note => {
    const div = document.createElement("div");
    div.className = "note";
    div.style.background = note.color;
    div.innerHTML = `
      <button class="delete-btn" onclick="deleteNote(${note.id})">X</button>
      <h3>${note.title}</h3>
      <p>${note.content}</p>
    `;
    grid.appendChild(div);
  });
}

document.getElementById("addBtn").addEventListener("click", async () => {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  if (!title && !content) return;

  await fetch("/api/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content, color: selectedColor })
  });

  document.getElementById("title").value = "";
  document.getElementById("content").value = "";
  loadNotes();
});

async function deleteNote(id) {
  await fetch(`/api/notes/${id}`, { method: "DELETE" });
  loadNotes();
}

loadNotes();
