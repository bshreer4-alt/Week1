const form = document.getElementById('note-form');
const input = document.getElementById('note-input');
const list = document.getElementById('notes-list');

// 1. Fetch and display notes from Python
async function loadNotes() {
    list.innerHTML = ''; 
    
    try {
        const response = await fetch('http://127.0.0.1:8000/notes');
        const data = await response.json(); 
        
        if (data.notes.length === 0) {
            list.innerHTML = '<li style="text-align:center; color:gray;">No notes yet. Add one!</li>';
            return;
        }

        data.notes.forEach(note => {
            const newNote = document.createElement('li');
            
            const textSpan = document.createElement('span');
            textSpan.textContent = note.text;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'delete-btn';
            
            deleteBtn.addEventListener('click', async function() {
                await fetch(`http://127.0.0.1:8000/notes/${note.id}`, {
                    method: 'DELETE'
                });
                loadNotes(); 
            });

            newNote.appendChild(textSpan);
            newNote.appendChild(deleteBtn);
            list.appendChild(newNote);
        });
    } catch (error) {
        console.error("Error loading notes:", error);
    }
}

loadNotes();

// 2. Add a new note
form.addEventListener('submit', async function(event) {
    event.preventDefault();
    const noteText = input.value;

    if (noteText === "") return;

    try {
        const response = await fetch('http://127.0.0.1:8000/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: noteText })
        });

        if (response.ok) {
            input.value = ""; 
            loadNotes(); 
        } else {
            console.error("Failed to add note. Server responded with:", response.status);
        }
    } catch (error) {
        console.error("Error adding note:", error);
    }
});