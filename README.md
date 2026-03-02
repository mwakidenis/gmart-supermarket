# 🛒 gmart

Welcome to **Gmart** – an online shopping platform that delivers a complete and seamless e-commerce experience. From product browsing to order management, this project simulates a fully functional online store with an intuitive interface.

<div align="center">
 <img width="60%" src="https://res.cloudinary.com/dqv8dlj2s/image/upload/v1772480465/Screenshot_2026-03-02_224020_g7mvuq.png" />
</div>

---

<p align="center">
    <a href="https://github.com/MinavKaria/Ratna-Supermarket"><img src="https://badges.frapsoft.com/os/v1/open-source.svg?v=103" alt="Open Source"></a>
    <a href="https://github.com/MinavKaria/"><img src="https://img.shields.io/badge/Maintained%3F-yes-brightgreen.svg?v=103" alt="Maintained"></a>
    <a href="https://github.com/MinavKaria/Ratna-Supermarket/blob/main/LICENSE"><img src="https://img.shields.io/badge/MIT-Licence-blue.svg?v=103" alt="MIT License"></a>  
    <a href="https://github.com/MinavKaria/Ratna-Supermarket/graphs/contributors"><img src="https://img.shields.io/github/contributors/MinavKaria/Ratna-Supermarket?color=brightgreen" alt="Contributors"></a>
    <a href="https://github.com/MinavKaria/Ratna-Supermarket/stargazers"><img src="https://img.shields.io/github/stars/MinavKaria/Ratna-Supermarket?color=0059b3" alt="GitHub Stars"></a>
    <a href="https://github.com/MinavKaria/Ratna-Supermarket/network/members"><img src="https://img.shields.io/github/forks/MinavKaria/Ratna-Supermarket?color=yellow" alt="GitHub Forks"></a>
    <a href="https://github.com/MinavKaria/Ratna-Supermarket/issues"><img src="https://img.shields.io/github/issues/MinavKaria/Ratna-Supermarket?color=0059b3" alt="GitHub Issues"></a>
</p>

---

## ✨ Project Overview

**G Mart Supermarket** is designed to provide users with a real-world shopping experience. It includes essential features such as product listings, cart management, user authentication, and order processing. Developed as part of a college project, it showcases a fully-fledged e-commerce platform using modern web development tools.

Our **Objective** is to create a user-friendly and responsive online shopping platform that allows customers to explore, add products to their cart, and place orders effortlessly.

<p align="center"> 
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="700">
<center>

# 🌐 **Live Demo:** [Gmart]()

</center>
<p align="center"> 
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="700">

## 🔥 Features

- **🛒 Product Management:** Users can browse, search, and filter products by categories.
- **🛍️ Cart System:** Add or remove products, adjust quantities, and view the total price in the cart.
- **🔑 User Authentication:** Secure login, sign-up, and logout functionalities.
- **💸 Order Management:** Place and manage orders, track purchase history.
- **👤 Admin Dashboard:** Admin can manage products, users, and orders (admin-specific features).
- **📱 Responsive Design:** Optimized for mobile, tablet, and desktop devices.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Hosting:** Firebase

---

## 🚀 Getting Started

Follow these steps to set up and run the **G Mart Supermarket** project on your local machine:

### Prerequisites

Ensure that the following software is installed on your system:

