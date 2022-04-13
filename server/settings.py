# Scrapy settings for schools project
#
# For simplicity, this file contains only settings considered important or
# commonly used. You can find more settings consulting the documentation:
#
#     https://docs.scrapy.org/en/latest/topics/settings.html
#     https://docs.scrapy.org/en/latest/topics/downloader-middleware.html
#     https://docs.scrapy.org/en/latest/topics/spider-middleware.html
import os

from scrapy.utils.project import get_project_settings

BOT_NAME = 'crawler'

SPIDER_MODULES = ['crawler.spiders']
NEWSPIDER_MODULE = 'crawler.spiders'

CLIENT_ORIGIN = os.getenv('CLIENT_ORIGIN') or "http://localhost:3000"

# Configure maximum concurrent requests performed by Scrapy (default: 16)
# CONCURRENT_REQUESTS = 32

# Configure a delay for requests for the same website (default: 0)
# See https://docs.scrapy.org/en/latest/topics/settings.html#download-delay
# See also autothrottle settings and docs
# DOWNLOAD_DELAY = 3
# The download delay setting will honor only one of:
# CONCURRENT_REQUESTS_PER_DOMAIN = 16
# CONCURRENT_REQUESTS_PER_IP = 16

# Disable cookies (enabled by default)
# COOKIES_ENABLED = False

# Disable Telnet Console (enabled by default)
# TELNETCONSOLE_ENABLED = False

# Override the default request headers:
# DEFAULT_REQUEST_HEADERS = {
#   'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
#   'Accept-Language': 'en',
# }



# Enable or disable downloader middlewares
# See https://docs.scrapy.org/en/latest/topics/downloader-middleware.html
DOWNLOADER_MIDDLEWARES = {
   'crawler.middlewares.CrawlerDownloaderMiddleware': 543, 'scrapy.downloadermiddlewares.retry.RetryMiddleware': 4
}

# Configure times retried after receiving an error
RETRY_TIMES = 5

# Configure delay before downloading.
DOWNLOADS_DELAY = 10

# Enable or disable extensions
# See https://docs.scrapy.org/en/latest/topics/extensions.html
# EXTENSIONS = {
#   'scrapy.extensions.telnet.TelnetConsole': None,
# }

# Enable and configure the AutoThrottle extension (disabled by default)
# See https://docs.scrapy.org/en/latest/topics/autothrottle.html
AUTOTHROTTLE_ENABLED = True
# The initial download delay
AUTOTHROTTLE_START_DELAY = 5
# The maximum download delay to be set in case of high latencies
AUTOTHROTTLE_MAX_DELAY = 60
# The average number of requests Scrapy should be sending in parallel to
# each remote server
AUTOTHROTTLE_TARGET_CONCURRENCY = 1.0
# Enable showing throttling stats for every response received:
AUTOTHROTTLE_DEBUG = False

# Enable and configure HTTP caching (disabled by default)
# See https://docs.scrapy.org/en/latest/topics/downloader-middleware.html#httpcache-middleware-settings
# HTTPCACHE_ENABLED = True
# HTTPCACHE_EXPIRATION_SECS = 0
# HTTPCACHE_DIR = 'httpcache'
# HTTPCACHE_IGNORE_HTTP_CODES = []
# HTTPCACHE_STORAGE = 'scrapy.extensions.httpcache.FilesystemCacheStorage'


MONGO_DB = 'crawlerSpider'
MONGO_BUCKET_IMAGES = "images"
MONGO_BUCKET_FILES = "files"
MONGO_COLLECTION_ITEMS = "items"
# MONGO_COLLECTION_TEXT = "text"
# Currently not used
MONGO_COLLECTION_JOBS = "jobs"
MONGO_COLLECTION_OTHERS = "others"

# running locally without containers
MONGO_URI = os.getenv('MONGO_URI') or 'mongodb://localhost:27017'

# connect to MongoDB which is running in mongodb_container.
# MONGO_URI = 'mongodb://mongodb_container:27000'
# MONGO_URI = 'someBadURI'
# MONGO_URI = '10.0.2.4'

MONGO_REPLICATION = False

MONGO_REPLICA_SET = 'mongoCluster'  # replica set name if used

MONGO_DATABASE = 'crawlerSpider'  # database (not collection) name

MONGO_USERNAME = 'admin'  # could probably make a "schoolCrawler" user to use here instead

MONGO_PASSWORD = 'mdipass'  # Replace with actual password

# FILES_EXPIRES = 365
IMAGES_EXPIRES = 365
MEDIA_ALLOW_REDIRECTS = True
IMAGES_MIN_HEIGHT = 150
IMAGES_MIN_WIDTH = 150

UPLOAD_FOLDER = "uploads/"
UPLOAD_FOLDER = os.path.join(
    os.path.dirname(os.path.realpath(__file__)), UPLOAD_FOLDER
)

GOOGLE_OAUTH_CLIENT_ID = os.getenv('GOOGLE_OAUTH_CLIENT_ID') or None

FLASK_ENV = os.getenv("FLASK_ENV") or "production"
DEBUG_NO_AUTH_ENABLED = os.getenv("DEBUG_NO_AUTH_ENABLED") == "True"

__settings = get_project_settings()
# Item pipelines
# See https://docs.scrapy.org/en/latest/topics/item-pipeline.html
__settings["ITEM_PIPELINES"] = {
    'server.crawler.pipelines.MongoDBPipeline': 300
}
__settings["LOG_LEVEL"] = "INFO"

# Enable or disable spider middlewares. These are set by default,
# but explicitly stated for the sake of highlighting what needs configuration.
# See https://docs.scrapy.org/en/latest/topics/spider-middleware.html
__settings["SPIDER_MIDDLEWARES"] = {
    'scrapy.spidermiddlewares.depth.DepthMiddleware': 100,
    'scrapy.spidermiddlewares.httperror.HttpErrorMiddleware': 200,
    'scrapy.spidermiddlewares.offsite.OffsiteMiddleware': 300
}

# Configure depth
__settings["DEPTH_LIMIT"] = 1

# Crawl responsibly by identifying yourself (and your website) on the user-agent
# USER_AGENT = 'schools (+http://www.yourdomain.com)'
__settings["USER_AGENT"] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) ' \
                           'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'

# Obey robots.txt rules
__settings["ROBOTSTXT_OBEY"] = False

scrapy_project_setting = __settings

