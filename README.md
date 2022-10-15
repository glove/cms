# CMS
A simple customer management system made in JavaScript, using Express, EJS, and MongoDB.

## Features

- Customer querying system
- Ticket administration system
- Simple dashboard
- CSR name-changing system

## Installation

1. Clone the repository
2. Install dependencies via executing `npm install`
3. Configure environment variables (more information below)
4. Start the CMS by executing `node src/index.js`
5. Connect to the CMS by navigating to `http://127.0.0.1:(your configured port)` in your web browser

## Environment Variables

Environment variables should be defined in `env/variables.env`.

HTTPS - Whether the server is to use HTTPS

RATE_LIMITING - Whether the server is to use rate limiting middleware

VIEW_CACHE - Whether the server is to cache views

ACCESS_RESTRICTION - Whether the server is to use middleware to restrict access to secure endpoints (not necessary for development)

MONGO_URI - Your MongoDB URI

PORT - The port for the server to run on

DB - The database for MongoDB to use

COLLECTION - The primary collection for user data to be stored in

TICKET_COLLECTION - The collection containing tickets

CUSTOMER_COLLECTION - The collection containing customer data