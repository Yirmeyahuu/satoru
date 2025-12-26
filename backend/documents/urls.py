from django.urls import path
from . import views

urlpatterns = [
    path('upload/', views.upload_document, name='upload-document'),
    path('', views.get_documents, name='get-documents'),
    path('<str:doc_id>/', views.get_document, name='get-document'),
    path('<str:doc_id>/delete/', views.delete_document, name='delete-document'),
]