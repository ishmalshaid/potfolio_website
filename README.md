# Ishmal Shahid — Premium AI Developer Portfolio

A modern, fully responsive Django portfolio with glassmorphism UI, AOS animations, dark/light mode, and Gmail contact integration.

## Tech Stack

- **Backend:** Django 5.1+
- **Frontend:** HTML5, CSS3, Bootstrap 5, JavaScript
- **Animations:** AOS + CSS transitions
- **Icons:** Font Awesome 6
- **Fonts:** Poppins & Inter (Google Fonts)

## Project Structure

```
portfolio_project/     # Django project settings & URLs
main_app/              # Models, views, forms, admin
templates/             # base.html, index.html
static/
  css/style.css
  js/main.js
  images/
media/                 # Uploaded projects & certificates
```

## Quick Start

### 1. Install dependencies

```bash
pip install -r requirements.txt
```

### 2. Environment variables

Copy `.env.example` to `.env` and configure:

```env
EMAIL_HOST_USER=your.email@gmail.com
EMAIL_HOST_PASSWORD=your-gmail-app-password
DEFAULT_FROM_EMAIL=your.email@gmail.com
CONTACT_RECIPIENT_EMAIL=ishishahid4@gmail.com
```

**Gmail setup:** Enable 2FA, then create an [App Password](https://myaccount.google.com/apppasswords).

### 3. Database & seed data

```bash
python manage.py migrate
python manage.py seed_portfolio
python manage.py createsuperuser
```

### 4. Run server

```bash
python manage.py runserver
```

Visit: http://127.0.0.1:8000/  
Admin: http://127.0.0.1:8000/admin/

## Admin Panel

Manage content dynamically:

- **Projects** — title, description, image, tech stack, GitHub/live links
- **Certificates** — title, image, issuer, date
- **Contact Messages** — view submissions from the contact form

## Contact Form

Submissions are saved to the database and emailed to `ishishahid4@gmail.com` via Gmail SMTP. A success toast appears after sending.

## Features

- Full-screen hero with typing animation & AI illustration
- About, Skills, Projects, Certificates, Experience, Achievements, Contact
- Dark / Light theme toggle (persisted in localStorage)
- Sticky glass navbar with active section highlighting
- Custom cursor, page loader, scroll-to-top
- Certificate modal zoom on click
- Vertical experience timeline

## Production Notes

- Set `DJANGO_DEBUG=False` and a strong `DJANGO_SECRET_KEY`
- Run `python manage.py collectstatic`
- Use a production WSGI server (gunicorn) and serve media via nginx/S3
- Never commit `.env` to version control
