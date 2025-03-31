# Easy Note Application API's

A simple Note-taking API built with **Node.js**, **Express.js**, and **MongoDB**.

## Features
- Create, update, and delete notes
- RESTful API endpoints
- MongoDB for data storage

## Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

## Installation
1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd easy-note
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   npm start
   ```

## API Endpoints

### Create a Note
- **Endpoint:** `POST /notes`
- **Request Body:**
  ```json
  {
    "title": "Sample Note",
    "content": "This is a sample note."
  }
  ```
- **Response:**
  ```json
  {
    "_id": "123456",
    "title": "Sample Note",
    "content": "This is a sample note."
  }
  ```

### Update a Note
- **Endpoint:** `PATCH i/notes/:id`
- **Request Body:**
  ```json
  {
    "title": "Updated Note",
    "content": "This is an updated note."
  }
  ```

### Delete a Note
- **Endpoint:** `DELETE /notes/:id`
- **Response:** `{ "message": "Note deleted successfully" }`


