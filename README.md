# Fullstack App Boilerplate

This is a boilerplate for a fullstack application using React, Redux, Django, and GraphQL, with Google Authentication.

## Quick Start

For detailed setup instructions, please refer to the [Setup Guide](SETUP.md).

For an even more detailed, beginner-friendly guide, check out our [Super Detailed Setup Guide](DETAILED_SETUP.md).

### Using Docker (Recommended)

1. Clone the repository
2. Copy `.env.example` files to `.env` in both `backend/` and `frontend/` directories
3. Update the `.env` files with your specific settings
4. Run `docker-compose up --build`
5. Apply database migrations: `docker-compose exec backend python manage.py migrate`
6. Set up Google OAuth (see [Setup Guide](SETUP.md) for details)
7. Access the application at `http://localhost:3000`

### Manual Setup

1. Clone the repository
2. Set up and configure the backend and frontend (see [Setup Guide](SETUP.md) for details)
3. Set up Google OAuth (see [Setup Guide](SETUP.md) for details)
4. Start the development servers:
   - Backend: `python manage.py runserver`
   - Frontend: `npm start`

## Development Guide

Once you have set up the project, refer to our [Development Guide](DEVELOPMENT_GUIDE.md) for instructions on:
- Understanding the project structure
- Where to start your development work
- The purpose of key folders and files
- Best practices for developing with this boilerplate
- Working with Google Authentication

This guide will help you get started with building your application using this fullstack boilerplate.

## Project Structure

```
fullstack_boilerplate/
├── backend/
│   ├── fullstack_project/
│   │   ├── settings.py
│   │   └── urls.py
│   ├── main_app/
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── schema.py
│   │   └── urls.py
│   ├── .env.example
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   ├── Footer.js
│   │   │   └── GoogleLoginButton.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   └── About.js
│   │   ├── features/
│   │   │   └── auth/
│   │   │       └── authSlice.js
│   │   └── App.js
│   ├── .env.example
│   ├── package.json
│   └── tailwind.config.js
├── docs/
├── scripts/
├── .editorconfig
├── .gitignore
├── docker-compose.yml
├── LICENSE
├── README.md
├── SETUP.md
├── DETAILED_SETUP.md
├── DEVELOPMENT_GUIDE.md
└── DEPLOYMENT.md
```

## Stack

### Frontend
- React.js with Redux for state management
- Socket.io (Client) for real-time updates
- Tailwind CSS for styling
- Mapbox GL JS for interactive maps
- Apollo Client for GraphQL integration

### Backend
- Django with Django Channels for real-time communication
- Playwright for web scraping (with Celery for background tasks)
- GraphQL (Graphene-Django) for API
- Django AllAuth for authentication (including Google OAuth)

### Database
- PostgreSQL with PostGIS extension for geospatial data support

### Caching and Message Broker
- Redis for caching and real-time communication

## Configuration

- The `.env` files in both `backend/` and `frontend/` directories contain all necessary configuration
- Update `backend/fullstack_project/settings.py` if you need to modify Django settings
- Update `frontend/src/config.js` if you need to modify frontend configuration
- The `.editorconfig` file ensures consistent coding styles across different editors

## Deployment

For detailed deployment instructions, please refer to our [Deployment Guide](DEPLOYMENT.md).

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.