# Detailed Setup Guide

This guide provides step-by-step instructions to get the fullstack application up and running, including Google Authentication.

## Prerequisites

- Git
- Docker and Docker Compose (for Docker setup)
- Python 3.8+ (for manual setup)
- Node.js 14+ and npm (for manual setup)
- PostgreSQL 13+ with PostGIS extension (for manual setup)
- Redis (for manual setup)
- Google Cloud Console account (for Google Authentication)

## Docker Setup (Recommended)

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/fullstack_boilerplate.git
   cd fullstack_boilerplate
   ```

2. Copy the example environment files:
   ```
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```

3. Open `backend/.env` and `frontend/.env` in a text editor and update the following variables:
   - In `backend/.env`:
     - Set `SECRET_KEY` to a secure random string
     - Set `MAPBOX_ACCESS_TOKEN` to your Mapbox access token
     - Optionally, update the database settings:
       - POSTGRES_DB
       - POSTGRES_USER
       - POSTGRES_PASSWORD
   - In `frontend/.env`:
     - Set `REACT_APP_MAPBOX_ACCESS_TOKEN` to your Mapbox access token
     - Set `REACT_APP_GOOGLE_CLIENT_ID` to your Google OAuth client ID (see Google Authentication Setup below)

4. Build and start the Docker containers:
   ```
   docker-compose up --build
   ```

5. In a new terminal, apply database migrations:
   ```
   docker-compose exec backend python manage.py migrate
   ```

6. Create a superuser for the Django admin:
   ```
   docker-compose exec backend python manage.py createsuperuser
   ```

7. Set up Google Authentication (see Google Authentication Setup below)

8. The application should now be running at:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - Django Admin: http://localhost:8000/admin

## Manual Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/fullstack_boilerplate.git
   cd fullstack_boilerplate
   ```

2. Set up the backend:
   ```
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   pip install -r requirements.txt
   cp .env.example .env
   ```

3. Open `backend/.env` in a text editor and update the following variables:
   - Set `SECRET_KEY` to a secure random string
   - Set `MAPBOX_ACCESS_TOKEN` to your Mapbox access token
   - Update database credentials:
     - POSTGRES_DB
     - POSTGRES_USER
     - POSTGRES_PASSWORD
     - DB_HOST
     - DB_PORT

4. Set up the database:
   - Install PostgreSQL 13 or later
   - Install PostGIS extension for PostgreSQL
   - Create a new PostgreSQL database
   - Enable PostGIS for the new database:
     ```sql
     CREATE EXTENSION postgis;
     ```
   - Update the database connection details in `backend/.env`

5. Set up Redis:
   - Install and start Redis
   - Update the `REDIS_URL` in `backend/.env` if needed

6. Apply database migrations:
   ```
   python manage.py migrate
   ```

7. Create a superuser for the Django admin:
   ```
   python manage.py createsuperuser
   ```

8. Start the Django development server:
   ```
   python manage.py runserver
   ```

9. Set up the frontend:
   ```
   cd ../frontend
   npm install
   cp .env.example .env
   ```

10. Open `frontend/.env` in a text editor and update the following variables:
    - Set `REACT_APP_MAPBOX_ACCESS_TOKEN` to your Mapbox access token
    - Set `REACT_APP_GOOGLE_CLIENT_ID` to your Google OAuth client ID (see Google Authentication Setup below)

11. Start the React development server:
    ```
    npm start
    ```

12. Set up Google Authentication (see Google Authentication Setup below)

13. The application should now be running at:
    - Frontend: http://localhost:3000
    - Backend API: http://localhost:8000
    - Django Admin: http://localhost:8000/admin

## Google Authentication Setup

1. Set up Google OAuth 2.0 credentials:
   a. Go to the [Google Cloud Console](https://console.cloud.google.com/).
   b. Create a new project or select an existing one.
   c. Navigate to "APIs & Services" > "Credentials".
   d. Click "Create Credentials" and select "OAuth client ID".
   e. Choose "Web application" as the application type.
   f. Add authorized JavaScript origins (e.g., http://localhost:3000 for development).
   g. Add authorized redirect URIs (e.g., http://localhost:8000/accounts/google/login/callback/ for development).
   h. Note down the Client ID and Client Secret.

2. Add the Google OAuth credentials to your Django project:
   a. Go to the Django admin panel (http://localhost:8000/admin/).
   b. Navigate to "Sites" and update the domain name and display name for your site.
   c. Go to "Social Applications" and add a new social application.
   d. Choose "Google" as the provider.
   e. Enter a name for the application (e.g., "Google Login").
   f. Enter the Client ID and Secret Key from the Google Cloud Console.
   g. Select your site in the "Chosen sites" field.

3. Update your frontend environment variables:
   In the `frontend/.env` file, add or update the following:
   ```
   REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
   ```

4. Install necessary packages:
   In the backend directory, run:
   ```
   pip install django-allauth
   ```
   Update your `requirements.txt` file to include django-allauth.

   In the frontend directory, run:
   ```
   npm install axios
   ```

## Verifying the Setup

1. Open http://localhost:3000 in your web browser. You should see the React frontend with a Google Login button.
2. Open http://localhost:8000/admin in your web browser and log in with the superuser credentials you created. You should see the Django admin interface.
3. Test the API by opening http://localhost:8000/graphql in your web browser. You should see the GraphiQL interface.
4. Try logging in with Google on the frontend to verify that the Google Authentication is working correctly.

## Troubleshooting

- If you encounter any issues with dependencies, try removing the `node_modules` folder and `package-lock.json` file in the frontend directory, then run `npm install` again.
- For database connection issues, make sure your PostgreSQL server is running and the connection details in `backend/.env` are correct.
- If you have issues with Redis, ensure the Redis server is running and the `REDIS_URL` in `backend/.env` is correct.
- For Google Authentication issues, double-check your Google Cloud Console settings, ensure the correct Client ID is set in both backend and frontend, and verify that the redirect URIs are correct.
- For any other issues, check the console output for error messages and refer to the documentation of the specific tools or libraries mentioned in the error.