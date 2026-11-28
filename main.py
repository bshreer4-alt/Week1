from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import json  # NEW: We import the json library

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Note(BaseModel):
    text: str

# --- NEW HELPER FUNCTIONS ---

# Function to read the file and return the notes
def load_notes():
    try:
        with open("notes.json", "r") as file:
            return json.load(file)
    except (FileNotFoundError, json.JSONDecodeError):
        return [] # If the file doesn't exist or is empty, return an empty list

# Function to write the notes to the file
def save_notes(notes):
    with open("notes.json", "w") as file:
        json.dump(notes, file, indent=4) # indent=4 makes the JSON file readable

# --- API ROUTES ---

@app.get("/notes")
def get_notes():
    # Instead of returning notes_db, we load from the file
    current_notes = load_notes()
    return {"notes": current_notes}

@app.post("/notes")
def create_note(note: Note):
    current_notes = load_notes()
    
    # Give it a unique ID based on the current length
    new_note = {"id": len(current_notes), "text": note.text}
    current_notes.append(new_note)
    
    save_notes(current_notes) # Save to the file!
    return {"message": "Note added successfully!", "note": new_note}

@app.delete("/notes/{note_id}")
def delete_note(note_id: int):
    current_notes = load_notes()
    
    for index, note in enumerate(current_notes):
        if note["id"] == note_id:
            current_notes.pop(index)
            
            # Re-assign IDs so they stay sequential (0, 1, 2...)
            for i, n in enumerate(current_notes):
                n["id"] = i
                
            save_notes(current_notes) # Save the updated list to the file
            return {"message": "Note deleted successfully!"}
            
    raise HTTPException(status_code=404, detail="Note not found")