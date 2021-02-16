## Installation and Environment settings

**Check this [blog](https://www.valentinog.com/blog/drf/) for basic Django & React installation guidance**

Prepare and install the following first:

- Python
- Node.js
- npm

### Setting up Django (our backend)
1. Set up an virtual Python environment through `anaconda` or `venv` for the project
2. Activate your environment
3. Inside your environment, `pip install django djangorestframework`
4. `django-admin startproject crawler_visualization.`; after this your will see a new folder named `crawler_visualization` created, with a bunch of python files initialized inside it
5. `django-admin startapp <app_name>`; this step automatically initializes a starter-packet for you to build up one application; usually one application should only have one goal (i.e., serve as a frontend)
   1. To initializa a frontend, do `django-admin startapp frontend`
   2. For backend, do `django-admin startapp backend`
6. Update the `crawler_visualization/settings.py` by adding `'<app_name>.apps.<app_name>Config'` to the `INSTALLED_APPS`; this is usually the case except for React frontend; for React frontend you can directly add `'frontend'` to `INSTALLED_APPS` in `crawler_visualization/settings.py`
7. Create your model in `<app_name>/models.py`; this is a common data model; details about *data model* can be easily found here: [wikipedia](https://en.wikipedia.org/wiki/Data_model) 
8. To activate the defined model,
   1. use `python manage.py makemigrations <app_name>` to activate your model
   2. use `python manage.py migrate` to activate your database (by default it's using an internal database called `sqlite3`)
9. To manage data throughout the backend, we need the help of serializer; it can convert our defined data model into JSON format, which is easier to visualize in the frontend. Set up a new file called `serializers.py` under folder `backend`, and define your customized serializer there
10. We want manage the data through a restful-api. This part will also involve the serializer to transform the data between different formats. This part will be done in `backend/views.py` (Things defined here can be viewed as an implementation of the api). In the meantime we can ignore the `views.py` under the frontend folder, as the file there only serves the purpose of telling Django how to render the webpage
11. Create a new file called `urls.py` under the `backend` to define the form of api that we will observe while using the application (This part could be wrong; will be updated once we touch the routing part)
12. You also have to make sure that framework is aware of your previous definitions; go to `crawler_visualization/urls.py` and include the locations of your defined application urls there
13. Enable the `rest_framework` by adding this to `INSTALLED_APPS ` in `crawler_visualization/settings.py`
14. If everything is set, use `python manage.py runserver` to do sanity check

### Setting up React environment (our frontend)

#### React
1. We start by `django-admin startapp frontend`; note that the now application created here is for the frontend
2. We set up several new folders under the newly created `frontend`:
   1. `src\components`
   2. `static\frontend`
   3. `templates\frontend`
3. `cd frontend && npm init -y` to set up a javascript environment
4. Inside the frontend folder, install webpack and webpack cli, which are used to connect Django with React: `npm i webpack webpack-cli --save-dev`
5. Copy the following to `package.json`:
```
    "scripts": {
        "dev": "webpack --mode development --entry ./src/index.js --output-path ./static/frontend",
        "build": "webpack --mode production --entry ./src/index.js --output-path ./static/frontend"
    }
```
6. Install `babel` for transpiling our code:
```
    npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
```
7. Install React: `npm i react react-dom --save-dev`
8.  Create `.babelrc` and put the following inside it:
``` 
    {
        "presets": [
            "@babel/preset-env", "@babel/preset-react"
        ]
    }
```
9.  Create `webpack.config.js` and paste the following to it:
```
    module.exports = {
        module: {
            rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                loader: "babel-loader"
                }
            }
            ]
        }
    };
```
10. Create `views.py` under `frontend`, and paste the following:
```Python
from django.shortcuts import render

def index(request):
    return render(request, 'frontend/index.html')
```
11. Create a template in `frontend/templates/frontend/index.html` by paste the following:
``` HTML
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Django REST with React</title>
</head>
<body>
<div id="app">
    <!-- React will load here -->
</div>
</body>
{% load static %}
<script src="{% static "frontend/main.js" %}"></script>
</html>
```
12. Configure the new URL mapping to include the frontend in `Crawler_visualization/urls.py`:
``` Python
urlpatterns = [
    ...
    path('', include('frontend.urls')),
]
```
13. Create a new template in `frontend/urls.py` as we only define our urls in the backend:
``` Python
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
]
```
14. Enable the frontend application by add `'frontend'` to `INSTALLED_APPS` in `crawler_visualization/settings.py`, as has been mentioned above

#### Bootstrap (under React)

The official document can be reached by [link](https://react-bootstrap.github.io/)

1.  Install bootstrap for React project: `npm install react-bootstrap bootstrap`
2.  To enable webpack dealing with css, do:
    1.  `npm install --save-dev css-loader`; see this post [link](https://webpack.js.org/loaders/css-loader/) for further guidance of code modification
    2.  `npm install style-loader --save`

#### Material-UI

Follow the [official document](https://material-ui.com/getting-started/installation/) for installation.

1. Go into the frontend folder
2. Run `npm install @material-ui/core`
3. Run `npm install @material-ui/icons`

### Start the project

1. Start Django backend: `python manage.py runserver`
2. Compile everything under `frontend/src` to `static/frontend/main.js`, which is utilized to render the webpage, by doing the following:
    1.  go to the frontend folder;
    2.  run `npm run dev`
3. Access the local website: `http://127.0.0.1:8000/`