# Generated by Django 4.2 on 2023-06-26 05:23

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0002_alter_chatmessage_timestamp'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chatmessage',
            name='timestamp',
            field=models.DateTimeField(default=datetime.datetime(2023, 6, 26, 10, 53, 39, 725123)),
        ),
    ]