# Super Detailed Setup Guide

This guide will walk you through setting up the fullstack application, including Google Authentication, explaining each step in simple terms. We'll focus on the Docker setup as it's easier for beginners.

## What You Need Before Starting

1. A computer with Windows, Mac, or Linux
2. Internet connection
3. A Google account
4. About 45 minutes of free time

## Step 1: Install Required Software

### Install Git

Git helps you download the project files.

1. Go to https://git-scm.com/downloads
2. Download the version for your computer (Windows, Mac, or Linux)
3. Install it by following the installation wizard (click "Next" until it's done)

### Install Docker

Docker helps you run the application without installing lots of other stuff.

1. Go to https://www.docker.com/products/docker-desktop
2. Download Docker Desktop for your computer
3. Install it by following the installation wizard
4. After installation, start Docker Desktop

## Step 2: Get the Project Files

1. Open a program called "Terminal" (on Mac or Linux) or "Command Prompt" (on Windows)
2. Type this command and press Enter:
   ```
   git clone https://github.com/yourusername/fullstack_boilerplate.git
   ```
3. Type this command and press Enter:
   ```
   cd fullstack_boilerplate
   ```

## Step 3: Set Up the Project

1. We need to create two special files. Type these commands one at a time and press Enter after each:
   ```
   copy backend\.env.example backend\.env
   copy frontend\.env.example frontend\.env
   ```
   (If you're on Mac or Linux, use `cp` instead of `copy`)

2. Now we need to edit these files. Type this command and press Enter:
   ```
   notepad backend\.env
   ```
   (If you're on Mac, use `open -e backend/.env` instead)

3. In the file that opens:
   - Find the line that says `SECRET_KEY=your-secret-key-here`
   - Change `your-secret-key-here` to a random string of letters and numbers (like `djf83hf93hf93`)
   - Find the line that says `MAPBOX_ACCESS_TOKEN=your-mapbox-access-token`
   - If you have a Mapbox account, replace `your-mapbox-access-token` with your actual token
   - If you don't have a Mapbox account, you can leave it as is for now
   - Find these lines and change them if you want (but it's okay to leave them as they are):
     ```
     POSTGRES_DB=postgres
     POSTGRES_USER=postgres
     POSTGRES_PASSWORD=postgres
     ```
   - Save the file and close it

4. Now let's edit the frontend file. Type this command and press Enter:
   ```
   notepad frontend\.env
   ```
   (If you're on Mac, use `open -e frontend/.env` instead)

5. In the file that opens:
   - Find the line that says `REACT_APP_MAPBOX_ACCESS_TOKEN=your-mapbox-access-token`
   - If you have a Mapbox account, replace `your-mapbox-access-token` with your actual token
   - If you don't have a Mapbox account, you can leave it as is for now
   - We'll add the Google Client ID later
   - Save the file and close it

## Step 4: Start the Application

1. Make sure Docker Desktop is running
2. In your Terminal or Command Prompt, type this command and press Enter:
   ```
   docker-compose up --build
   ```
3. Wait patiently. This step might take a while (5-10 minutes) the first time you do it.
4. You'll see a lot of text scrolling by. This is normal! When you see something like "frontend_1  | Compiled successfully!" and "backend_1   | Quit the server with CONTROL-C.", it means everything is ready.

## Step 5: Set Up the Database

1. Open a new Terminal or Command Prompt window (keep the old one running!)
2. Type this command and press Enter:
   ```
   cd fullstack_boilerplate
   ```
3. Then type this command and press Enter:
   ```
   docker-compose exec backend python manage.py migrate
   ```
4. Wait until you see "Operations to perform:" and then "Apply all migrations: ..." followed by a list of things.

## Step 6: Create an Admin Account

1. In the same Terminal or Command Prompt window, type this command and press Enter:
   ```
   docker-compose exec backend python manage.py createsuperuser
   ```
2. It will ask you for a username. Type a username and press Enter.
3. It will ask for an email address. You can just press Enter to skip this.
4. It will ask for a password. Type a password and press Enter. Then type it again when it asks.

## Step 7: Set Up Google Authentication

1. Go to the Google Cloud Console (https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. In the sidebar, click on "APIs & Services" > "Credentials"
4. Click the "Create Credentials" button and select "OAuth client ID"
5. Choose "Web application" as the application type
6. Set the name to something like "My Fullstack App"
7. Under "Authorized JavaScript origins", add:
   ```
   http://localhost:3000
   ```
8. Under "Authorized redirect URIs", add:
   ```
   http://localhost:8000/accounts/google/login/callback/
   ```
9. Click "Create"
10. You'll see a popup with your Client ID and Client Secret. Keep this window open, we'll need these soon.

11. Go back to your Terminal or Command Prompt
12. Type this command and press Enter:
    ```
    notepad frontend\.env
    ```
    (If you're on Mac, use `open -e frontend/.env` instead)

13. Add this line to the file, replacing `your-google-client-id` with the Client ID from step 10:
    ```
    REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
    ```
14. Save and close the file

15. Now, let's set up the backend. In your web browser, go to:
    ```
    http://localhost:8000/admin
    ```
16. Log in with the superuser account you created in Step 6
17. In the admin panel, find "Sites" and click on it
18. Click on the existing site (probably named "example.com")
19. Change the "Domain name" to `localhost:8000`
20. Change the "Display name" to `My Fullstack App`
21. Click "Save"

22. Go back to the admin home page
23. Find "Social applications" and click on it
24. Click "Add social application" in the top right
25. Set the provider to "Google"
26. Set the name to "Google Login"
27. Enter the Client ID and Secret Key from step 10
28. In the "Sites" box, move "localhost:8000" to the "Chosen sites" box
29. Click "Save"

## Step 8: See Your Application!

1. Open your web browser (like Chrome, Firefox, or Safari)
2. In the address bar at the top, type `http://localhost:3000` and press Enter
3. You should see your application's frontend with a "Login with Google" button!
4. To see the admin panel, go to `http://localhost:8000/admin` and log in with the username and password you created in Step 6

## About the Database

This application uses a special type of database called PostgreSQL with PostGIS. PostGIS adds support for geographic objects, allowing you to store and query location data easily. Docker sets this up for you automatically, so you don't need to worry about installing PostgreSQL or PostGIS separately when using the Docker setup.

## Stopping the Application

When you're done:
1. Go back to the first Terminal or Command Prompt window
2. Press Ctrl+C on your keyboard
3. Wait for everything to stop
4. You can close the Terminal or Command Prompt windows now

## Starting the Application Again Later

1. Open Terminal or Command Prompt
2. Type `cd fullstack_boilerplate` and press Enter
3. Type `docker-compose up` and press Enter
4. Wait for everything to start
5. Go to `http://localhost:3000` in your web browser

Congratulations! You've set up and run your fullstack application with Google Authentication!