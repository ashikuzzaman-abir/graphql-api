Author: [@Ashikuzzaman Abir](https://github.com/ashikuzzaman-abir)  |   October, 2024

# GraphQL API

## Overview

This is a GraphQL API built with Express.js and TypeScript, which provides various data such as actions, triggers, and resource templates. The project is scaffolded using a TypeScript setup, and it includes GraphQL resolvers, type definitions, and basic middleware for authentication.

## Features

* **GraphQL API**: Supports queries and mutations with custom scalars.
* **Authentication**: Basic token validation middleware.
* **Data Handling**: Manages resources like actions, triggers, and resource templates.

## Table of Contents

* [Installation](#installation)
* [Running the Project](#running-the-project)
* [Testing with GraphiQL](#testing-with-graphiql)
* [GraphQL Queries](#graphql-queries)
* [Project Explanation](#project-explanation))
* [Outcome and Results](#outcome-and-results)

## Installation

To get started with the project, ensure you have **Node.js** and **npm** installed.

1. Clone the repository:
   
   ```bash
   git clone https://github.com/ashikuzzaman-abir/graphql-api.git
   ```
2. Navigate to the project directory:
   
   ```bash
   cd graphql-api
   ```
3. Install the necessary dependencies:
   
   ```bash
   npm install
   ```
4. Create a `.env` file based on the provided `.env.example` with appropriate environment variables (e.g., `PORT`, `JWT_PRIVATE_KEY`, `AUTH_TOKEN`).

## Running the Project

There are a few npm scripts you can use to manage the project:

* \*Start the server in production*:
  
  ```bash
  npm start
  ```
  
  This will compile the TypeScript code and run the server from the `dist/` folder.
* ***Start the server in development***:
  
  ```bash
  npm run dev
  ```
  
  This runs the project using `ts-node` with live-reloading via `nodemon`.
* \***Start with authentication***:
  First generate a token through my script
  
  ```bash
  npm run gen:auth
  ```
  
  Then copy the token and add it in `AUTH_TOKEN` variable in .env file
  Now, start the dev sarver by running
  
  ```bash
  npm run dev:auth
  ```
  
  This variant runs the project with the token validation feature active.

## Testing with GraphiQL

The project comes with **GraphiQL** enabled, an in-browser IDE for interacting with the GraphQL API.

1. Start the server by running:
   
   ```bash
   npm run dev
   ```
   
   or with authentication,
   
   ```bash
   npm run dev:auth
   ```
2. Open your browser and navigate to `http://localhost:5000/graphql`.
3. In the GraphiQL interface, you can test your queries and mutations. Here's an example:

```
{
node(nodeId: "6297005470a0c10d6b89ccf1"){
  _id
  name
  updatedAt
  trigger{
    _id
    name
    description
  }
  actions{
    name
    createdAt
  }
  colour
}}

{
  nodes{
    _id
    parents{
      _id
      name
    }
    compositeId
    actions{
      name
    }
    trigger{
      name
    }
  }
}
```

## GraphQL Queries

### Sample Query

```
{
	parentNodesByCompositeId(compositeId: "Er9xF8cOr7oVrrvj"){
    name
    description
    compositeId
    parents{
      _id
    }
  }
}
```

### Sample Query

```
{
  nodesByCompositeId(compositeId: "XTpR0HkNpxWjJ6eG"){
     _id
    parents{
      _id
      name
    }
    compositeId
    actions{
      name
    }
    trigger{
      name
    }
  }
}
```

## Project Explanation

### 1. **Schema and Resolvers**

* **Schema**: Located in `src/schema/typeDefs.ts`, defines the types `Action`, `Trigger`, and `ResourceTemplate`. It also includes custom scalar types like `Long` and `JSON`.
* **Resolvers**: Implemented in `src/schema/resolvers.ts`. These are functions that handle incoming GraphQL queries and mutations. It includes functionality to fetch actions, triggers, and associated data from JSON files.

### 2. **Middleware**

* The project includes a middleware called `authValidator` located in `src/middlewares/authValidator.ts`. This middleware checks the presence of an authorization token and validates it.

### 3. **Data Layer**

* The project uses static JSON files (located in `src/data/`) to simulate a database. It loads these files and serves the data via the GraphQL API.

## Outcome and Results

By the end of this project:

* You will have a functional GraphQL API to manage resources like actions and triggers.
* You can easily test and query data using the GraphiQL interface.
* You will have a foundation that can be expanded with real-world data and improved authentication.

### ⭐ Please Star this repo on [GitHub](https://github.com/). It keeps me motivated to do more projects.

