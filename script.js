const form = document.getElementById('note-form');
const input = document.getElementById('note-input');
const list = document.getElementById('notes-list');

// 1. Load from localStorage
let notes = JSON.parse(localStorage.getItem('myNotes')) || [];

// 2. A function to REDRAW the screen based on the notes array
function renderNotes() {
    list.innerHTML = ''; // Clear the screen first
    notes.forEach((noteText, index) => {
        const newNote = document.createElement('li');
        newNote.textContent = noteText;
        newNote.style.marginBottom = "10px";

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.style.marginLeft = '10px';

        deleteBtn.addEventListener('click', function() {
            notes.splice(index, 1); // Remove from array
            localStorage.setItem('myNotes', JSON.stringify(notes)); // Update storage
            renderNotes(); // Redraw the screen! (This fixes the bug)
        });

        newNote.appendChild(deleteBtn);
        list.appendChild(newNote);
    });
}

// 3. Draw notes when the page loads
renderNotes();

// 4. Add a new note
form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    const noteText = input.value;
    if (noteText === "") return; 

    notes.push(noteText); // Add to array
    localStorage.setItem('myNotes', JSON.stringify(notes)); // Save to storage
    
    renderNotes(); // Redraw the screen
    input.value = ""; // Clear input
});