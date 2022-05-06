import logging
from scrapy import signals
from scrapy.exceptions import NotConfigured
import json
import pprint
# Email
import os
from dotenv import load_dotenv
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

logger = logging.getLogger(__name__)
stats = {}

class SpiderOpenCloseLogging:

    def __init__(self, item_count):
        self.item_count = item_count
        self.items_scraped = 0

    @classmethod
    def from_crawler(cls, crawler):
        # first check if the extension should be enabled and raise
        # NotConfigured otherwise
        if not crawler.settings.getbool('MYEXT_ENABLED'):
            raise NotConfigured

        # get the number of items from settings
        item_count = crawler.settings.getint('MYEXT_ITEMCOUNT', 1000)

        # instantiate the extension object
        ext = cls(item_count)

        # connect the extension object to signals
        crawler.signals.connect(ext.spider_opened, signal=signals.spider_opened)
        crawler.signals.connect(ext.spider_closed, signal=signals.spider_closed)
        #crawler.signals.connect(ext.item_scraped, signal=signals.item_scraped)

        # return the extension object
        return ext

    def spider_opened(self, spider):
        logger.info("opened spider %s", spider.name)

    def spider_closed(self, spider):
        self.items_scraped += 1
        if self.items_scraped % self.item_count == 0:
            logger.info("scraped %d items", self.items_scraped)
            print(logger)

        intro = "Summary stats from Scrapy spider: \n\n"
        stats = spider.crawler.stats.get_stats()
        #stats = pprint.pformat(stats)
        with open('data.json', 'w') as f:
            json.dump(stats, f)
        with open('data.json', 'wb') as f:
            f.write(stats,f)

        ### EMAIL TESTING
        # load_dotenv('SENDGRID_API_KEY.env')
        # load_dotenv('SENDER_ADDRESS.env')
        stats = pprint.pformat(stats)
        body = intro + stats

        #SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY", default="OOPS, please set env var called 'SENDGRID_API_KEY'")
        SENDGRID_API_KEY = "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"
        #SENDER_ADDRESS = os.getenv("SENDER_ADDRESS", default="OOPS, please set env var called 'SENDER_ADDRESS'")
        SENDER_ADDRESS = "rba36@georgetown.edu"
        print("API: ", SENDGRID_API_KEY)

        client = SendGridAPIClient(SENDGRID_API_KEY)  # class 'sendgrid.sendgrid.SendGridAPIClient>
        print("CLIENT:", type(client))

        subject = "Your Test Email for Imagescraper.py project"

        html_content = body
        #print("HTML:", html_content)

        # Note: You can customize the `to_emails` param to send to other addresses

        to_email = "rba36@georgetown.edu"

        message = Mail(from_email=SENDER_ADDRESS, to_emails=to_email, subject=subject, html_content=html_content)

        try:
            response = client.send(message)

            print("RESPONSE:", type(response))  # > <class 'python_http_client.client.Response'>
            print(response.status_code)  # > 202 indicates SUCCESS
            print(response.body)
            print(response.headers)

        except Exception as err:
            print(type(err))
            print(err)
        ### END OF EMAIL TESTING

        print("Robert testing spider_closed extension")
        logger.info("closed spider %s", spider.name)
        return stats

    # def save_stats(self, stats):
    #     with open('data.json', 'w') as f:
    #         json.dump(stats, f)
    #     with open('data.json', 'wb') as f:
    #         f.write(stats,f)
    # def item_scraped(self, item, spider):
    #     self.items_scraped += 1
    #     if self.items_scraped % self.item_count == 0:
    #         logger.info("scraped %d items", self.items_scraped)
    #
    #     stats = spider.crawler.stats.get_stats()
    #     print(stats)
    #     print("Robert testing item_scraped extension")
