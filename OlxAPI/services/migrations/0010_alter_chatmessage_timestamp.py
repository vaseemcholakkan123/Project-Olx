# Generated by Django 4.2 on 2023-06-26 12:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0009_alter_chatmessage_timestamp'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chatmessage',
            name='timestamp',
            field=models.DateTimeField(default='2023-06-26T18:15:56.664510'),
        ),
    ]
