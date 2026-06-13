# Use python 3.11 slim image
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PORT=7860

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . /app/

# Create a non-root user (Hugging Face default UID is 1000)
RUN useradd -u 1000 user
RUN chown -R user:user /app

# Switch to the non-root user
USER user

# Collect static files
RUN python manage.py collectstatic --noinput

# Run migrations and start the application
CMD python manage.py migrate --noinput && gunicorn portfolio_project.wsgi:application --bind 0.0.0.0:7860
