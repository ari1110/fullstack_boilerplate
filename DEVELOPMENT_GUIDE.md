# Development Guide

This guide will help you get started with developing your application using this fullstack boilerplate. It provides an overview of the project structure, explains the purpose of key folders and files, and suggests where to begin your development work, including working with Google Authentication for both login and sign-up.

## Project Structure Overview

```
fullstack_boilerplate/
├── backend/
│   ├── fullstack_project/
│   ├── main_app/
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── GoogleLoginButton.js
│   │   ├── pages/
│   │   │   └── Login.js
│   │   └── features/
│   │       └── auth/
│   │           └── authSlice.js
│   ├── package.json
│   └── tailwind.config.js
├── docker-compose.yml
└── README.md
```

## Backend Development (Django)

The `backend/` directory contains your Django project. Here's what you need to know:

### Key Folders and Files

- `fullstack_project/`: This is the main Django project folder.
  - `settings.py`: Configure your Django settings here, including Google Authentication settings.
  - `urls.py`: Define your main URL patterns here.

- `main_app/`: This is your main Django app.
  - `models.py`: Define your database models here.
  - `views.py`: Create your view functions or classes here.
  - `serializers.py`: Define your DRF serializers here (if using Django REST Framework).
  - `schema.py`: Define your GraphQL schema here (using Graphene).

- `manage.py`: Django's command-line utility for administrative tasks.

### Where to Start

1. Define your data models in `main_app/models.py`.
2. Create migrations: `python manage.py makemigrations`
3. Apply migrations: `python manage.py migrate`
4. Define your GraphQL schema in `main_app/schema.py`.
5. Add any necessary URL patterns in `fullstack_project/urls.py`.
6. Configure Google Authentication in `fullstack_project/settings.py`.

## Frontend Development (React)

The `frontend/` directory contains your React application. Here's what you need to know:

### Key Folders and Files

- `src/`: This is where most of your development will happen.
  - `components/`: Create reusable React components here.
    - `GoogleLoginButton.js`: Component for Google login functionality.
  - `pages/`: Create your main page components here.
    - `Login.js`: Login and sign-up page component.
  - `features/`: Contains Redux slices for state management.
    - `auth/`: Contains authentication-related Redux logic.
      - `authSlice.js`: Redux slice for managing authentication state.
  - `App.js`: The main React component with routing setup.
  - `index.js`: The entry point of your React app.

- `public/`: Contains the HTML file and other static assets.

- `package.json`: Defines project dependencies and scripts.

### Where to Start

1. Start by creating new components in the `src/components/` directory.
2. Create new pages in the `src/pages/` directory.
3. Set up routing in `App.js` to navigate between your pages.
4. Use the `src/features/` directory to manage state with Redux.
5. Update `src/index.js` if you need to wrap your app with additional providers.
6. Implement Google Authentication using the `GoogleLoginButton` component and `authSlice`.

## Connecting Frontend to Backend

- Use Apollo Client in your React components to make GraphQL queries to your Django backend.
- Update the API URL in your frontend configuration to point to your Django server.
- Ensure that Google Authentication is properly configured on both frontend and backend.

## Working with Google Authentication

### Backend (Django)

1. Ensure django-allauth is installed and added to INSTALLED_APPS in `settings.py`.
2. Configure the Google provider in `settings.py`:

   ```python
   SOCIALACCOUNT_PROVIDERS = {
       'google': {
           'SCOPE': [
               'profile',
               'email',
           ],
           'AUTH_PARAMS': {
               'access_type': 'online',
           }
       }
   }
   ```

3. Set up the Google OAuth application in the Django admin panel (see DETAILED_SETUP.md for instructions).

### Frontend (React)

1. Use the `GoogleLoginButton` component in your Login page.
2. The `GoogleLoginButton` component will redirect to the django-allauth Google login URL.
3. Use the `checkAuthStatus` action from `authSlice` to verify the user's authentication state.
4. Handle the authentication state in your components using the Redux store.

Example usage in Login.js:

```jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import GoogleLoginButton from '../components/GoogleLoginButton';

const Login = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="login-page">
      <h1>Login or Sign Up</h1>
      <p>Use your Google account to log in or sign up automatically:</p>
      <GoogleLoginButton />
      <p className="mt-4 text-sm text-gray-600">
        By logging in with Google, you'll be automatically registered if you're a new user.
      </p>
    </div>
  );
};

export default Login;
```

This Login component handles both login and sign-up processes. When a user clicks the Google login button:
- If the user already has an account, they will be logged in.
- If the user is new, an account will be automatically created, and they will be logged in.

Example usage in App.js:

```jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuthStatus, logout } from './features/auth/authSlice';
import Login from './pages/Login';

function App() {
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        {isAuthenticated ? (
          <>
            <p>Welcome, {user.username || user.email}!</p>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Navigate to="/login" replace />
        )}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
```

## Development Workflow

1. Start your Django development server:
   ```
   cd backend
   python manage.py runserver
   ```

2. In a new terminal, start your React development server:
   ```
   cd frontend
   npm start
   ```

3. Access your frontend at `http://localhost:3000` and your backend at `http://localhost:8000`.

4. As you develop, your changes to the frontend will automatically reload in the browser.

5. For backend changes, you may need to restart the Django server.

## Using Docker

If you're using Docker for development:

1. Make changes to your code as needed.
2. Rebuild and restart your containers:
   ```
   docker-compose up --build
   ```

## Next Steps

- Implement additional authentication methods if needed.
- Set up WebSocket communication for real-time features using Django Channels.
- Implement your core application features, creating new models, components, and pages as needed.
- Write tests for both your backend (using Django's test framework) and frontend (using Jest and React Testing Library).

Remember to consult the official documentation for [Django](https://docs.djangoproject.com/), [React](https://reactjs.org/docs/getting-started.html), [django-allauth](https://django-allauth.readthedocs.io/en/latest/), and other libraries you're using in your development process.