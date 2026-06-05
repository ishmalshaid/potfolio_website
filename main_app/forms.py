from django import forms

from .models import ContactMessage


class ContactForm(forms.ModelForm):
    class Meta:
        model = ContactMessage
        fields = ["name", "email", "message"]
        widgets = {
            "name": forms.TextInput(
                attrs={
                    "class": "form-control glass-input",
                    "placeholder": "Your Name",
                    "required": True,
                }
            ),
            "email": forms.EmailInput(
                attrs={
                    "class": "form-control glass-input",
                    "placeholder": "your@email.com",
                    "required": True,
                }
            ),
            "message": forms.Textarea(
                attrs={
                    "class": "form-control glass-input",
                    "placeholder": "Your Message",
                    "rows": 5,
                    "required": True,
                }
            ),
        }
