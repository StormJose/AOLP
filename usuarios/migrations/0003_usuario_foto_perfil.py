# Generated by Django 4.2.13 on 2024-05-24 14:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0002_fotoperfil'),
    ]

    operations = [
        migrations.AddField(
            model_name='usuario',
            name='foto_perfil',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.SET_DEFAULT, to='usuarios.fotoperfil'),
        ),
    ]