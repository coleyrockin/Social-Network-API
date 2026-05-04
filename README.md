# Social Network API

[![CI](https://github.com/coleyrockin/Social-Network-API/actions/workflows/ci.yml/badge.svg)](https://github.com/coleyrockin/Social-Network-API/actions/workflows/ci.yml)
![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_6-47A248?style=flat&logo=mongodb&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?style=flat&logo=node.js&logoColor=white)
![License](https://img.shields.io/badge/License-ISC-blue?style=flat)

REST API for a social network data model. It supports users, thoughts, reactions, and friend relationships using Express, MongoDB, and Mongoose.

This repository is suitable to publish publicly as a portfolio/demo API. It is not production-ready as a deployed public service until authentication, authorization, and abuse controls are added.

## Status

- Public repo readiness: ready after the tracked `node_modules` cleanup in this commit.
- Dependency audit: `npm audit --omit=dev` reports `0 vulnerabilities`.
- Runtime: local/demo Express API backed by MongoDB.
- Security caveat: all API routes are unauthenticated by design in the current project scope.

## Tech Stack

- Node.js 18+
- Express 4
- MongoDB
- Mongoose
- Moment.js
- Node built-in test runner

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy the environment example:

```bash
cp .env.example .env
```

3. Start MongoDB locally, or set `MONGODB_URI` to a reachable MongoDB connection string.

4. Start the API:

```bash
npm start
```

The server defaults to `http://localhost:3001`.

## Scripts

```bash
npm start
npm test
npm run check
npm audit --omit=dev
```

## Environment Variables

| Name | Default | Purpose |
| --- | --- | --- |
| `MONGODB_URI` | `mongodb://127.0.0.1:27017/social-network-api` | MongoDB connection string |
| `PORT` | `3001` | API port |
| `NODE_ENV` | unset | Runtime environment |
| `MONGOOSE_DEBUG` | `false` | Set to `true` with `NODE_ENV=development` to log Mongoose queries |

## Features

- **User Management** — Create, read, update, and delete users
- **Friend Lists** — Add and remove friends
- **Thoughts** — Full CRUD for user-generated posts
- **Reactions** — Subdocument-based replies on thoughts
- **Virtuals** — Computed friend count and reaction count
- **Timestamps** — Moment.js formatted dates
- **Cascade Delete** — Removing a user deletes their thoughts

## API Routes

### Users

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/api/users` | List users |
| `GET` | `/api/users/:id` | Get one user with thoughts and friends |
| `POST` | `/api/users` | Create a user |
| `PUT` | `/api/users/:id` | Update allowed user fields |
| `DELETE` | `/api/users/:id` | Delete a user and associated thoughts |
| `POST` | `/api/users/:userId/friends/:friendId` | Add a friend |
| `DELETE` | `/api/users/:userId/friends/:friendId` | Remove a friend |

### Thoughts

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/api/thoughts` | List thoughts |
| `GET` | `/api/thoughts/:id` | Get one thought |
| `POST` | `/api/thoughts` | Create a thought for an existing user |
| `PUT` | `/api/thoughts/:id` | Update allowed thought fields |
| `DELETE` | `/api/thoughts/:id` | Delete a thought and remove user references |
| `POST` | `/api/thoughts/:thoughtId/reactions` | Add a reaction |
| `DELETE` | `/api/thoughts/:thoughtId/reactions/:reactionId` | Remove a reaction |

## Example Requests

Create a user:

```json
{
  "username": "boyd",
  "email": "boyd@example.com"
}
```

Create a thought:

```json
{
  "thoughtText": "Building APIs with MongoDB.",
  "username": "boyd",
  "userId": "507f1f77bcf86cd799439011"
}
```

Create a reaction:

```json
{
  "reactionBody": "Nice work.",
  "username": "cole"
}
```

## Audit Docs

- [Security Audit](./SECURITY_AUDIT.md)
- [Codebase Audit](./CODEBASE_AUDIT.md)
- [Roadmap](./ROADMAP.md)

## Known Limitations

- No authentication or authorization yet.
- No rate limiting yet.
- No hosted deployment configuration yet.
- No full integration test harness with a disposable MongoDB instance yet.

## Project Structure

```text
Social-Network-API/
├── config/         # MongoDB connection
├── controllers/    # Route controllers
├── models/         # Mongoose models
├── routes/         # Express routes
├── server.js
└── package.json
```

## License

ISC

Built by [Boyd Roberts](https://github.com/coleyrockin)

