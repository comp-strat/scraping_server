"""
In crawler/crawler, use the command

    python3 crawler/run_spider.py 

To run the recursivespider.
The primary purpose of this file is for the Scrapy Dockerfile.

NOTE: by default, data doesn’t persist when that container no longer exists.
"""
import pandas as pd

from scrapy.utils.project import get_project_settings
from scrapy.crawler import CrawlerRunner
from server.crawler.spiders.recursive_spider import RecursiveSpider
from twisted.internet import reactor
from server.settings import scrapy_project_setting


def scrapy_execute(urls, user, title, job_id):
    runner = CrawlerRunner(scrapy_project_setting)
    runner.crawl(RecursiveSpider, target=urls, job_id=job_id, user=user)
    d = runner.join()
    d.addBoth(lambda _: reactor.stop())
    reactor.run()


def scrapy_execute_csv(csv_file, user, title, job_id):
    urls = read_urls_from_csv(csv_file)
    scrapy_execute(urls, user, title, job_id)


def read_urls_from_csv(csv_file) -> [str]:
    # Read the csv file as pandas df
    df = pd.read_csv(csv_file)

    # Case-insensitive regex match so that
    # URLs, urls, Urls, etc. would all work
    df.filter(regex="(?i)urls?")

    # If there are more than one matches,
    # just select the first column
    urls = df.iloc[:, 0].tolist()

    return urls
