Overview

This is a RESTful API built with Express.js, TypeScript, and MongoDB to manage categories and services. The API supports JWT-based authentication for secure access.

It allows:

Admin login

Create, Read, Update, Delete (CRUD) operations on categories

CRUD operations on services within categories, including multiple price options per service

Features

JWT Authentication for all endpoints except login

Category CRUD

Add, update, delete (only empty categories)

List all categories

Service CRUD

Add, update, delete services

Add/update multiple price options

List services inside a category

Error handling and input validation

TypeScript support for better type safety

MongoDB as the database

Tech Stack

Node.js + Express.js

TypeScript

MongoDB + Mongoose

JWT for authentication

bcryptjs for password hashing

dotenv for environment variables