- [Node.js](https://nodejs.org/) (v14.x or higher)
- [npm](https://www.npmjs.com/) (Node package manager)
- [React.js](https://react.dev/) (React JS)

## 📦 Installation

To set up the **G Mart Supermarket** project on your local machine, follow these detailed instructions for both the frontend and backend.

### Run With Docker

Don't want to setup with all of the below steps?
Use Docker Compose (Note: Docker should be installed)

1. **Set ENV File**
   Use this starter env file for setting up Docker, Client and Server.
   It should be at root level(In another words at same level where docker-compose.yml is)

   ```bash
   MONGO_URI=mongodb://mongodb
   PORT=3000
   JWT_SECRET=secret
   MONGODBPORT=27017
   MONGOEXPPORT=8081
   SERVERPORT=3000
   CLIENTPORT=5173
   ```

2. **Run Docker Compose**

   ```bash
   docker compose up --watch
   ```

   Note: --watch paramter helps docker to track changes in files if you don't use it you will not be able to see changes and would have to restart everytime/

3. **Stop Docker**

   ```bash
   docker compose down
   ```

   This commands stops docker containers and network and frees all the ports Docker was using.

   For more info on Docker look through this Youtube Video: https://www.youtube.com/watch?v=3c-iBn73dDE

### 🔧 Frontend Setup

1. **Fork the Repository:**  
   Go to the [G Mart Supermarket GitHub repository](https://github.com/mwakidenis/gmart-supermarke) and click the "Fork" button in the top-right corner to create your own copy.

2. **Clone the Repository:**  
   Clone your forked repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/GMart-Supermarket.git
   ```

3. **Navigate to the Project Directory:**  
   Change your directory to the cloned project folder:

   ```bash
   cd GMart-Supermarket
   cd client
   ```

4. **Install Frontend Dependencies:**  
   Run the following command to install all necessary frontend dependencies:

   ```bash
   npm install
   ```

5. **Start the Frontend Development Server:**  
   Launch the frontend in development mode by running:

   ```bash
   npm run dev
   ```

6. **Open the App:**  
   Open your browser and visit `http://localhost:5173` to see the app in action.

### 🛠️ Backend Setup

1. **Navigate to the Backend Directory:**  
   Change your directory to the backend folder:

   ```bash
   cd ../server
   ```

2. **Install Backend Dependencies:**  
   Install the necessary backend dependencies:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**  
   Create or edit the `.env` file in the backend directory with the following variables:

   ```env
   MONGO_URI=<your-mongodb-connection-string>
   DB_NAME=<your-database-name>
   ```

4. **Start the Backend Server:**  
   Launch the backend server:

   ```bash
   node server.js
   ```

### 🐍 Running py_server Files

Ensure you have the following installed:

- [Python](https://www.python.org/) (version 3.x)
- [Flask](https://flask.palletsprojects.com/) (for creating the web server)
- [Flask-CORS](https://flask-cors.readthedocs.io/en/latest/) (for enabling CORS)
- [PyMongo](https://pymongo.readthedocs.io/en/stable/) (for MongoDB integration)

**Start the Backend Server:**  
 Launch the backend server:

```bash
python backend.py

```

## Folder Structure 📂

```
Ratna-Supermarket/
├── client/ # React frontend application
│   ├── src/ # React components and files
│   ├── public/ # Public static files
│   ├── package.json # Frontend dependencies
│   └── vite.config.js # Vite configuration file
├── server/ # Backend Node.js application
│   ├── server.js # Main server file
│   ├── .env # Environment configuration (not included in repo)
│   ├── package.json # Backend dependencies
│   └── ... # Other backend files
├── README.md # This file
└── ...

```

<br>

## 📜 Contributing

We welcome contributions from the community! To contribute, please check out our [CONTRIBUTING.md](./CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) to understand the guidelines.

### Quick Guide:

1. Fork and clone the repository.
2. Create a new branch for your feature/bug fix.
3. Make your changes and test them.
4. Submit a pull request for review.

For more details, refer to the [CONTRIBUTING.md](./CONTRIBUTING.md) file.

---

## 🤝 Open Source Programs

This project is part of **GirlScript Summer of Code 2026** (GSSoC) Extended, an initiative to help aspiring developers get involved in the open-source community.
<br>
<img src="https://github.com/user-attachments/assets/f7abbbe7-1950-4bf9-8456-c812ca630acf" style="width:400px">

This project is also part of **Hacktoberfest 2026**. We encourage participants to contribute and improve the project during this event. Let’s make open source accessible and fun for everyone!

<br>
<img src="https://hacktoberfest.com/_next/static/media/logo-hacktoberfest-11--green.dd2bc4ca.svg" style="width:400px">

---

## Project Admin ⚡

<table align="center">
  <tr>
    <td align="center">
        <img src="https://res.cloudinary.com/dqv8dlj2s/image/upload/v1772276752/IMG_20251220_111730_cqlgfo.jpg" width="750" height="250" />
      </a>
      <h4>mwakidenis</h4>
    </td>
  </tr>
</table>

<div><h2><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Red%20Heart.png" width="35" height="35"> Contributors</h2></div>

We extend our heartfelt gratitude for your invaluable contribution to our project! Your efforts play a pivotal role in elevating G Mart-Supermarket to greater heights.

<p align="right"><a href="#top"><img src="https://img.shields.io/badge/Move%20to%20top-Blue?style=plastic" alt="Back To Top"></a></p>
