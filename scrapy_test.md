## Running a Simple Scrapy Crawl

### 1. Install Dependencies
SSH into the VM using `ssh user@ip_address`. Navigate to the scraping_server repo by first navigating to the Desktop, then using:

```bash
cd /vol_c/data/scraping_server
```
OR 
```bash
cd scraping_server
```
(depending on which VM you are using).

Then run the following commands:

```bash
# Create and start a virtual environment for Python dependencies.
python3 -m venv .venv
source .venv/bin/activate
# Install dependencies.
pip3 install -r requirements.txt
```

### 2. Run Simple Crawl

Navigate to `/crawler/crawler` and run:

```bash
scrapy crawl recursivespider -a target_list=spiders/test_urls.tsv -o recursivespider_output.json
```

Once the spider has finished running, you can view its output via schoolspider_output.json, created in the `scraping_server/crawler/crawler` directory. 

### Adding Logging 

To add a log output file, you'll need to add `-L` and `--logfile` flags. The `-L` flag specifies the level of logging, such as `INFO`, `DEBUG`, or `ERROR`, and specifies what types of log messages appear in the log file. The `--logfile` flag specifies the output file location, such as `./recursivespider_log_2_22_2022.log`.

A sample command with a log file:

```bash
scrapy crawl recursivespider -a target_list=spiders/test_urls.tsv -o recursivespider_output.json -L INFO --logfile ../logs/recursivespider_log_2_22_2022.log
```

When you're finished and you don't need to run the scraper anymore run:

```bash
# Deactivate the environment.
deactivate
```
