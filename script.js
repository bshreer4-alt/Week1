const form = document.getElementById('note-form');
const input = document.getElementById('note-input');
const list = document.getElementById('notes-list');

// 1. Fetch notes from Python when the page loads
async function loadNotes() {
    list.innerHTML = ''; // Clear the list first
    
    // Ask Python for the notes
    const response = await fetch('http://127.0.0.1:8000/notes');
    const data = await response.json(); 
    
    // Draw them on the screen
    data.notes.forEach(noteText => {
        const newNote = document.createElement('li');
        newNote.textContent = noteText;
        list.appendChild(newNote);
    });
}

// Load them immediately
loadNotes();

// 2. Send a new note to Python when you click "Add"
form.addEventListener('submit', async function(event) {
    event.preventDefault();
    const noteText = input.value;

    if (noteText === "") return;

    // Send the note to Python
    await fetch('http://127.0.0.1:8000/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: noteText })
    });

    input.value = ""; // Clear input box
    loadNotes(); // Reload the list from Python to show the new note
});