# Generated by Django 5.0 on 2024-06-07 03:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('estacoes', '0002_aula'),
    ]

    operations = [
        migrations.RenameField(
            model_name='aula',
            old_name='video',
            new_name='url',
        ),
        migrations.AddField(
            model_name='aula',
            name='url_id',
            field=models.CharField(blank=True, max_length=11, null=True),
        ),
    ]