# Todo Express API

A RESTful API built with Express.js, TypeScript, and Sequelize for managing todos with user authentication.

## Features

- User authentication (register/login)
- JWT-based authorization
- CRUD operations for todos
- PostgreSQL database with Sequelize ORM
- Request validation
- Error handling
- Request logging

## Prerequisites

- Node.js
- PostgreSQL database
- npm or yarn

## Environment Variables

Create a `.env` file in the root directory with the following variables:
```
PORT=3000
DATABASE_URL=postgresql://username:password@localhost:5432/your_database
JWT_SECRET=your_jwt_secret
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-name>
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

## API Endpoints

### Authentication

- **POST** `/auth/register`
  - Register a new user
  - Body: `{ "email": "user@example.com", "password": "Password123" }`

- **POST** `/auth/login`
  - Login user
  - Body: `{ "email": "user@example.com", "password": "Password123" }`

### Todos

All todo endpoints require authentication. Include the JWT token in the Authorization header:
`Authorization: Bearer <your_token>`

- **POST** `/todos`
  - Create a new todo
  - Body: `{ "title": "Todo title", "description": "Optional description" }`

- **GET** `/todos`
  - Get all todos for authenticated user

- **PUT** `/todos/:id`
  - Update a todo
  - Body: `{ "title": "Updated title", "description": "Updated description", "is_completed": true }`

- **DELETE** `/todos/:id`
  - Delete a todo

## Password Requirements

- Minimum 6 characters
- At least one uppercase letter
- At least one number

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `400` - Bad Request (validation errors)
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error
