# Crawler Visualization

## Installation and Environment settings

Prepare the following first:

- Python
- Node.js

### Setting up Django (our backend)
1. Set up an virtual Python environment through `anaconda` or `venv` for the project
2. Activate your environment
3. `pip install django djangorestframework`
4. `django-admin startproject <project_name> .`; after this your will see a new folder named `<project_name>` created, with a bunch of python files initialized
5. `django-admin startapp <app_name>`; this step automatically initializes a starter-packet for you to build up one application; usually one application should only have one goal
6. Update the `<project_name>/settings.py` by adding `<app_name>.apps.<app_name>Config` to the `INSTALLED_APPS`
7. Create your model in `<app_name>/models.py`; this is a common data model
8. To activate the defined model,
   1. use `python manage.py makemigrations <app_name>` to activate your model
   2. use `python manage.py migrate` to activate your database (by default it's using an internal database)
9. To manage data through database (and JSON), we need the help of serializer; it can convert our defined data model into JSON format, which is easy to visualize in the frontend. Set up a new file called `serializers.py` under folder `<app_name>`, and define your customized serializer there
10. We want manage the data through a restful-api. This part will also involve the serializer to transform the data between different format. This part will be done in `<app_name>/views.py` (Things defined here can be viewed as an implementation of the api)
11. Create a new file called `urls.py` under the `<app_name>` to define the form of api that we will observe while using the application
12. You also have to make sure that framework is aware of your previous definitions; go to `<project_name>/urls.py` and include the locations of your defined application urls there
13. Enable the `rest_framework` by adding this to `INSTALLED_APPS ` in `<project_name>/settings.py`
14. If everything is set, use `python manage.py runserver` to do sanity check

### Setting up React (our frontend)
1. We start by `django-admin startapp <app_name>`; note that the now application created here is for the frontend
2. We set up several new folders under the newly created `<app_name>`:
   1. `src\components`
   2. `static\<app_name>`
   3. `templates\<app_name>`
3. `cd <app_name> && npm init -y` to set up javascript environment
4. 