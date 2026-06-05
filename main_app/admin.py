from django.contrib import admin

from .models import Certificate, ContactMessage, Project


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "is_featured", "order", "created_at")
    list_filter = ("is_featured",)
    search_fields = ("title", "description", "tech_stack")
    ordering = ("order",)
    fieldsets = (
        (None, {"fields": ("title", "description", "image", "tech_stack", "order", "is_featured")}),
        (
            "Links",
            {
                "fields": ("huggingface_link", "github_link", "live_link"),
                "description": "Hugging Face link shows with the 🤗 icon on the project card.",
            },
        ),
    )


@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ("title", "issuer", "order", "created_at")
    search_fields = ("title", "issuer")
    ordering = ("order",)


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "is_read", "created_at")
    list_filter = ("is_read",)
    search_fields = ("name", "email", "message")
    readonly_fields = ("name", "email", "message", "created_at")
    list_editable = ("is_read",)
