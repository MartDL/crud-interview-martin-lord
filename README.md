# User Admin Web Application

This project implements a simple **CRUD User Administration application** built with **React, TypeScript, TanStack React Query, and Material UI**.

The application allows a User Admin to:

- Create users
- View a list of users
- Edit users
- Delete users

The backend API is mocked using **Mock Service Worker (MSW)** so the application can run without a real backend service.

---

# Repository

https://github.com/martinlord/crud-interview-martin-lord

---

# Tech Stack

- React
- TypeScript
- TanStack React Query
- Material UI
- Jest
- React Testing Library
- Prettier

---

# Installation

Clone the repository and install dependencies.

```bash
git clone https://github.com/martinlord/crud-interview-martin-lord.git
cd crud-interview-martin-lord
yarn install
```

---

# Running the Application

Start the development server:

```bash
yarn dev
```

Then open your browser and navigate to:

```
http://localhost:5173
```

---

# Building the Application

To create a production build run:

```bash
yarn build
```

---

# Running Tests

Unit tests are written using **Jest** and **React Testing Library**.

Run tests with:

```bash
yarn test
```

---

# Test Coverage

To generate a test coverage report run:

```bash
yarn test --coverage
```

Coverage results will be generated in the `/coverage` directory.

---

# Available Scripts

| Command              | Description                           |
| -------------------- | ------------------------------------- |
| yarn dev             | Runs the application locally          |
| yarn build           | Builds the application for production |
| yarn test            | Runs unit tests                       |
| yarn test --coverage | Generates test coverage               |

---

# API

Available endpoints:

```
GET    https://example.com/user
GET    https://example.com/user/:id
POST   https://example.com/user
PUT    https://example.com/user/:id
DELETE https://example.com/user/:id
```

---

# Features Implemented

✔ Create user  
✔ List users  
✔ Edit user  
✔ Delete user

### Validation Rules

- Last name is required
- First name is optional
- Date of birth cannot be in the future

---

# Author

Martin Lord

Endpoints used to retrieve/manipulate mocked data are implemented using MSW library (https://mswjs.io/) and MSW data (https://github.com/mswjs/data).

## List of available BFF endpoints:

GET - https://example.com/user - Retrieve all available users  
GET - https://example.com/user/:id - Retrieve user with a certain id  
POST - https://example.com/user - Create a new user. Provide first name  
PUT - https://example.com/user/:id - Edit a user. Provide first name  
DELETE - https://example.com/user/:id - Delete a user
