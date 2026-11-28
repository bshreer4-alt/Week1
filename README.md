# 📝 Notes App

A simple, fully functional Notes Application built from scratch. 

## 🚀 Live Demo
You can try the live app here: [https://bshree4-alt.github.io/Week1/](https://bshree4-alt.github.io/Week1/)

## ✨ Features
- **Add Notes:** Create new notes instantly.
- **Delete Notes:** Remove notes with a single click.
- **Persistent Storage:** Uses `localStorage` so your notes don't disappear when you refresh or close the browser.
- **Responsive Design:** Looks great on desktop and mobile phones.

## 🛠️ Built With
- HTML5
- CSS3 (Flexbox & Media Queries)
- Vanilla JavaScript (DOM Manipulation)

## 👨‍💻 Author
**Bindushree** - [GitHub Profile](https://github.com/bshree4-alt)

## ⚙️ Backend API
This project includes a custom Python backend built with **FastAPI**.
- **GET `/notes`**: Retrieves all saved notes from the database.
- **POST `/notes`**: Creates a new note and saves it to a JSON file.
- **DELETE `/notes/{id}`**: Deletes a specific note by its ID.

## 🚀 How to Run Locally
1. Clone this repository.
2. Install the required packages: `pip install fastapi uvicorn`
3. Start the Python backend: `python -m uvicorn main:app --reload`
4. Open `index.html` using VS Code's Live Server.