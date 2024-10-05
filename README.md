# Fullstack App Boilerplate

This is a boilerplate for a fullstack application using React, Redux, Django, and GraphQL.

## Quick Start

For detailed setup instructions, please refer to the [Setup Guide](SETUP.md).

For an even more detailed, beginner-friendly guide, check out our [Super Detailed Setup Guide](DETAILED_SETUP.md).

### Using Docker (Recommended)

1. Clone the repository
2. Copy `.env.example` files to `.env` in both `backend/` and `frontend/` directories
3. Update the `.env` files with your specific settings
4. Run `docker-compose up --build`
5. Apply database migrations: `docker-compose exec backend python manage.py migrate`
6. Access the application at `http://localhost:3000`

### Manual Setup

1. Clone the repository
2. Set up and configure the backend and frontend (see [Setup Guide](SETUP.md) for details)
3. Start the development servers:
   - Backend: `python manage.py runserver`
   - Frontend: `npm start`

## Development Guide

Once you have set up the project, refer to our [Development Guide](DEVELOPMENT_GUIDE.md) for instructions on:
- Understanding the project structure
- Where to start your development work
- The purpose of key folders and files
- Best practices for developing with this boilerplate

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
│   │   │   └── Footer.js
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
- Django AllAuth for authentication

### Database
- PostgreSQL with PostGIS extension for geospatial data support
  - Docker image: postgis/postgis:13-3.1
  - Default configuration (customizable via .env file):
    - Name: postgres
    - User: postgres
    - Password: postgres
    - Host: db
    - Port: 5432

### Caching and Message Broker
- Redis for caching and real-time communication

## Configuration

- The `.env` files in both `backend/` and `frontend/` directories contain all necessary configuration
- Update `backend/fullstack_project/settings.py` if you need to modify Django settings
- Update `frontend/src/config.js` if you need to modify frontend configuration
- The `.editorconfig` file ensures consistent coding styles across different editors

## Deployment

For detailed deployment instructions, please refer to our [Deployment Guide](DEPLOYMENT.md).

Here's a brief overview of deployment options:

- Frontend: 
  - Can be deployed to static hosting services like Vercel, Netlify, or AWS S3 + CloudFront
  - Requires updating environment variables to point to the production backend URL

- Backend: 
  - Can be deployed to cloud platforms like Heroku, AWS EC2, or DigitalOcean
  - Requires setting up a production-ready PostgreSQL database with PostGIS
  - Needs a Redis instance for caching and real-time features

- Database: 
  - For production, it's recommended to use a managed PostgreSQL service with PostGIS support, such as AWS RDS for PostgreSQL

- Redis: 
  - Can use managed Redis services like Redis Cloud or AWS ElastiCache

Remember to set up proper security measures, including SSL certificates, secure environment variables, and appropriate firewall rules.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.