// 1. Tell JavaScript to find the HTML elements we want to use
const form = document.getElementById('note-form');
const input = document.getElementById('note-input');
const list = document.getElementById('notes-list');

// 2. Listen for the "submit" event (when the user clicks Add or presses Enter)
form.addEventListener('submit', function(event) {
    
    // 3. Stop the page from refreshing (this is the default behavior of forms)
    event.preventDefault(); 

    // 4. Get the text the user typed inside the input box
    const noteText = input.value;

    // 5. If the input is empty, do nothing (don't add blank notes)
    if (noteText === "") {
        return; 
    }

    // 6. Create a new list item (li) and a delete button
    const newNote = document.createElement('li');
    newNote.textContent = noteText;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.style.marginLeft = '10px';

    // 7. Add a click event to the delete button so it removes the note
    deleteBtn.addEventListener('click', function() {
        newNote.remove();
    });

    // 8. Put the delete button inside the note, and put the note inside the list
    newNote.appendChild(deleteBtn);
    list.appendChild(newNote);

    // 9. Clear the input box so it's ready for the next note
    input.value = "";
});