from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Tag(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    text = models.TextField()
    image = models.ImageField(upload_to='post_images/', default='default_images/default_post.jpg')
    video = models.FileField(upload_to='post_videos/', default='default_videos/default_video.mp4')
    created_date = models.DateTimeField(default=now)
    published_date = models.DateTimeField(blank=True, null=True)
    category = models.ForeignKey(Category, related_name='posts', on_delete=models.SET_NULL, null=True)
    tags = models.ManyToManyField(Tag, related_name='posts')

    def __str__(self):
        return self.title

class Comment(models.Model):
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    created_date = models.DateTimeField(default=now)

    def __str__(self):
        return f"Comment by {self.author.username} on {self.post.title}"

class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, related_name='likes', on_delete=models.CASCADE)
    created_date = models.DateTimeField(default=now)

    def __str__(self):
        return f"{self.user.username} liked {self.post.title}"
