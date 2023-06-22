# Generated by Django 4.2 on 2023-05-11 18:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('OLX', '0003_remove_ad_images_test'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='accessoryad',
            name='related_images',
        ),
        migrations.RemoveField(
            model_name='carsad',
            name='related_images',
        ),
        migrations.RemoveField(
            model_name='mobilead',
            name='related_images',
        ),
        migrations.RemoveField(
            model_name='propertyad',
            name='related_images',
        ),
        migrations.RemoveField(
            model_name='scooterad',
            name='related_images',
        ),
        migrations.AddField(
            model_name='accessoryad',
            name='related_images',
            field=models.ManyToManyField(to='OLX.ad_images'),
        ),
        migrations.AddField(
            model_name='carsad',
            name='related_images',
            field=models.ManyToManyField(to='OLX.ad_images'),
        ),
        migrations.AddField(
            model_name='mobilead',
            name='related_images',
            field=models.ManyToManyField(to='OLX.ad_images'),
        ),
        migrations.AddField(
            model_name='propertyad',
            name='related_images',
            field=models.ManyToManyField(to='OLX.ad_images'),
        ),
        migrations.AddField(
            model_name='scooterad',
            name='related_images',
            field=models.ManyToManyField(to='OLX.ad_images'),
        ),
    ]
