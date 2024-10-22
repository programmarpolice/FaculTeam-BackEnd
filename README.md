# FaculTeam-BackEnd

## Database

1. Create a new Postgres database named "Faculteam"
2. Initialize PRisma and connect it to the database.
3. Define the models according to the schema
4. Seed the database with 3 departments and 5 professors

## API

Build an Express app that serves the following routes.

The 🔒 lock icon next to a route indicates that it must be a protected route. A user can only access that route by attaching a valid token to their request. If a valid token is not provided, immediately send a 401 Unauthorized error.

### Authentication Routes

- `POST /register` creates a new User with the provided credentials and sends a token
  - request body should include `username` and `password`
  - the password should be hashed in the database
- `POST /login` sends a token if the provided credentials are valid
  - request body should include `username` and `password`

### Professor Routes

- `GET /professors` sends array of all professors
- `GET /professors/:id` sends specific professor and all details of this professor
- 🔒`PUT /professors/:id` updates the specific department
- 🔒`DELETE /professors/:id` deletes the specific department
- send 403 Forbidden if user is not logged in

### Department Routes

- `GET /deparments` sends array of all deparments
- `GET /departments/:id` sends specific order, including all professors
- 🔒 `POST /departments` creates a new department by the logged in user

  - the request body should include the `Name`, a `Description`, `Images`, `Contact info` and ids of the professors

- 🔒`DELETE /deparment/:id` deletes the specific department
- send 403 Forbidden if user is not logged in
- 🔒`PUT /department/:id` updates the specific department
  - request body should include `name` and `done`
  - send 403 Forbidden if user not logged in
