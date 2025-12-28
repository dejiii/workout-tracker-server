# Workout Tracker API

A robust, production-ready RESTful API for tracking workouts, built with Node.js, Express, TypeScript, and MongoDB.

## 🚀 Features

- **User Authentication**: Secure JWT-based registration and login.
- **Workout Management**: Full CRUD operations for workouts (Create, Read, Update, Delete).
- **Advanced Querying**:
  - **Pagination**: Efficiently handle large datasets with `page` and `limit` parameters.
  - **Sorting**: Automatically sorts by newest date.
- **Validation**:
  - Strict Mongoose schema validation.
  - Application-layer validation.
- **Error Handling**: Centralized global error handling.
- **Security**: Password hashing with bcrypt, JWT authorization, Helmet security headers.
- **Type Safety**: Built completely with TypeScript.

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JSON Web Token (JWT) + bcryptjs
- **Tooling**: Nodemon, Dotenv

## ⚙️ Installation & Setup

1.  **Clone the repository**

    ```bash
    git clone https://github.com/your-username/workout-tracker-backend.git
    cd workout-tracker-backend
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory and add the following:

    ```env
    PORT=3000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_key
    ```

4.  **Run the application**

    ```bash
    # Development mode (restarts on changes)
    npm run dev

    # Build and start for production
    npm run build
    npm start
    ```

## 📖 API Documentation

### **Authentication**

#### Register User

- **Endpoint**: `POST /api/auth/signup`
- **Body**:
  ```json
  {
    "name": "Abdul-Azeez",
    "email": "adeyigaabdulazeez@gmail.com",
    "password": "$Pass1234"
  }
  ```
- **Response**: `{ "id": "...", "name": "...", "email": "...", "token": "..." }`

#### Login User

- **Endpoint**: `POST /api/auth/signin`
- **Body**:
  ```json
  {
    "email": "adeyigaabdulazeez@gmail.com",
    "password": "$Pass1234"
  }
  ```
- **Response**: `{ "id": "...", "name": "...", "email": "...", "token": "..." }`

#### Get Current User

- **Endpoint**: `GET /api/auth/me`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{ "id": "...", "name": "...", "email": "..." }`

---

### **Workouts**

_Note: All Workout endpoints require the `Authorization` header with the Bearer token._
`Authorization: Bearer <your_jwt_token>`

#### Create Workout

- **Endpoint**: `POST /api/workouts`
- **Body**:
  ```json
  {
    "type": "Running",
    "duration": 30,
    "date": "2023-10-27T10:00:00.000Z",
    "notes": "Morning run"
  }
  ```
- **Response**: Returns the created workout object.

#### Get All Workouts

- **Endpoint**: `GET /api/workouts`
- **Query Parameters**:
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 10)
- **Example**: `GET /api/workouts?page=1&limit=5`
- **Response**:
  ```json
  {
    "workouts": [ ... ],
    "pagination": {
      "page": 1,
      "limit": 5,
      "totalPages": 3,
      "totalWorkouts": 12
    }
  }
  ```

#### Update Workout

- **Endpoint**: `PUT /api/workouts/:id`
- **Body**: (Fields to update)
  ```json
  {
    "notes": "Updated notes"
  }
  ```
- **Response**: Returns the updated workout object.

#### Delete Workout

- **Endpoint**: `DELETE /api/workouts/:id`
- **Response**: `{ "id": "deleted_workout_id" }`

## 📂 Project Structure

```
src/
├── config/         # Database configuration
├── controllers/    # Request handlers (Auth, Workouts)
├── middleware/     # Auth checks, Error Handler
├── models/         # Mongoose Schemas (User, Workout)
├── routes/         # API Route definitions
├── app.ts          # Express App setup
└── index.ts        # Server entry point
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
