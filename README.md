# Task Manager | Full Stack To-Do List

A simple and functional Full Stack task management application built with **Python, FastAPI, SQLite, HTML, CSS, and JavaScript**.

The application allows users to create, organize, edit, complete, and delete tasks through an intuitive interface connected to a REST API.

---

## Overview

This project was developed to practice Full Stack development, REST API design, database operations, and frontend-backend integration.

The application follows a layered backend structure, separating API routes, business logic, data validation, and database operations.

Tasks are stored in a SQLite database, ensuring persistence between application sessions.

## Features

* **Create Tasks:** Add new tasks with a name and deadline.
* **List Tasks:** Retrieve and display all registered tasks.
* **Edit Tasks:** Update existing task information.
* **Complete Tasks:** Mark tasks as completed or return them to pending status.
* **Delete Tasks:** Remove tasks from the database.
* **Task Organization:** Separate tasks into pending and completed sections.
* **Task Counters:** Display the number of tasks in each section.
* **Data Persistence:** Store task information using SQLite.
* **REST API:** Handle frontend requests through HTTP methods and JSON responses.

## Technologies

### Backend

* Python
* FastAPI
* Pydantic
* SQLite3
* Uvicorn

### Frontend

* HTML5
* CSS3
* JavaScript (ES6+)
* Fetch API

### Tools

* Git
* GitHub
* Visual Studio Code

## Project Structure

```text
todo-list/
│
├── app/
│   ├── backend/
│   │   ├── db.py
│   │   ├── routes.py
│   │   ├── schemas.py
│   │   └── services.py
│   │
│   ├── frontend/
│   │   ├── index.html
│   │   ├── style.css
│   │   └── script.js
│   │
│   └── main.py
│
├── requirements.txt
├── .gitignore
└── README.md
```

## Architecture

The backend is organized into separate modules, each responsible for a specific part of the application.

| File          | Responsibility                                                       |
| ------------- | -------------------------------------------------------------------- |
| `main.py`     | Initializes the FastAPI application and configures CORS.             |
| `db.py`       | Establishes the SQLite connection and creates the database table.    |
| `routes.py`   | Defines the API endpoints and handles HTTP requests.                 |
| `schemas.py`  | Defines Pydantic models for data validation and response formatting. |
| `services.py` | Implements the business logic and database operations.               |
| `index.html`  | Defines the application's structure.                                 |
| `style.css`   | Handles the visual presentation and layout.                          |
| `script.js`   | Manages frontend interactions and communication with the API.        |

## API Documentation

The application exposes the following REST API endpoints:

**Base URL:** `http://127.0.0.1:8000`

| Method   | Endpoint                        | Description                     |
| -------- | ------------------------------- | ------------------------------- |
| `POST`   | `/tarefas`                      | Creates a new task.             |
| `GET`    | `/tarefas`                      | Retrieves all tasks.            |
| `PUT`    | `/tarefas/{id_tarefa}`          | Updates an existing task.       |
| `PATCH`  | `/tarefas/{id_tarefa}/concluir` | Toggles task completion status. |
| `DELETE` | `/tarefas/{id_tarefa}`          | Deletes a task.                 |

### Example Request

Creating a new task:

```http
POST /tarefas
Content-Type: application/json
```

```json
{
  "nome": "Study Python",
  "prazo": "2026-10-15"
}
```

Example response:

```json
{
  "id_tarefa": 1,
  "nome": "Study Python",
  "prazo": "2026-10-15",
  "concluida": false
}
```

### API Documentation Interface

FastAPI automatically generates interactive API documentation.

After starting the backend, access:

* Swagger UI: `http://127.0.0.1:8000/docs`
* ReDoc: `http://127.0.0.1:8000/redoc`

## Getting Started

Follow the instructions below to run the project locally.

### Prerequisites

Make sure you have installed:

* Python 3.10+
* Git
* A code editor (VS Code recommended)
* A browser with Live Server or another local HTTP server

### 1. Clone the repository

```bash
git clone https://github.com/miguelsantos28/todo-list.git
```

### 2. Navigate to the project directory

```bash
cd todo-list
```

### 3. Create a virtual environment

```bash
python -m venv venv
```

Activate it:

**Windows:**

```bash
venv\Scripts\activate
```

**Linux / macOS:**

```bash
source venv/bin/activate
```

### 4. Install dependencies

```bash
pip install -r requirements.txt
```

### 5. Start the backend

From the project's root directory, execute:

```bash
python -m uvicorn app.main:app --reload
```

The API will be available at:

`http://127.0.0.1:8000`

### 6. Start the frontend

Open the `app/frontend` directory in VS Code.

Using the Live Server extension, open `index.html`.

The frontend is configured to communicate with the backend at:

`http://127.0.0.1:8000/tarefas`

**Important:** Keep the backend running while using the application.

## Database

The project uses SQLite3 to store task information.

The database table contains the following fields:

| Field       | Type    | Description             |
| ----------- | ------- | ----------------------- |
| `id_tarefa` | INTEGER | Unique task identifier. |
| `nome`      | TEXT    | Task name.              |
| `prazo`     | TEXT    | Task deadline.          |
| `concluida` | BOOLEAN | Completion status.      |

The database table is automatically created when the backend initializes.

## Learning Objectives

This project helped me develop practical knowledge of:

* Building REST APIs with FastAPI.
* Structuring a backend application using separation of concerns.
* Implementing CRUD operations.
* Working with relational databases and SQL.
* Validating data using Pydantic.
* Handling HTTP requests and responses.
* Integrating a JavaScript frontend with a Python backend.
* Manipulating the DOM dynamically.
* Managing asynchronous operations using `async/await` and Fetch API.
* Working with Git and GitHub.

## Future Improvements

Some improvements planned for future versions:

* Implement automated tests for API endpoints.
* Improve error handling on the frontend.
* Add task filtering and sorting.
* Improve database connection management.
* Introduce SQLAlchemy for database operations.
* Improve application responsiveness and accessibility.

---

**Developed by Miguel Santos**

[GitHub](https://github.com/miguelsantos28)
