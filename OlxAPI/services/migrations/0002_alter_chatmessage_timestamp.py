# Generated by Django 4.2 on 2023-06-25 14:29

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chatmessage',
            name='timestamp',
            field=models.DateTimeField(default=datetime.datetime(2023, 6, 25, 19, 59, 36, 843170)),
        ),
    ]
