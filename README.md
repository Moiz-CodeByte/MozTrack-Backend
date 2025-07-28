# MozTrack - A Project Management Web App

MozTrack is a project management tool designed to help you manage clients, projects, and timesheets seamlessly. To keep track of the working time of each project of each client.

---

## Project Structure
The project is organized as follows:
- **Backend**: Located in the `MozTrack-Backend` repo, built with MongoDB, Express.js, and Node.js. 
- **Frontend**: Located in the `MozTrack` repo, developed using TypeScript, Bootstrap, and Next.js.
     link : https://github.com/Moiz-CodeByte/MozTrack.git

---

## Features
- **Client Management**: Add, update and delete clients.
- **Project Management**: Track, update, and manage projects effectively.
- **Timesheet Tracking**: Monitor and log time efficiently for better productivity and to lkeep track of working time.

---

## How to Run the Project

### Prerequisites
- Ensure you have Node.js and npm installed.
- MongoDB should be installed and running on your system.

### Backend Setup (Local Development)
1. Git clone the backend of MozTrack
   ```bash
   git clone https://github.com/Moiz-CodeByte/MozTrack-Backend.git
   ```
2. Navigate to the backend folder:
   
   ```bash
   cd MozTrack-Backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory with the following variables:
   ```
   MONGO_URI=mongodb://localhost:27017/MozTrack
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```
5. Start the backend server:
   ```bash
   npm run dev
   ```
   By default, the server runs on `http://localhost:5000`.

### Production Deployment (Heroku)

For detailed instructions on deploying the backend to Heroku, please refer to the [Heroku Deployment Guide](./HEROKU_DEPLOYMENT.md).

Quick deployment steps:

1. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
2. Login to Heroku:
   ```bash
   heroku login
   ```
3. Create a new Heroku app:
   ```bash
   heroku create your-app-name
   ```
4. Set environment variables:
   ```bash
   heroku config:set MONGO_URI="your_mongodb_atlas_connection_string" --app your-app-name
   heroku config:set JWT_SECRET="your_jwt_secret" --app your-app-name
   heroku config:set NODE_ENV="production" --app your-app-name
   heroku config:set FRONTEND_URL="https://your-frontend-url.com" --app your-app-name
   ```
5. Deploy to Heroku:
   ```bash
   git push heroku master
   ```

Alternatively, you can use the provided deployment scripts:
- For Windows: `deploy-heroku.bat`
- For Linux/Mac: `deploy-heroku.sh`

---

### Frontend Setup
1. Git clone the frontend of MozTrack
   ```bash
   git clone https://github.com/Moiz-CodeByte/MozTrack.git
   ```   
2. Navigate to the main directory of repo
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:3000`.

---

## Technology Stack
### Backend:
- MongoDB
- Express.js
- Node.js

### Frontend:
- TypeScript
- Bootstrap
- Next.js

## Contributing
Contributions are welcome! If you have any ideas, suggestions, or improvements, feel free to create a pull request or open an issue.

### Steps to Contribute
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

## License
This project is open-source and available under the [MIT License](LICENSE).


For any questions or support, please contact at [hello@abdulmoiz.net](mailto:hello@abdulmoiz.net).

---


