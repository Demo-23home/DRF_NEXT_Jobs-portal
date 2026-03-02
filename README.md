# 💼 Jobbee

A LinkedIn-like job portal with real-time job listings, location previews, and candidate applications. Built with Django REST Framework, Next.js, PostGIS, Docker, and fully documented APIs.

---

## 🚀 Project Overview

Jobbee is a full-stack web application that allows users to:

- Register, login, and manage profiles
- Post, search, filter, and paginate job listings
- Apply to jobs and upload resumes
- Preview job locations on a map
- List candidates for posted jobs
- Secure user authentication and authorization

The backend is Django REST Framework with PostGIS for geospatial queries, while the frontend uses Next.js for server-side rendering and dynamic client-side interactions.  

API documentation is available via **Redoc** and Swagger UI.

---

## 🧰 Tech Stack

- **Backend:** Django, Django REST Framework  
- **Frontend:** Next.js  
- **Database:** PostgreSQL with PostGIS extension  
- **Containerization:** Docker & Docker Compose  
- **API Documentation:** Swagger / Redoc  
- **Authentication:** Token-based / JWT  
- **CI/CD:** Dockerized pipeline for backend & frontend  

---

## 🏗️ Architecture Overview

```
DRF_NEXT_Jobs-portal/
├── client/          # Next.js frontend
├── core_apps/       # Django apps (account, job, utils)
│   ├── account/     # User & profile management
│   ├── job/         # Job CRUDs, applications, filters, stats
│   └── utils/       # Custom exception handlers & error views
├── config/          # Django project settings & urls
├── docker/          # Docker configs
├── staticfiles/     # Collected static files
├── manage.py
├── Makefile         # Commands for build, migrations, tests, etc.
├── Pipfile
└── requirements/
```

Key Architectural Features:

- Modular Django apps (account, job, utils)  
- PostGIS integration for location-based queries  
- Dockerized backend and frontend services  
- Environment-based settings and secure configuration  
- Automated API documentation  
- Separation of concerns between frontend and backend  

---

## 🔐 Authentication & Authorization

- Secure registration and login flows  
- Token-based authentication (JWT compatible)  
- User-specific data access for job listings, applications, and profiles  
- Protected routes on frontend with `isAuthenticated` checks  

---

## 📚 API Features

### 👤 Account APIs
- User registration & login  
- Update user profile & avatar  
- Get current authenticated user  

### 💼 Job APIs
- CRUD for job postings  
- Filter jobs by location, title, and other fields  
- Pagination & search  
- List candidates who applied for jobs  
- Apply to a job & upload resume  
- Track if a user already applied  

### 🌍 Location Features
- Job location stored with PostGIS points  
- Map preview in frontend using coordinates  

---

## 📖 API Documentation

The API documentation is exposed at the following endpoints:

- **Redoc UI:**  
```
/redoc/
```

- **Swagger/OpenAPI schema:**  
The schema is publicly available and includes contact and license info:

```python
schema_view = get_schema_view(
    openapi.Info(
        title="Jobbee",
        default_version="v1",
        description="This is a kickstart Project so you can clone it and use it as a reusable part in future projects to save time and ensure consistency.",
        contact=openapi.Contact("zeyadslama23@gmail.com"),
        license=openapi.License("MIT License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)
```

---

## 🧪 Testing

- Unit tests for models, views, and serializers  
- Custom exception and error handling tests  
- Tests for job applications and candidate listings  

Run tests via Docker:

```bash
make test
```

Or directly:

```bash
docker-compose run --rm app python manage.py test
```

---

## 🐳 Docker Setup

### Build services

```bash
make build
```

### Start development environment

```bash
make up
```

### Stop services

```bash
make down
```

### Rebuild without cache

```bash
make rebuild
```

---

## ⚙️ Development Workflow

- Apply migrations: `make migrate`  
- Create migrations: `make makemigrations`  
- Lint code: `make lint`  
- Open Django shell: `make django_shell`  

Frontend (Next.js) runs via Docker as well for consistent dev environment.  

---

## 🔄 CI/CD Pipeline

- Dockerized backend & frontend builds  

---

## 🔥 Production Features

- Modular architecture for scalability  
- Location-based job search with PostGIS  
- Secure file upload for resumes  
- Token-based authentication  
- Pagination, search, and filtering for large datasets  
- Dockerized services for consistent deployments  

---

## 📌 Future Improvements

- Add notifications for job applications  
- Integrate background tasks (Celery) for emails & processing  
- Implement full-text search for job listings  
- Add rate limiting and API throttling  
- Deploy using cloud provider (AWS / Render / DigitalOcean)  

---

## 👨‍💻 Author

**Zeyad**  
Backend Developer | Python & Django
