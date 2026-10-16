# COMP3123 Exercise 06 - Notes API

Student: Mechel Fernando  
Student ID: 101352126

Node.js, Express, Mongoose and MongoDB CRUD exercise based on the provided starter.

## Run

1. Install Node.js and use a running local MongoDB database or MongoDB Atlas.
2. Run `npm install` in this folder.
3. For local MongoDB, run `npm start`. The default database is `mongodb://127.0.0.1:27017/comp3123_exec06`.
4. For Atlas on macOS, run the following with your actual connection string:

```bash
export DB_URL='mongodb+srv://USERNAME:PASSWORD@YOUR-CLUSTER/comp3123_exec06'
npm start
```

In Atlas, create a database user and allow your current IP in Network Access.
URL-encode special characters in the password. Do not commit real credentials.
The server starts at http://localhost:8081 after the database connects.

## Endpoints

| Method | Path | Purpose | Success |
| --- | --- | --- | --- |
| POST | /notes | Create a note | 201 |
| GET | /notes | Get all notes | 200 |
| GET | /notes/:noteId | Get one note | 200 |
| PUT | /notes/:noteId | Update a note | 200 |
| DELETE | /notes/:noteId | Delete a note | 200 |

POST and PUT accept JSON in this format:

```json
{
  "content": {
    "noteTitle": "Sample Note Title",
    "noteDescription": "Sample Note Description",
    "priority": "HIGH"
  }
}
```

Priorities are HIGH, LOW or MEDUIM (starter spelling). Title and description are
required. Creation dates default to the current time; updates refresh dateUpdated.
GET and DELETE do not need a body. Invalid input returns 400; missing notes return 404.

## Postman screenshots

Import `exec06.postman_collection.json` into Postman. Start the server, then run
requests 01 through 09 in order. Request 01 saves the created ID automatically.
Use the Collection Runner or send each request separately in order.
Capture each request showing its method, URL, response status and JSON body.
These screenshots must be captured from your own Postman run; they are not included.

## Fixes

- Added and exported the note schema.
- Fixed the model import and registered the router.
- Completed all five CRUD endpoints with error handling.
- Removed incorrect body checks from GET and DELETE.
- Removed obsolete connection options and fixed the server port message.

Docker/Vercel hosting was optional and is not included.
