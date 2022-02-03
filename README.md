# Scraping Server
This codebase provides a scalable, robust web-crawling pipeline applicable across web designs and accessible for researchers with minimal computational skills. It uses a versatile, scalable architecture built around Python's scrapy module.


## Description
When it comes to data collection, web-crawling (i.e., web-scraping, screen-scraping) is a common approach in our increasingly digital era--and a common stumbling block. With such a wide range of tools and languages available (Selenium, Requests, and HTML, to name just a few), developing and implementing a web-crawling pipeline is often a frustrating experience for researchers--especially those without a computer science background. There is a pressing need for a universal web-crawling pipeline able to scrape text and objects across website formats and research objectives. 

This repo provides such a pipeline (in Python) applicable across web designs and accessible for researchers with minimal computational skills. Our method involves using Scrapy spiders on virtual machines (VMs) to recursively gather website links (to a given depth), collect and parse items (text, images, PDFs, and .docs) using BeautifulSoup and textract, and saving them to MongoDB. The spiders are coordinated using a big data architecture (with multiple containers) consisting of Redis and Flask (crawler management), React (front-end), and MongoDB (database management). 

We will test the architecture by crawling all 100,000 or so U.S. school websites. Crawling school websites could spawn a new era of educational research, following the lead of a seminal paper that downloaded and analyzed the websites of all charter schools (https://bit.ly/BIDS-post-2020). New directions in such work include studies of school curricula, race and class segregation, and disciplinary regimes.

Downstream features on our bucket list include real-time metrics and access to scraped data, error checks and backup scrapers (including the simple wget algorithm), and toggles for capturing data over time with the Internet Archive. 


## Running the scraping server (Ubuntu)
This requires a Redis server to handle tasks. The instructions below walk you through installing Redis, and [you can find more instructions here](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-redis-on-ubuntu-18-04) (Ubuntu 18.04). If not yet installed, you will also need to [install MongoDB](https://docs.mongodb.com/manual/installation/) (instructions below don't include this part). You will also need access to authorization credentials for Google Sign-In; [here are instructions to create these if you haven't used them before](https://developers.google.com/identity/sign-in/web/sign-in#create_authorization_credentials). 

You will need 3 terminal windows for this, although [there are ways to run Redis and/or Flask headless to remove this need](https://askubuntu.com/questions/106351/running-programs-in-the-background-from-terminal)--the easiest being to add an ampersand (`&`) after the command. If you choose to have separate terminal windows (best for monitoring purposes), create a window for Redis, Flask, and React.

### 1. Setup and start Redis on machine:
```bash
sudo apt-get install redis-server
sudo nano /etc/redis/redis.conf # change 'supervised no' to 'supervised systemd'
sudo systemctl restart redis.service
sudo systemctl status redis # see if redis is actively running
sudo nano /etc/redis/redis.conf 
# uncomment the line: # bind 127.0.0.1 ::1 
# Then restart Redis again if you made the previous change
sudo systemctl restart redis
```



### 2. Install required packages and setup 
Follow each of these steps from your *home directory* (which for our VMs this is `/vol_b/data/`).

#### 2A. Create python 3 environment and install packages
```bash
python3 -m venv .venv # create specific crawling environment with packages we want; feel free to use an env name other than `.venv`
source .venv/bin/activate # activate environment
sudo apt update # get latest version info
pip3 install -r requirements.txt
npm --prefix ./client install
```

#### 2B. Set up MongoDB container
When setting up MongoDB, for security we recommend using a custom username and password and forwarding to a different port like 27000. Bypassing these measures makes it likely that you will experience web hacks and attempts to blackmail you by compromising your data stored in Mongo. The code below offers a template for such security through several extensions on the basic command of `docker run mongo`. Be sure to also update [the scrapy settings.py file with your custom Mongo username and password](https://github.com/URAP-charter/scraping_server/blob/97c303d4f6455a51efe83f16c8d5a8daec272941/crawler/crawler/settings.py#L138-L140).
```bash
mkdir mongodata
docker pull mongo && docker run -d --name mongodb -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=mdipass -p 27000:27017 --log-opt max-size=500m --restart always -v /vol_b/data/mongodata:/data/db mongo
```
Description of relevant parameters, please update as appropriate:
- `-e MONGO_INITDB_ROOT_USERNAME=admin`: Set Mongo username to `admin`
- `-e MONGO_INITDB_ROOT_PASSWORD=mdipass`: Set Mongo password to `mdipass`
- `-p 27000:27017`: adjust MongoDB port to 27000
- `--log-opt max-size=500m`: Set maximum Mongo log size to 500 MB, to prevent overloading root drive
- `-v /vol_b/data/mongodata:/data/db`: Set custom volume for Mongo output; update `/vol_b/data/` with your own target drive

#### 2C. Set up user authorization with Google Sign-In
Replace the Client ID in [`client/src/server-config.js`](https://github.com/URAP-charter/scraping_server/blob/97c303d4f6455a51efe83f16c8d5a8daec272941/client/src/server-config.js#L5) and [`client/src/settings.py`](https://github.com/URAP-charter/scraping_server/blob/97c303d4f6455a51efe83f16c8d5a8daec272941/crawler/crawler/settings.py#L150) with your own ([how to create authorization credentials](https://developers.google.com/identity/sign-in/web/sign-in#create_authorization_credentials)). You can enable crawling requests from your IP addresses (if not `localhost`) as "Authorized Javascript Origins" with your Client ID on [the Google Console Credentials page](https://console.developers.google.com/apis/credentials). The current repo uses the Client ID created by [Jaren Haber, PhD](https://www.jarenhaber.com/), which will work for the purposes of testing and developing the crawling server. 


### 3. Run server
Create three terminal screens: one for Redis, one for Flask, one for React. From each window: 
- navigate to your home directory (in our VMs this is `/vol_b/data/`)
- activate the python environment you set up in 2A above (default `source .venv/bin/activate`)
- run one task per window as follows.

##### 3A. In Redis window (must be in venv):
```bash
cd crawler
rq worker crawling-tasks --path . # run Redis
```

#### 3B. In Flask window (must be in venv): 
```bash
export CLIENT_ORIGIN=http://localhost:3000
export MONGO_URI=mongodb://localhost:27000
export SERVER_PORT=5000
cd crawler/crawler
python app.py # run Flask
```
The environment variables guide the flask server. The values shown are the default values.
 - `CLIENT_ORIGIN` is the client it should accept requests from
 - `MONGO_URI` is where it should send database requests
 - `SERVER_PORT` is what port should the server run on

### 3C. In React window:
```bash
export REACT_APP_SERVER_URL=http://localhost:5000
cd client
npm start # run React server
```
The environment variable here, `REACT_APP_SERVER_URL`, is the address of the flask server, to which the React client should send server url requests.


### 4. Navigate the client from your web browser at `http://localhost:3000/`
This will open up the home page.

## Running the scraping server (macOS)

### 1. Homebrew and Conda
First, make sure you have both [Homebrew](https://brew.sh)
```bash
brew -v
```
and [Conda](https://docs.conda.io/projects/conda/en/latest/user-guide/install/macos.html#install-macos-silent) installed.
```bash
conda -V
```

### 2. Redis
To install Redis on Mac
```bash
brew install redis
```
and start the redis server using _brew service._
```bash
brew service start redis
```

### 3. Conda Environment
Create a Conda environment named `wc-server` using Python 3.10
```bash
conda create --name wc-server python=3.10 --file requirements.txt
```
Activate the environment
```bash
conda activate wc-server
```
Install dependencies using `pip`
```bash
pip install -r requirements.txt
```
Setup environment variables
```bash
echo "CLIENT_ORIGIN=http://localhost:3000 MONGO_URI=mongodb://localhost:27000 SERVER_PORT=5000 REACT_APP_SERVER_URL=http://localhost:5000" | xargs conda env config vars set
```

### 4. Docker
To install the Docker macOS App
```bash
brew install --cask docker
brew install docker-machine
```
In the project folder, create a folder called `mongodata`, we will use it as the mounting point of our docker container.
```bash
mkdir mongodata
```
Then we can spawn the docker instance using
```bash
docker pull mongo && docker run -d --name mongodb -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=mdipass -p 27000:27017 --log-opt max-size=500m --restart always -v $PWD/mongodata:/data/db mongo
```

### 5. Node modules
To install Node.js and NPM
```bash
brew install node
```
and install all the necessary node modules (such as React)
```bash
npm install
```

### 6. Set up user authorization with Google Sign-In
Replace the Client ID in [`client/src/server-config.js`](https://github.com/URAP-charter/scraping_server/blob/97c303d4f6455a51efe83f16c8d5a8daec272941/client/src/server-config.js#L5) and [`client/src/settings.py`](https://github.com/URAP-charter/scraping_server/blob/97c303d4f6455a51efe83f16c8d5a8daec272941/crawler/crawler/settings.py#L150) with your own ([how to create authorization credentials](https://developers.google.com/identity/sign-in/web/sign-in#create_authorization_credentials)). You can enable crawling requests from your IP addresses (if not `localhost`) as "Authorized Javascript Origins" with your Client ID on [the Google Console Credentials page](https://console.developers.google.com/apis/credentials). The current repo uses the Client ID created by [Jaren Haber, PhD](https://www.jarenhaber.com/), which will work for the purposes of testing and developing the crawling server.

### 7. Run Redis Queue, Flask, React Server
In three Terminal windows, navigate to the project folder and run the following commands.

Terminal 1:
```bash
conda activate wc-server
rq worker crawling-tasks --path ./crawler
```

Terminal 2:
```bash
conda activate wc-server
python ./crawler/crawler/app.py
```

Terminal 3:
```bash
conda activate wc-server
npm --prefix ./client start
```

At this point, you should be able to see the web interface running on [localhost:3000](http://localhost:3000)
