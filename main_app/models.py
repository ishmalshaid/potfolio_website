from django.db import models


class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to="projects/")
    tech_stack = models.CharField(
        max_length=500,
        help_text="Comma-separated technologies, e.g. Python, Django, GenAI",
    )
    github_link = models.URLField(blank=True)
    huggingface_link = models.URLField(
        blank=True,
        help_text="Hugging Face Space or model URL (e.g. https://huggingface.co/spaces/username/app)",
    )
    live_link = models.URLField(blank=True)
    is_featured = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["order", "-created_at"]

    def __str__(self):
        return self.title

    def get_tech_list(self):
        return [t.strip() for t in self.tech_stack.split(",") if t.strip()]


class Certificate(models.Model):
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to="certificates/")
    issuer = models.CharField(max_length=200, blank=True)
    issue_date = models.CharField(max_length=50, blank=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["order", "-created_at"]

    def __str__(self):
        return self.title


class ContactMessage(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} — {self.email}"
