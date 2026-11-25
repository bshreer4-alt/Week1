const form = document.getElementById('note-form');
const input = document.getElementById('note-input');
const list = document.getElementById('notes-list');

// Load notes from browser storage, or start with an empty array
let notes = JSON.parse(localStorage.getItem('myNotes')) || [];

// This function draws the notes on the screen
function renderNotes() {
    list.innerHTML = ''; // Clear the list first so we don't duplicate
    
    notes.forEach((noteText, index) => {
        const newNote = document.createElement('li');
        
        // Create a span for the text so the delete button stays on the right
        const textSpan = document.createElement('span');
        textSpan.textContent = noteText;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn'; // We added this class in CSS!

        // When delete is clicked
        deleteBtn.addEventListener('click', function() {
            notes.splice(index, 1); // Remove the note from our list
            localStorage.setItem('myNotes', JSON.stringify(notes)); // Save to storage
            renderNotes(); // Redraw the list to update the screen
        });

        newNote.appendChild(textSpan);
        newNote.appendChild(deleteBtn);
        list.appendChild(newNote);
    });
}

// Draw any saved notes when the page loads
renderNotes();

// When you click "Add"
form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    const noteText = input.value;

    if (noteText === "") return; 

    notes.push(noteText); // Add to array
    localStorage.setItem('myNotes', JSON.stringify(notes)); // Save
    renderNotes(); // Redraw the screen
    
    input.value = ""; // Clear the input box
});