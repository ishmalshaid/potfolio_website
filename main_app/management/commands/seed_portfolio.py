from django.core.files import File
from django.core.management.base import BaseCommand
from pathlib import Path

from main_app.models import Certificate, Project

BASE_DIR = Path(__file__).resolve().parents[3]
STATIC_IMAGES = BASE_DIR / "static" / "images"


class Command(BaseCommand):
    help = "Seed initial projects and sample certificate placeholders"

    def handle(self, *args, **options):
        projects_data = [
            {
                "title": "AI Career Readiness System",
                "description": (
                    "An intelligent career readiness platform powered by GenAI that "
                    "analyzes skills gaps, recommends learning paths, and generates "
                    "personalized interview preparation using NLP and machine learning."
                ),
                "tech_stack": "Python, Django, GenAI, Streamlit, Pandas, SQL",
                "huggingface_link": "",
                "github_link": "https://github.com",
                "live_link": "",
                "image": "project-ai-career.svg",
                "order": 1,
            },
            {
                "title": "Business Analytics Dashboard",
                "description": (
                    "Interactive business intelligence dashboard with KPI tracking, "
                    "revenue forecasting, and dynamic visualizations built for "
                    "executive decision-making using Power BI and Python analytics."
                ),
                "tech_stack": "Python, Power BI, Pandas, Plotly, Excel, SQL",
                "huggingface_link": "",
                "github_link": "https://github.com",
                "live_link": "",
                "image": "project-analytics.svg",
                "order": 2,
            },
        ]

        for data in projects_data:
            image_name = data.pop("image")
            image_path = STATIC_IMAGES / image_name
            if not image_path.exists():
                self.stdout.write(self.style.WARNING(f"Skip missing image: {image_path}"))
                continue
            project, created = Project.objects.get_or_create(
                title=data["title"],
                defaults=data,
            )
            if created or not project.image:
                with open(image_path, "rb") as f:
                    project.image.save(image_name, File(f), save=True)
                self.stdout.write(self.style.SUCCESS(f"Project: {project.title}"))

        cert_path = STATIC_IMAGES / "cert-placeholder.svg"
        if cert_path.exists():
            cert, created = Certificate.objects.get_or_create(
                title="Professional Certificate",
                defaults={"issuer": "Industry Certification", "issue_date": "2025"},
            )
            if created or not cert.image:
                with open(cert_path, "rb") as f:
                    cert.image.save("cert-placeholder.svg", File(f), save=True)
                self.stdout.write(self.style.SUCCESS("Certificate seeded"))

        self.stdout.write(self.style.SUCCESS("Seed complete. Add more via Django admin."))
