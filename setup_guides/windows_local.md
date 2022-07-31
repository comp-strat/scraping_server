## Windows Local Setup for Crawl4All

### Installation and Settings
1.  Install MongoDB
2.  Go to MongoDB website and install [MongoDB](https://docs.mongodb.com/manual/installation/)
3.  Choose Community Version
4.  Create the directory `data/db` on your base computer directory
5.  In a Bash Terminal run code to set up [conda](https://docs.anaconda.com/anaconda-repository/admin-guide/install/config/config-mongodb-authentication/)
6.  Install Docker
7.  Go to Docker website and install the appropriate [Docker](https://docs.docker.com/desktop/windows/install/) for you system
8.  Make sure that you have set up the WSL2 backend: more [info](https://docs.docker.com/desktop/windows/wsl/)
9.  Open Docker Desktop and ensure Docker engine is running
10.  Install Windows Ubuntu 
11.  Install Redis
12.  On Windows Ubuntu Version run `sudo apt-get install redis-server` to download Redis
13.  On Windows Ubuntu Version run `sudo service redis-server start` to start Redis server
14.  Clone the scraping_server GitHub repo
15.  Navigate to comp-[strat/scraping_server](https://github.com/comp-strat/scraping_server) on Github and choose branches
16.  Choose CSV-upload branch
17.  Clone the CSV-upload branch using `git clone "url for csv-upload cloning"`
18.  Change Mongo DB username and password
19.  Go to `/web_scraping/scrapy/schools/schools/settings.py` directory
20.  Change the following lines for running locally
21.  `'schools.pipelines.MongoDBPipeline': 300 # running with Docker and containers MONGO_URI = 'mongodb://mongodb_container:27017' MONGO_DATABASE = 'schoolSpider' # database (not collection) name MONGO_USERNAME = '<username>' # Replace with actual username MONGO_PASSWORD = '<password>' # Replace with actual password`

### Running the Scraping Server
1.  Open the Windows Ubuntu Version and run sudo service redis-server start to start Redis server
2.  Open Git Bash or an equivalent terminal
3.  Navigate to the `/scraping_server` directory on your machine
4.  Create and Activate a virtual environment using `conda create --name wc-server python=3.10`
5.  `conda activate wc-server`
6.  If Install packages using `pip install -r requirements.txt`
7.  Setup environment variables using the following code in Bash
8.  `echo "CLIENT_ORIGIN=http://localhost:3000 MONGO_URI=mongodb://localhost:27000 SERVER_PORT=5000 REACT_APP_SERVER_URL=http://localhost:5000" | xargs conda env config vars set`
9.  `conda deactivate`
10. `conda activate wc-server`
11.  Setup Flask Environment Variables using the following code
12.  `echo "FLASK_APP=server FLASK_ENV=development GOOGLE_OAUTH_CLIENT_ID=980011737294-kriddo55g39bja7timpfk233lm83l8jl.apps.googleusercontent.com DEBUG_NO_AUTH_ENABLED=True" | xargs conda env config vars set`
13.  `conda deactivate`
14.  `conda activate wc-server`
15.  Check Docker Desktop and check that “mongodb” container is activated or use the bash commands below to activate
16. `docker pull mongo`
17.  `docker run -p 27017:27017 --name mongodb mongo`
18.  Open three Bash Windows and run the following Code in each of the respective Windows
#### Window 1: Redis Window
1.  In Redis window:
2. Make sure the virtual environment is activated
3.  `cd crawler`
4.  `rq worker crawling-tasks --path ./crawler` # run Redis
#### Window 2: Flask window
1. In Flask window
2.  `npm run dev::server`
#### Window 3: React Window
1. In React Window
2.  `npm run dev::webpack # run React server`
3.  Navigate the client from your web browser at http://localhost:3000/

### Access and Check Data
1. Use the following directions to access, download, and check your data
2.  In the Docker Desktop make sure that the “mongodb” container is activated or use the bash commands
3.  `docker pull mongo`
4.  `docker run -p 27017:27017 --name mongodb mongo`
5.  Once the docker-compose command is finished exec into the mongodb_container using (on windows you may have to prefix that command with `winpty`)  
6. `docker exec -it mongodb_container bash`
7.  In the mongodb_container type `mongo` to activate the mongo shell
8.  Use the following code to set up a administrative user
9.  `use admin`
10.  `db.createUser({user:'siteUserAdmin', pwd: 'passwordprompt', roles:['userAdminAnyDatabase']})`
11.  `db.auth('siteUserAdmin', '<secure password #1>')`
12.  `db`
13.  You should see `admin` appear below the `db` command
14.  Use command `exit` to escape the mongo shell and `exit` again to escape the docker shell
15.  On your local device navigate to `/web_scraping/scrapy/schools/schools/` and run  `scrapy crawl schoolspider -a school_list=spiders/test_urls.csv -o schoolspider_output.json`
    
### Common Windows Errors
#### Redis Errors
1.  Depending on how you are attempting to set up Redis there can be errors that interrupt the running of the scraper, using the method detailed above worked for me but this could cause issues
   
#### MongoDb Fail to Connect
1.  This is the current issue that seems to stalling the running of the scraper.
2. PyMongo is failing to connect with MongoDb. **Any help on fixing this issue would be greatly appreciated.**

#### Failure to Download Python Packages
1. At times there was an error which required you to have the correct version of python downloaded.  We fixed by upgrading to Python 3.8
