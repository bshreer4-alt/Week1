from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# 1. This is our fake database (a simple Python list)
notes_db = []

# 2. This defines what a "Note" looks like
class Note(BaseModel):
    text: str

# 3. GET Route: Send all notes back to the frontend
@app.get("/notes")
def get_notes():
    return {"notes": notes_db}

# 4. POST Route: Receive a new note and save it
@app.post("/notes")
def create_note(note: Note):
    notes_db.append(note.text) # Add the text to our list
    return {"message": "Note added successfully!", "your_note": note.text}