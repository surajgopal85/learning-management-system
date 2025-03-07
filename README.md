# learning-management-system

A technology hub to drive a school. Built in express, postgreSQL, and react as a portfolio project.

## Project Structure

- `app/`: Contains the React front end.
- `server/`: Contains the Express backend and SQLite database.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup

### 1. Install dependencies

#### Front end

```sh
cd app
npm install
```

#### Back end

```sh
cd server
npm install
npm run reset-db
```

### 3. Set up the database

```sh
npm run reset-db
```

This command will remove the existing `database.sqlite` file (if any) and create a new one using the schema defined in `server/db/schema.sql`.

## Running the Application

### 1. Start the Express server

```sh
cd server
npm start
```

The Express server will start on `http://localhost:3001`.

### 2. Start the React front end

(Open a new terminal window)

```sh
cd app
npm start
```
