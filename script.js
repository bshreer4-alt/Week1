const form = document.getElementById('note-form');
const input = document.getElementById('note-input');
const list = document.getElementById('notes-list');

// Load notes from storage
let notes = JSON.parse(localStorage.getItem('myNotes')) || [];

function renderNotes() {
    list.innerHTML = ''; // Clear the list first
    
    // NEW CODE: If there are no notes, show a friendly message
    if (notes.length === 0) {
        const emptyMessage = document.createElement('li');
        emptyMessage.textContent = "No notes yet. Add one above!";
        emptyMessage.style.textAlign = "center";
        emptyMessage.style.color = "#888";
        emptyMessage.style.fontStyle = "italic";
        emptyMessage.style.background = "transparent";
        emptyMessage.style.boxShadow = "none";
        list.appendChild(emptyMessage);
        return; // Stop the function here
    }

    // Loop through notes and display them
    notes.forEach((noteText, index) => {
        const newNote = document.createElement('li');
        
        const textSpan = document.createElement('span');
        textSpan.textContent = noteText;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn'; 

        deleteBtn.addEventListener('click', function() {
            notes.splice(index, 1); 
            localStorage.setItem('myNotes', JSON.stringify(notes)); 
            renderNotes(); 
        });

        newNote.appendChild(textSpan);
        newNote.appendChild(deleteBtn);
        list.appendChild(newNote);
    });
}

// Draw notes when the page loads
renderNotes();

// When you click Add
form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    const noteText = input.value;

    if (noteText === "") return; 

    notes.push(noteText);
    localStorage.setItem('myNotes', JSON.stringify(notes));
    renderNotes(); 
    
    input.value = ""; 
});