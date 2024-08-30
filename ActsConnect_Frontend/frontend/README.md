# ActsConnect

ActsConnect is a comprehensive full-stack web application designed for seamless interaction among users, featuring content sharing and professional networking capabilities. Built with React.js for the frontend and Spring Boot for the backend, ActsConnect offers a modern, user-friendly experience for connecting with alumni and peers.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technologies](#technologies)
3. [Setup](#setup)
   - [Prerequisites](#prerequisites)
   - [Frontend Installation](#frontend-installation)
   - [Backend Installation](#backend-installation)
4. [Usage](#usage)
5. [Folder Structure](#folder-structure)
6. [API Endpoints](#api-endpoints)
7. [Contributing](#contributing)
8. [License](#license)

## Project Overview

ActsConnect is designed to facilitate connections between students, alumni, and professionals. Key features include:

- **User Profiles:** Users can create and manage profiles, connect with others, and share updates.
- **Content Sharing:** Users can post updates, articles, and media content.
- **Networking:** Connect with alumni and peers for advice, referrals, and networking opportunities.
- **Accomodation:** Students can find many places for accomodation near CDAC and contact them.
- **Job Searching:** Students and Alumini can post job openings that they know so that everyone can take that opportunity.

## Technologies

### Frontend

- **React.js**: A JavaScript library for building dynamic and interactive user interfaces.
- **Material-UI**: A React component library for a consistent and modern design.
- **Axios**: A promise-based HTTP client for API requests.
- **Tailwind CSS**: A utility-first CSS framework for custom styling.
- **Formik**: A tool for making and managing form like structure

### Backend

- **Spring Boot**: A framework for building production-ready Java applications with minimal configuration.
- **MySQL**: A relational database management system for storing user data and application content.
- **JWT (JSON Web Token)**: For secure user authentication and authorization.
- **Spring Security**: Provides authentication and authorization features for the application.

### Development Tools

- **Webpack**: A module bundler for JavaScript applications.
- **Babel**: A JavaScript compiler for using modern JavaScript features.
- **ESLint**: A linter for identifying and fixing problems in JavaScript code.
- **Prettier**: A code formatter to maintain consistent code style.

## Setup

### Prerequisites

Before starting, ensure you have the following installed:

- **Node.js**: For running the frontend.
- **Java JDK**: For the backend.
- **Maven**: A build automation tool for Java projects.
- **MySQL**: For managing the database.

### Frontend Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/AbhishekPandey10/actsconnect_fullstack.git
    ```

2. Navigate to the frontend directory:

    ```bash
    cd actsconnect/actsconnect_frontend
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Start the development server:

    ```bash
    npm start
    ```

### Backend Installation

1. Navigate to the backend directory:

    ```bash
    cd actsconnect/actsconnect_backend
    ```

2. Install dependencies:

    ```bash
    mvn install
    ```

3. Configure the `application.properties` file with your database credentials and other settings.

4. Start the backend server:

    ```bash
    mvn spring-boot:run
    ```

## Usage

- **Frontend Application:** Access it at [http://localhost:3000](http://localhost:3000).
- **Backend API:** Available at [http://localhost:8080](http://localhost:8080).
- **Database:** MySQL database is used for this application. You can use any other database as well
- **Change this at the end**

## Folder Structure

### Frontend

```
frontend/
├── public/
│   └── index.html  
├── src/
│   ├── components/  
│   ├── pages/       
│   ├── App.js       
│   ├── index.js      
│   ├── index.css     
│   ├── utils       
│   ├── config      
│   ├── Redux      
│   ├── theam    
│   ├── Routes       
│   ├── App.test.js      
│   └── ...         
├── tailwind.config.js  
├── package.json      
├── package-lock.json      
├── .gitignore      
└── ...               
```

### Backend

```
Backend:
├───.idea
├───.mvn
│   └───wrapper
├───src
│   ├───main
│   │   ├───java
│   │   │   └───com
│   │   │       └───connect
│   │   │           └───acts
│   │   │               └───ActsConnectBackend
│   │   │                   ├───config
│   │   │                   ├───controller
│   │   │                   ├───dto
│   │   │                   ├───model
│   │   │                   ├───repo
│   │   │                   ├───security
│   │   │                   ├───service
│   │   │                   └───utils
│   │   └───resources
│   └───test
│       └───java
│           └───com
│               └───connect
│                   └───acts
│                       └───ActsConnectBackend
└───target
    ├───classes
    │   └───com
    │       └───connect
    │           └───acts
    │               └───ActsConnectBackend
    │                   ├───config
    │                   ├───controller
    │                   ├───dto
    │                   ├───model
    │                   ├───repo
    │                   ├───security
    │                   ├───service
    │                   └───utils
    └───generated-sources
        └───annotations
```
## API Endpoints

The application provides the following API endpoints:

- `GET /api/posts` - Retrieve all posts.
- `POST /api/posts` - Create a new post.
- `GET /api/posts/{id}` - Retrieve a single post by ID.
- `PUT /api/posts/{id}` - Update a post by ID.
- `DELETE /api/posts/{id}` - Delete a post by ID.
- `POST /api/auth` - Authenticate a user and return a JWT.

## Contributing

We welcome contributions to improve ActsConnect! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Open a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
