# Social Network API

![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_6-47A248?style=flat&logo=mongodb&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Runtime-339933?style=flat&logo=node.js&logoColor=white)
![License](https://img.shields.io/badge/License-ISC-blue?style=flat)

## About

A RESTful API for a social network application built with Express.js and MongoDB using Mongoose ODM. Supports users, thoughts (posts), reactions (replies), and friend lists.

## Features

- **User Management** — Create, read, update, and delete users
- **Friend Lists** — Add and remove friends
- **Thoughts** — Full CRUD for user-generated posts
- **Reactions** — Subdocument-based replies on thoughts
- **Virtuals** — Computed friend count and reaction count
- **Timestamps** — Moment.js formatted dates
- **Cascade Delete** — Removing a user deletes their thoughts

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Express.js 4 |
| Database | MongoDB, Mongoose 6 |
| Timestamps | Moment.js 2 |
| Runtime | Node.js |

## Getting Started

```bash
git clone https://github.com/coleyrockin/Social-Network-API.git
cd Social-Network-API
npm install
npm start
```

## API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| POST | `/api/users` | Create user |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user + thoughts |
| POST | `/api/users/:userId/friends/:friendId` | Add friend |
| DELETE | `/api/users/:userId/friends/:friendId` | Remove friend |
| GET | `/api/thoughts` | Get all thoughts |
| GET | `/api/thoughts/:id` | Get thought by ID |
| POST | `/api/thoughts` | Create thought |
| PUT | `/api/thoughts/:id` | Update thought |
| DELETE | `/api/thoughts/:id` | Delete thought |
| POST | `/api/thoughts/:thoughtId/reactions` | Add reaction |
| DELETE | `/api/thoughts/:thoughtId/reactions/:reactionId` | Remove reaction |

## Project Structure

```
Social-Network-API/
├── config/         # MongoDB connection
├── controllers/    # Route controllers
├── models/         # Mongoose models
├── routes/         # Express routes
├── server.js
└── package.json
```

---

Built by [Boyd Roberts](https://github.com/coleyrockin)
