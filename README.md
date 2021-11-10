# Scraping Server
This Repository accompanies https://github.com/URAP-charter/web_scraping as web interface. It provides a scalable, robust web-crawling pipeline applicable across web designs and accessible for researchers with minimal computational skills. It uses a versatile, scalable architecture built around Python's scrapy module.


## Description
When it comes to data collection, web-crawling (i.e., web-scraping, screen-scraping) is a common approach in our increasingly digital era--and a common stumbling block. With such a wide range of tools and languages available (Selenium, Requests, and HTML, to name just a few), developing and implementing a web-crawling pipeline is often a frustrating experience for researchers--especially those without a computer science background. There is a pressing need for a universal web-crawling pipeline able to scrape text and objects across website formats and research objectives. 

This repo provides such a pipeline (in Python) applicable across web designs and accessible for researchers with minimal computational skills. Our method involves using Scrapy spiders on virtual machines (VMs) to recursively gather website links (to a given depth), collect and parse items (text, images, PDFs, and .docs) using BeautifulSoup and textract, and saving them to MongoDB. The spiders are coordinated using a big data architecture (with multiple containers) consisting of Redis and Flask (crawler management), React (front-end), and MongoDB (database management). 

We will test the architecture by crawling all 100,000 or so U.S. school websites. Crawling school websites could spawn a new era of educational research, following the lead of a seminal paper that downloaded and analyzed the websites of all charter schools (https://bit.ly/BIDS-post-2020). New directions in such work include studies of school curricula, race and class segregation, and disciplinary regimes.

Downstream features on our bucket list include real-time metrics and access to scraped data, error checks and backup scrapers (including the simple wget algorithm), and toggles for capturing data over time with the Internet Archive. 


## Running the scraping server
This requires a Redis server to handle tasks. The instructions below walk you through installing Redis, and [you can find more instructions here](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-redis-on-ubuntu-18-04) (Ubuntu 18.04). If not yet installed, you will also need to [install MongoDB](https://docs.mongodb.com/manual/installation/) (instructions below don't include this part).

You will need at least 2 screens/terminals for this, although there may be a way to run Redis and/or Flask headless to remove this need. "Screen R" will be your screen for Redis, and "Screen F" will refer to your screen for Flask. 

### 1. Setup and start Redis on machine:
```bash
$ sudo apt-get install redis-server
$ sudo nano /etc/redis/redis.conf # change 'supervised no' to 'supervised systemd'
$ sudo systemctl restart redis.service
$ sudo systemctl status redis # see if redis is actively running
$ sudo nano /etc/redis/redis.conf 
# uncomment the line: # bind 127.0.0.1 ::1 
# Then restart Redis again if you made the previous change
$ sudo systemctl restart redis
```


### 2. Install required packages and setup 
(from HOME_DIR, assumed to be /vol_b/data/):

#### 2A. Create python 3 environment, install packages, clone repo
```bash
$ python3 -m venv .venv # create specific crawling environment with packages we want; feel free to use an env name other than `.venv`
$ source .venv/bin/activate # activate environment
$ sudo apt update # get latest version info
$ pip3 install -r requirements.txt # install packages we want. may need pandas as version 1.0.4
$ sudo git clone https://github.com/URAP-charter/scraping_server.git
```

#### 2B. Set up MongoDB container
```bash
$ mkdir mongodata
$ docker pull mongo && docker run -d --name mongodb -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=mdipass -p 27000:27017 --log-opt max-size=500m --restart always -v /vol_b/data/mongodata:/data/db mongo
```

#### 2C. Set up prerequisite node modules 
(this may be deprecated soon as node server is obsolete)
```bash
$ cd scraping_server/server
$ sudo npm install # optional: sudo npm install node-typescript mongoose
$ sudo npm run prod
```


### 3. Create two terminal screens: one screen R (for Redis) and one screen F (for Flask).  
From each window, navigate to your HOME_DIR (assumed to be /vol_b/data/), activate the python environment you set up in 2A above (default `source .venv/bin/activate`), and run one task per window as follows.

##### 3A. In screen R:
```bash
$ cd scraping_server
$ sudo rq worker crawling-tasks --path .
```

#### 3B. In screen F: 
Set Environment Variables to set the mongo URI to connect to, the port the flask server should run on and the React client it should accept requests from.
```bash
$ export CLIENT_ORIGIN=http://localhost:3000
$ export MONGO_URI=mongodb://localhost:27017
$ export SERVER_PORT=5000
```
These are the default values used, if no environment variables are set.

After configuring, you can now run the flask server:
```bash
$ cd scraping_server/crawler/crawler
$ python app.py
```
### 4. Run the client server (React Server):
In a new terminal window, navigate to the base repository path
Set the environment variable that will tell your client where your flask server is running.
```bash
$ export REACT_APP_SERVER_URL=http://localhost:5000
```
As done before, the default value, if no environment variable is set, is shown above.
Now you can run the react server, by simply running:
```bash
$ cd client
$ npm start
```

### 4. Navigate the client from your web browser at `http://<your_IP_here>:3000/`
This will open up the home page.
