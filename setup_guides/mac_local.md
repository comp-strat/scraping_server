## Running the scraping server (macOS)

### 1. Installation and Setup
First, make sure you have both [Homebrew](https://brew.sh)
```bash
brew -v
```
and [Conda](https://docs.conda.io/projects/conda/en/latest/user-guide/install/macos.html#install-macos-silent) installed.
```bash
conda -V
```

### 2. Redis Installation
To install Redis on Mac
```bash
brew install redis
```
and start the redis server using _brew service._
```bash
brew services start redis
```

### 3. Conda Environment
Create a Conda environment named `wc-server` using Python 3.10
```bash
conda create --name wc-server python=3.10
```
Activate the environment
```bash
conda activate wc-server
```
### 4. Install dependencies using `pip`
```bash
pip install -r requirements.txt
```
### 5. Setup mongoDB and React environment variables
```bash
echo "CLIENT_ORIGIN=http://localhost:3000 MONGO_URI=mongodb://localhost:27000 SERVER_PORT=5000 REACT_APP_SERVER_URL=http://localhost:5000" | xargs conda env config vars set

conda deactivate
conda activate wc-server
```

### 6. Docker
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

### 7. Node modules
To install Node.js and NPM
```bash
brew install node
```
and install all the necessary node modules (such as React)
```bash
npm --prefix ./client install
```

### 8. Set up user authorization with Google Sign-In
Replace the Client ID in [`client/src/server-config.js`](https://github.com/URAP-charter/scraping_server/blob/97c303d4f6455a51efe83f16c8d5a8daec272941/client/src/server-config.js#L5) and [`client/src/settings.py`](https://github.com/URAP-charter/scraping_server/blob/97c303d4f6455a51efe83f16c8d5a8daec272941/crawler/crawler/settings.py#L150) with your own ([how to create authorization credentials](https://developers.google.com/identity/sign-in/web/sign-in#create_authorization_credentials)). You can enable crawling requests from your IP addresses (if not `localhost`) as "Authorized Javascript Origins" with your Client ID on [the Google Console Credentials page](https://console.developers.google.com/apis/credentials). The current repo uses the Client ID created by [Jaren Haber, PhD](https://www.jarenhaber.com/), which will work for the purposes of testing and developing the crawling server.

In addition, you must replace the placeholder "clientID" in line 3 of the .env file contained in the main repository with your own Google OAuth Client ID.

### 9. Run Crawl4All Server
Running Redis Queue, Flask, React Server. In three Terminal windows, navigate to the project folder and run the following commands.

Terminal 1:
```bash
conda activate wc-server
rq worker crawling-tasks --path ./crawler
```

Terminal 2:
```bash
conda activate wc-server
npm run dev::server
```

Terminal 3:
```bash
conda activate wc-server
npm run dev::webpack
```

At this point, you should be able to see the web interface running on [localhost:3000](http://localhost:3000)
