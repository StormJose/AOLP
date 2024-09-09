# Academy One Learning Platform (Em andamento)

## Instalação

Para instalar e inicializar o servidor local do projeto na sua máquina, siga os passos a seguir:

Clone o repositório

```

git clone https://github.com/Academy-One/AOLP.git

cd AOLP

```
<br>

Instale as dependências especificadas em requirements.txt:
```

pip install -r requirements.txt

```
<br>

Execute as migrações para criar as tabelas do banco de dados:

```
python manage.py migrate
```
<br>

Se você precisar acessar o admin do Django, crie um superusuário:
```
python manage.py createsuperuser
```
<br>

Inicialize o servidor de desenvolvimento:
```
python manage.py runserver
```
<br>
