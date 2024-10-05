# Detailed Setup Guide

This guide provides step-by-step instructions to get the fullstack application up and running.

## Prerequisites

- Git
- Docker and Docker Compose (for Docker setup)
- Python 3.8+ (for manual setup)
- Node.js 14+ and npm (for manual setup)
- PostgreSQL 13+ with PostGIS extension (for manual setup)
- Redis (for manual setup)

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

7. The application should now be running at:
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

10. Open `frontend/.env` in a text editor and update the following variable:
    - Set `REACT_APP_MAPBOX_ACCESS_TOKEN` to your Mapbox access token

11. Start the React development server:
    ```
    npm start
    ```

12. The application should now be running at:
    - Frontend: http://localhost:3000
    - Backend API: http://localhost:8000
    - Django Admin: http://localhost:8000/admin

## Verifying the Setup

1. Open http://localhost:3000 in your web browser. You should see the React frontend.
2. Open http://localhost:8000/admin in your web browser and log in with the superuser credentials you created. You should see the Django admin interface.
3. Test the API by opening http://localhost:8000/graphql in your web browser. You should see the GraphiQL interface.

## Troubleshooting

- If you encounter any issues with dependencies, try removing the `node_modules` folder and `package-lock.json` file in the frontend directory, then run `npm install` again.
- For database connection issues, make sure your PostgreSQL server is running and the connection details in `backend/.env` are correct.
- If you have issues with Redis, ensure the Redis server is running and the `REDIS_URL` in `backend/.env` is correct.
- For any other issues, check the console output for error messages and refer to the documentation of the specific tools or libraries mentioned in the error.