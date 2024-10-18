from django.db import models

# Author model with name and bio fields
class Author(models.Model):
    name = models.CharField(max_length=100)  # Author's name
    bio = models.TextField()  # Short bio for the author

    def __str__(self):
        return self.name

# Book model linked to the Author model
class Book(models.Model):
    title = models.CharField(max_length=200)  # Title of the book
    author = models.ForeignKey(Author, on_delete=models.CASCADE)  # Link to Author
    description = models.TextField()  # Description of the book
    genre = models.CharField(max_length=100)  # Genre of the book
    published_date = models.DateField()  # Date the book was published
    rating = models.DecimalField(max_digits=3, decimal_places=2, null=True, blank=True)  # Book rating (optional)
    # image = models.ImageField(upload_to='book_images/', null=True, blank=True)  # Image field

    def __str__(self):
        return self.title
