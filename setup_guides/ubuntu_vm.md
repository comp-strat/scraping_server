## Linux (Ubuntu) Setup on a Virtual Machine
To set up Web-scraping Framework on a Linux/Ubuntu machine follow the below steps
### Installation and Setup
#### 1. Git Cloning
1.  Create and add your SSH key to the GitHub account that you want to use with the VM
2.  More information can be found [here](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)
3.  If you have not downloaded Byobu download it using instructions found [here](https://www.byobu.org/downloads)
4.  Open your Bash Terminal of choice eg. Git Bash
5.  Connect to the VM using the code ”ssh ussername@ip_address"   
6.  Clone scraping_server Git repo using
7.  `git clone scraping_server.git`
8.  Make sure that the github repo is the “CSV Upload” Branch with the below code
9.  `$ git branch -a`
10.  Check that the csv-upload branch is available
11.  `$ git checkout <feature_branch>`
12. `$ git branch`
1.  Open 3 terminal windows. Byobu use command `Ctrl-a —> c`  
#### 2. Redis Setup
1.  Setup and start Redis on the VM using the following code:
2. `sudo apt-get install redis-server`
3. ` sudo nano /etc/redis/redis.conf # change 'supervised no' to 'supervised systemd'`
`sudo systemctl restart redis.service`
4. `sudo systemctl status redis` # see if redis is actively running / Ctrl+C to escape Redis
`sudo nano /etc/redis/redis.conf`
`# uncomment the line: # bind 127.0.0.1 ::1`
9.  Restart Redis again if you made the previous change
10.  Run `sudo systemctl restart redis`
#### 3. Conda Installation:
1. Follow the below instructions from [digitalocean](https://www.digitalocean.com/community/tutorials/how-to-install-the-anaconda-python-distribution-on-ubuntu-22-04)
2.  Create a Conda environment named `wc-server` using Python 3.10   
3.  Run `conda create --name wc-server python=3.10`
4.  Activate the environment using `conda activate wc-server`
17.  In the scraping_server directory Install dependencies using `pip install -r requirements.txt`

#### 4. Setup Docket and MongoDB container
1. Make sure that [Mongodb](https://www.mongodb.com/docs/manual/administration/install-on-linux/) and Docker for [Ubuntu](https://docs.docker.com/engine/install/ubuntu/) or [Linux](https://docs.docker.com/desktop/install/linux-install/) are downloaded
2.  Run `mkdir mongodata`
`docker pull mongo && docker run -d --name mongodb -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=mdipass -p 27000:27017 --log-opt max-size=500m --restart always -v /vol_b/data/mongodata:/data/db mongo`
3.  Check for Environment variables and if they are not already added through Conda, add in the environment variables using the below code
`echo "CLIENT_ORIGIN=http://localhost:3000 MONGO_URI=mongodb://localhost:27000 SERVER_PORT=5000 REACT_APP_SERVER_URL=http://localhost:5000" | xargs conda env config vars set`
`echo "GOOGLE_OAUTH_CLIENT_ID=[980011737294-kriddo55g39bja7timpfk233lm83l8jl.apps.googleusercontent.com]" | xargs conda env config vars set`   
 
4.  `conda deactivate`
5.  `conda activate wc-server`
#### 5. Setup Node and NPM
1. Use the following code 
2.  `sudo npm --prefix ./client install`    
3.  `npm init`
4.  `sudo apt install webpack`
    
#### 6. Create three terminal screens: one for Redis, one for Flask, one for React
1.  **Redis Window**
2.  `rq worker crawling-tasks --path ./crawler`
3.  **Flask Window**
4.  `npm run dev::server`
5.  **React Window**
6. `npm run dev::webpack`
7. Current Project Breaking Error `Error: “webpack 5.69.1 compiled with 7 warnings in 4934 ms”`
    

### Troubleshooting
#### 1. Conda Environment
1.  Make sure your conda environment is activated on each of the screens
2.  You should see some indication that the conda env is activated like (wc-server)
    

#### 2. Settings: Make sure that your internal settings are correct
1.  Redis: make sure settings are correct
2.  Mongo: make sure password and username are aligned
3.  Docker: make sure you have the right mongo container running

#### 3. Webpack: Current project breaking error
1. There is an error when running `npm run dev::webpack`
7. The following errors appear  `Error: “webpack 5.69.1 compiled with 7 warnings in 4934 ms”`
