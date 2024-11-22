### E-Learning Platform
This is an e-learning platform designed to enhance peer-to-peer learning among university students. The platform supports collaborative file sharing, real-time chat, discussion forums, and interactive quizzes.

## Features
User Authentication: Register and log in to access the platform.
File Sharing: Upload and download educational materials.
Chat Functionality: Real-time communication with peers (messages expire after 24 hours).
Interactive Quizzes: Engage in collaborative learning through quizzes.
Responsive Design: Optimized for use on desktop and mobile devices.

## Project Structure
The application is divided into two parts:
# Client: React front-end.
# Server: Python Flask back-end with SQLite database.

## Prerequisites
Before you begin, ensure you have the following installed:

Node.js (for the client)
Python 3.8+ (for the server)
Git (for version control)

## Getting Started
# 1. Clone the Repository
`
git clone https://github.com/your-username/E-learning.git`

`cd E-learning`
# 2. Set Up the Server
Navigate to the server directory:
`
cd server`
Create a virtual environment and activate it:
`
python -m venv venv`

`source env/bin/activate `

` On Windows: env\Scripts\activate`
Install dependencies:
`
pip install -r requirements.txt`
Start the server:
`
python app.py`
The server will start at http://localhost:8080.
# 3. Set Up the Client
Navigate to the client directory:
`
cd ../client`
Install dependencies:
`
npm install`
Start the development server:
`
npm run dev`
The client will start at http://localhost:5173.
# 4. Running the Application
Start the server using:
`
python app.py`
Start the client using:
`
npm run dev`
Open your browser and navigate to http://localhost:5173 to use the application.

## API Endpoints
# User Routes
POST /register: Register a new user.
POST /login: Log in a user.
# File Routes
POST /upload-file: Upload a file.
GET /search-files: Get a list of files.
# Chat Routes
POST /chat: Send a chat message.
GET /chat: Retrieve chat messages.

## Technologies Used
Front-end: React, Tailwind CSS
Back-end: Python Flask, SQLite
Libraries: Axios (client), Flask-SQLAlchemy (server)

## Contribution Guidelines
Fork the repository.
Create a new branch for your feature (git checkout -b feature-name).
Commit your changes (git commit -m "Added feature-name").
Push to the branch (git push origin feature-name).
Open a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments
Special shoutout to I, Leon Munene, the creator of this project.
Feel free to adjust this README.md file to fit your specific repository and additional needs!
