from django.urls import path
from . import views

app_name = 'books'

urlpatterns = [
    # Book-related URLs
    path('', views.index, name='index'),
    path('books/<int:book_id>/', views.detail, name='detail'),
    path('new_example_url/', views.new_url_view, name='new_page_url'),
    path('old_url/', views.old_url_req, name='old_url'),
    
    # Authentication-related URLs
    path('signup/', views.signup_view, name='signup'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('profile/', views.profile_view, name='profile'),  # Profile page
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)