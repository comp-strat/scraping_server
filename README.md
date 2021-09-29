# Scraping Server
This Repository accompanies https://github.com/URAP-charter/web_scraping as web interface.

## Running the Node Server
 - First follow the instructions on the web_scraping repo since this repo will be calling its APIs
 - Clone this repo, and run `cd server && npm install`. This will install all prerequisite node modules for the server
 - Make sure a mongo db server is running
 - Have the Flask Server of the web_scraping repo running if you want to access real crawling APIs
 - Run `npm run-script prod`. A server should be running on the machine, with details set by environment variables.
