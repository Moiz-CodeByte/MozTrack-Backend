# Deploying MozTrack Backend to Heroku

This guide provides step-by-step instructions for deploying the MozTrack Backend to Heroku.

## Prerequisites

1. [Heroku Account](https://signup.heroku.com/) - Create a free Heroku account if you don't have one
2. [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) - Install the Heroku Command Line Interface
3. [Git](https://git-scm.com/downloads) - Make sure Git is installed on your system

## Deployment Steps

### 1. Login to Heroku

Open your terminal and log in to Heroku:

```bash
heroku login
```

### 2. Create a Heroku App

Create a new Heroku application:

```bash
heroku create your-app-name
```

Replace `your-app-name` with your desired application name. This will be part of your application URL: `https://your-app-name.herokuapp.com`

### 3. Set Up MongoDB Atlas (Production Database)

1. Create a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account if you don't have one
2. Create a new cluster (the free tier is sufficient to start)
3. Create a database user with read and write permissions
4. Whitelist all IP addresses (0.0.0.0/0) for development purposes (you can restrict this later)
5. Get your MongoDB connection string from Atlas

### 4. Configure Environment Variables

Set the required environment variables on Heroku:

```bash
heroku config:set MONGO_URI="your_mongodb_atlas_connection_string" --app your-app-name
heroku config:set JWT_SECRET="your_jwt_secret" --app your-app-name
heroku config:set NODE_ENV="production" --app your-app-name
heroku config:set FRONTEND_URL="https://your-frontend-url.com" --app your-app-name
```

Replace the placeholder values with your actual values.

### 5. Deploy to Heroku

From your project's root directory:

```bash
# Initialize git if not already done
git init

# Add all files to git
git add .

# Commit changes
git commit -m "Initial Heroku deployment"

# Add Heroku remote
git remote add heroku https://git.heroku.com/your-app-name.git

# Push to Heroku
git push heroku master
```

### 6. Verify Deployment

Open your application in a browser:

```bash
heroku open --app your-app-name
```

Or visit `https://your-app-name.herokuapp.com` directly.

### 7. View Logs (if needed)

To view logs for troubleshooting:

```bash
heroku logs --tail --app your-app-name
```

## Updating Your Frontend

Update your frontend application to use the new Heroku backend URL:

1. In your frontend project, update the environment variable `NEXT_PUBLIC_API_URL` to point to your Heroku backend:
   ```
   NEXT_PUBLIC_API_URL=https://your-app-name.herokuapp.com/api
   ```

2. Rebuild and redeploy your frontend application.

## Additional Configuration

### Scaling Dynos

By default, Heroku deploys your app to a single web dyno. You can scale up if needed:

```bash
heroku ps:scale web=1:standard-1x --app your-app-name
```

### Enabling Automatic Deployments

You can set up automatic deployments from GitHub:

1. Go to your Heroku dashboard
2. Select your app
3. Go to the "Deploy" tab
4. Connect your GitHub repository
5. Enable automatic deploys from your main branch

## Troubleshooting

- **Application Error**: Check logs using `heroku logs --tail`
- **Database Connection Issues**: Verify your MongoDB Atlas connection string and network access settings
- **CORS Errors**: Ensure your FRONTEND_URL environment variable is set correctly