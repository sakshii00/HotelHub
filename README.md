# HotelHub

HotelHub is a web application designed for users to explore, and review hotels. It leverages EJS, MongoDB, Bootstrap CSS, Express, and Node.js, with Passport.js handling user authentication. This project showcases full CRUD functionality and allows users to manage hotel data dynamically.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [License](#license)

## Features

- User authentication with Passport.js.
- Logged-in users can add, edit, and delete hotels.
- Users can add and delete reviews for hotels.
- Full CRUD functionality for hotel data.
- Flash messages for user feedback.
- Session management using Express Session.
- Dynamic templating with EJS and EJS Mate.
- Modular route handling with Express Router.

## Technologies Used

- **EJS**: Embedded JavaScript templates for dynamic HTML rendering.
- **MongoDB**: NoSQL database for storing user, review, and hotel data.
- **Bootstrap CSS**: For responsive and modern design.
- **Express**: Node.js framework for building the server and handling routes.
- **Node.js**: JavaScript runtime for the server-side application.
- **Passport.js**: Authentication middleware for Node.js.
- **Express Session**: Middleware for managing user sessions.
- **Flash**: Middleware for flash messages.

## Project Structure

```bash
HotelHub/
│
├── app.js                # Main file for routes and application setup
├── index.js              # Script for changing and generating sample data
├── models/
│   ├── user.js           # User schema and model
│   ├── review.js         # Review schema and model
│   └── hotelground.js    # Hotel schema and model
├── routes/
│   └── hotels.js         # Hotel-related routes
│   ├── reviews.js        # Review-related routes
│   ├── users.js          # User-related routes
├── views/
│   ├── partials/         # EJS partials
│   ├── layouts/          # Hotel-related EJS templates
│   └── ...               # Other EJS templates
├── public/               # Stylesheets and validator
│
├── package.json          # Project dependencies
└── README.md             # Project documentation
```

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/HotelHub.git
   cd HotelHub
   ```

## Instal dependencies

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   MONGO_URI=your_mongodb_uri
   SESSION_SECRET=your_session_secret
   SAMPLE_USER_ID=sample_user_id
   ```

4. **Generate sample data (if needed):**
   ```bash
   node index.js
   ```

## Usage

1. **Start the application:**
   ```bash
   node app.js
   ```
2. **Open your browser and navigate to** `http://localhost:3000`.

## Environment Variables

- `MONGO_URI`: MongoDB connection string.
- `SESSION_SECRET`: Secret key for session encryption.
- `SAMPLE_USER_ID`: ID for the sample data's author in the user schema.


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.




