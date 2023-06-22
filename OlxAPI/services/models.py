from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.


# class ChatThread(models.Model):
#     first_person = models.ForeignKey(User,on_delete=models.CASCADE,null=True,blank=True)
#     second_person = models.ForeignKey(User,on_delete=models.CASCADE,null=True,blank=True)

#     updated = models.DateTimeField(auto_now=True)
#     time_stamp = models.DateTimeField(auto_now_add=True)

#     class Meta:
#         unique_together = ['first_person','second_person']


# class ChatMessage(models.Model):
#     thread = models.ForeignKey(ChatThread,null=True,blank=True,on_delete=models.CASCADE)
#     user = models.ForeignKey(User,on_delete=models.CASCADE)
#     message = models.TextField()
#     timestamp = models.DateTimeField(auto_now_add=True)