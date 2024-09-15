from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.urls import reverse

from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm

def index(request):
    books = [
        {'id': 1, 'title': 'To Kill a Mockingbird', 'author': 'Harper Lee', 'description': 'A novel about racial injustice in the American South.'},
        {'id': 2, 'title': '1984', 'author': 'George Orwell', 'description': 'A dystopian novel about totalitarianism and surveillance.'},
        {'id': 3, 'title': 'Pride and Prejudice', 'author': 'Jane Austen', 'description': 'A romantic novel that critiques the British landed gentry at the end of the 18th century.'},
        {'id': 4, 'title': 'The Great Gatsby', 'author': 'F. Scott Fitzgerald', 'description': 'A novel set in the Jazz Age that explores themes of decadence and excess.'},
        {'id': 5, 'title': 'Moby-Dick', 'author': 'Herman Melville', 'description': 'A narrative of the adventures of the wandering sailor Ishmael and his voyage on the whaling ship Pequod.'},
        {'id': 6, 'title': 'War and Peace', 'author': 'Leo Tolstoy', 'description': 'A historical novel that chronicles the French invasion of Russia and its impact on Tsarist society.'},
        {'id': 7, 'title': 'The Catcher in the Rye', 'author': 'J.D. Salinger', 'description': 'A novel about the experiences of a disillusioned teenager, Holden Caulfield.'},
        {'id': 8, 'title': 'The Hobbit', 'author': 'J.R.R. Tolkien', 'description': 'A fantasy novel that follows the adventures of Bilbo Baggins as he helps a group of dwarves reclaim their homeland.'},
        {'id': 9, 'title': 'Jane Eyre', 'author': 'Charlotte Brontë', 'description': 'A novel about the hardships of an orphaned girl who becomes a governess and falls in love with her employer.'},
        {'id': 10, 'title': 'The Lord of the Rings', 'author': 'J.R.R. Tolkien', 'description': 'An epic fantasy trilogy that follows the quest to destroy the One Ring and defeat the Dark Lord Sauron.'},
    ]
    return render(request, 'book/index.html', {'books': books})

def detail(request, book_id):
    books = {
        1: {'title': 'To Kill a Mockingbird', 'author': 'Harper Lee', 'description': 'A novel about racial injustice in the American South.'},
        2: {'title': '1984', 'author': 'George Orwell', 'description': 'A dystopian novel about totalitarianism and surveillance.'},
        3: {'title': 'Pride and Prejudice', 'author': 'Jane Austen', 'description': 'A romantic novel that critiques the British landed gentry at the end of the 18th century.'},
        4: {'title': 'The Great Gatsby', 'author': 'F. Scott Fitzgerald', 'description': 'A novel set in the Jazz Age that explores themes of decadence and excess.'},
        5: {'title': 'Moby-Dick', 'author': 'Herman Melville', 'description': 'A narrative of the adventures of the wandering sailor Ishmael and his voyage on the whaling ship Pequod.'},
        6: {'title': 'War and Peace', 'author': 'Leo Tolstoy', 'description': 'A historical novel that chronicles the French invasion of Russia and its impact on Tsarist society.'},
        7: {'title': 'The Catcher in the Rye', 'author': 'J.D. Salinger', 'description': 'A novel about the experiences of a disillusioned teenager, Holden Caulfield.'},
        8: {'title': 'The Hobbit', 'author': 'J.R.R. Tolkien', 'description': 'A fantasy novel that follows the adventures of Bilbo Baggins as he helps a group of dwarves reclaim their homeland.'},
        9: {'title': 'Jane Eyre', 'author': 'Charlotte Brontë', 'description': 'A novel about the hardships of an orphaned girl who becomes a governess and falls in love with her employer.'},
        10: {'title': 'The Lord of the Rings', 'author': 'J.R.R. Tolkien', 'description': 'An epic fantasy trilogy that follows the quest to destroy the One Ring and defeat the Dark Lord Sauron.'},
    }
    book = books.get(book_id, None)
    return render(request, 'book/detail.html', {'book': book})


def old_url_req(request):
    # return redirect("new_url")
    ##using reverse function for dynamic routing
    return redirect(reverse("books:new_page_url"))

def new_url_view(request):
    return HttpResponse("This is the new url")

# Signup view
def signup_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')  # Redirect to login after successful signup
    else:
        form = UserCreationForm()
    return render(request, 'book/login.html', {'form': form})

# Login view
def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('books:index')  # Redirect to home after login
    else:
        form = AuthenticationForm()
    return render(request, 'book/signup.html', {'form': form})

# Logout view
def logout_view(request):
    logout(request)
    return redirect('login')

from django.shortcuts import render
from django.contrib.auth.decorators import login_required

# Profile view for the user
@login_required
def profile_view(request):
    # Pass the user information to the profile template
    return render(request, 'book/profile.html', {'username': request.user.username})
