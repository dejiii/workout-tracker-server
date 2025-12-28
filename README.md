# Server API Documentation

## Base URL

`http://localhost:3000`

## Endpoints

### System

- `GET /health` - Check if server is running
  - Response: `{ status: "ok", message: "Server is running" }`
- `GET /handshake` - Handshake to wake server
  - Response: `{ status: "ok", message: "Handshake successful" }`

### Users

- `GET /api/users` - Get all users
  - Response: `[ { "name": "...", "email": "...", ... } ]`

## Authentication

Authentication is handled via [Clerk](https://clerk.com/).
Include the Clerk session token in the Authorization header:
`Authorization: Bearer <token>`
