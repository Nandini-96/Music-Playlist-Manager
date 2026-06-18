# Music Playlist Manager

A web application that allows users to create playlists, add songs, remove songs, and manage their music collections through an intuitive and responsive user interface.

## Setup and Run Instructions
 
### Prerequisites
- Node.js 18 or higher
- npm 

### Frontend
 
```bash
# Navigate to the frontend directory: 
cd frontend

# Install dependencies
npm install
 
# Start the development server
npm start
```
The frontend application will run on: http://localhost:3000.

### Backend / API
 
```bash
# Navigate to the backend directory:
cd backend

# Install dependencies:
npm install

# Start the server:
node server.js
```
The backend server will run on: http://localhost:5000. 
This app expects a REST API running at `http://localhost:3001/api`, exposing the following endpoints:
 
| Method | Endpoint                              | Purpose                  |
|--------|----------------------------------------|---------------------------|
| GET    | `/api/playlists`                       | List all playlists        |
| POST   | `/api/playlists`                       | Create a playlist         |
| DELETE | `/api/playlists/:id`                   | Delete a playlist         |
| POST   | `/api/playlists/:id/songs`             | Add a song to a playlist  |
| DELETE | `/api/playlists/:id/songs/:songId`     | Remove a song             |
 
Start your backend server before starting the frontend, or API calls will fail. If your backend runs on a different port, update `API_BASE` in `src/api/playlistApi.js` accordingly.
 
## Technology Stack

### Frontend
- **React.js (Create React App)**
- **React Router DOM**
- **JavaScript (ES6+)**
- **CSS3**

### Backend
- **Node.js**
- **Express.js**

### Utilities
- **UUID (for unique playlist and song IDs)**
- **CORS**

### Data Storage
- **JSON File Storage (playlists.json)**

## Assumptions Made During Development
 
- No authentication or multi-user support. The app assumes a single user/session interacting with one shared set of playlists. So, there's no login, no per-user data isolation.
- Playlist and song IDs are assigned by the server, not the client. The frontend never generates its own IDs for persisted data, instead it relies on whatever the API returns after a create call.
- Data persistence is implemented using a JSON file instead of a database.
- Duplicate song names are allowed within playlists.
- Playlist ordering and song ordering are not customizable.
- Duration is optional and free-text, validated client-side against an `m:ss` or `mm:ss` pattern (e.g. `3:45`, `12:30`). 
