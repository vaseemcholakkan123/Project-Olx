# Generated by Django 4.2 on 2023-05-11 17:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('OLX', '0002_alter_olxuser_email'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ad_images',
            name='test',
        ),
    ]
