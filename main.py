from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Our database
notes_db = []

# What a note looks like coming in
class Note(BaseModel):
    text: str

# GET all notes
@app.get("/notes")
def get_notes():
    return {"notes": notes_db}

# POST a new note
@app.post("/notes")
def create_note(note: Note):
    # We create an ID based on the current length of the list
    new_note = {"id": len(notes_db), "text": note.text}
    notes_db.append(new_note)
    return {"message": "Note added successfully!", "note": new_note}

# DELETE a specific note
@app.delete("/notes/{note_id}")
def delete_note(note_id: int):
    for index, note in enumerate(notes_db):
        if note["id"] == note_id:
            notes_db.pop(index)
            return {"message": "Note deleted successfully!"}
    
    raise HTTPException(status_code=404, detail="Note not found")