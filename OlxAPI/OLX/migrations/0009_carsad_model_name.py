# Generated by Django 4.2 on 2023-05-12 10:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('OLX', '0008_carsad_km_driven'),
    ]

    operations = [
        migrations.AddField(
            model_name='carsad',
            name='model_name',
            field=models.CharField(default='', max_length=50),
            preserve_default=False,
        ),
    ]
