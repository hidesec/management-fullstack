# Management Fullstack

## Description
This project is a fullstack management application using Node.js with IBM LoopBack 3 for the backend and Ember.js v3.28 for the frontend.

## Prerequisites
- Node.js >= 6
- npm

## Installation

1. Clone this repository:
    ```bash
    git clone <REPOSITORY_URL>
    cd management-fullstack
    ```

2. Install backend dependencies:
    ```bash
    npm install
    ```

3. Install frontend dependencies:
    ```bash
    cd client
    npm install
    cd ..
    ```

## Running the Application

1. Build the frontend:
    ```bash
    npm run build:frontend
    ```

2. Build all components and start the server:
    ```bash
    npm run dev
    ```

The application will run at `http://localhost:3000`.

## NPM Scripts

- `lint`: Runs ESLint to check the code.
- `start`: Starts the Node.js server.
- `posttest`: Runs lint and nsp check after tests.
- `build:frontend`: Builds the frontend using Ember.js.
- `build:all`: Builds the frontend and copies the build output to the `public` directory.
- `dev`: Builds all components and starts the server.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
