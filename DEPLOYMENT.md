# Deployment Guide

This guide provides instructions on how to deploy the fullstack application to a production environment. We'll cover deployment options for both the frontend and backend components.

## Frontend Deployment

The frontend can be deployed to static hosting services like Vercel, Netlify, or AWS S3 + CloudFront.

### Deploying to Vercel

1. Sign up for a Vercel account at https://vercel.com
2. Install the Vercel CLI:
   ```
   npm install -g vercel
   ```
3. Navigate to your frontend directory:
   ```
   cd frontend
   ```
4. Run the deployment command:
   ```
   vercel
   ```
5. Follow the prompts to link your project to Vercel
6. Once deployed, Vercel will provide you with a URL for your frontend

### Deploying to Netlify

1. Sign up for a Netlify account at https://www.netlify.com
2. Install the Netlify CLI:
   ```
   npm install -g netlify-cli
   ```
3. Navigate to your frontend directory:
   ```
   cd frontend
   ```
4. Build your React app:
   ```
   npm run build
   ```
5. Deploy to Netlify:
   ```
   netlify deploy --prod
   ```
6. Follow the prompts to complete the deployment
7. Netlify will provide you with a URL for your frontend

## Backend Deployment

The backend can be deployed to cloud platforms like Heroku, AWS EC2, or DigitalOcean.

### Deploying to Heroku

1. Sign up for a Heroku account at https://signup.heroku.com
2. Install the Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli
3. Login to Heroku:
   ```
   heroku login
   ```
4. Navigate to your project root directory
5. Create a new Heroku app:
   ```
   heroku create your-app-name
   ```
6. Add PostgreSQL addon with PostGIS:
   ```
   heroku addons:create heroku-postgresql:hobby-dev
   heroku pg:wait
   heroku pg:psql -c "CREATE EXTENSION postgis;"
   ```
7. Add Redis addon:
   ```
   heroku addons:create heroku-redis:hobby-dev
   ```
8. Set environment variables:
   ```
   heroku config:set SECRET_KEY=your_secret_key
   heroku config:set DEBUG=False
   heroku config:set ALLOWED_HOSTS=.herokuapp.com
   heroku config:set CORS_ALLOWED_ORIGINS=https://your-frontend-url.com
   ```
9. Deploy your code:
   ```
   git subtree push --prefix backend heroku main
   ```
10. Run migrations:
    ```
    heroku run python manage.py migrate
    ```
11. Create a superuser:
    ```
    heroku run python manage.py createsuperuser
    ```

## Database Deployment

For production, it's recommended to use a managed PostgreSQL service with PostGIS support.

### Using AWS RDS for PostgreSQL

1. Sign up for an AWS account if you haven't already
2. Navigate to RDS in the AWS Console
3. Click "Create database"
4. Choose "PostgreSQL" as the engine
5. Select the desired version (must be 10 or higher for PostGIS support)
6. Choose your instance size and storage
7. Set up your master username and password
8. In the "Additional configuration" section, enter your database name
9. In the "Additional configuration" section, under "Initial database name", enter your desired database name
10. Launch the database
11. Once the database is available, connect to it and enable PostGIS:
    ```sql
    CREATE EXTENSION postgis;
    ```
12. Update your backend `.env` file or environment variables with the new database connection details

## Connecting Frontend to Backend

After deploying both frontend and backend:

1. Update the frontend environment variables to point to your new backend URL
2. Rebuild and redeploy the frontend with the updated variables

## Setting Up a Domain Name

1. Purchase a domain name from a domain registrar (e.g., Namecheap, Google Domains)
2. Set up DNS records to point to your deployed frontend and backend
3. Update your backend `ALLOWED_HOSTS` and `CORS_ALLOWED_ORIGINS` settings with your new domain
4. Update your frontend environment variables with the new backend domain
5. Rebuild and redeploy the frontend

## Setting Up SSL

1. For Heroku, SSL is provided automatically for all *.herokuapp.com domains
2. For custom domains on Heroku, you can use the Heroku SSL feature (requires a paid plan)
3. For the frontend, if using Vercel or Netlify, SSL is provided automatically
4. If managing your own servers, you can use Let's Encrypt to obtain free SSL certificates

Remember to never commit sensitive information like API keys or passwords to your repository. Always use environment variables for such sensitive data.