# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


"""
This pipeline stores CrawlerItem items into MongoDB.
To view the output of this pipeline, run
$ mongo
> use RecursiveSpider # switch to DATABASE_NAME database name
> db.outputItems.find().pretty() # print contents of COLLECTION_NAME

This code is taken from https://alysivji.github.io/mongodb-pipelines-in-scrapy.html
and slightly modified (most modifications are in the process_item() method).
For more info on how items are inserted into the database, read:
https://pymongo.readthedocs.io/en/stable/api/pymongo/collection.html#pymongo.collection.Collection.replace_one
"""
# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
from server.crawler.items import CrawlerItem
from server.crawler.tracking import job_repository, CrawlJobStatus
import server.settings as settings
import os

import logging
# third party
import pymongo
import mimetypes
import requests
import gridfs


class MongoDBPipeline:

    def __init__(self, mongo_uri, mongo_db, mongo_user='admin', mongo_pwd='', mongo_repl=False, mongo_repl_name=''):
        self.client = None
        self.db = None
        self.mongo_uri = mongo_uri
        self.mongo_db = mongo_db
        self.mongo_user = mongo_user
        self.mongo_password = mongo_pwd
        self.mongo_replication = mongo_repl
        self.mongo_replica_set_name = mongo_repl_name


    @classmethod
    def from_crawler(cls, crawler):
        # pull in information from settings.py
        return cls(
            mongo_uri=settings.MONGO_URI,
            mongo_db=settings.MONGO_DATABASE,
            mongo_user=settings.MONGO_USERNAME,
            mongo_pwd=settings.MONGO_PASSWORD,
            mongo_repl=settings.MONGO_REPLICATION,
            mongo_repl_name=settings.MONGO_REPLICA_SET
        )

    def open_spider(self, spider):
        # initializing spider
        print(f"Spiders {spider.job_id} opening...")
        print("Connecting to MongoDB...")
        if self.mongo_replication:
            self.client = pymongo.MongoClient(self.mongo_uri, replicaSet=self.mongo_replica_set_name,
                                              username=self.mongo_user, password=self.mongo_password)
        else:
            self.client = pymongo.MongoClient(self.mongo_uri, username=self.mongo_user,
                                              password=self.mongo_password)
        self.db = self.client[self.mongo_db]
        print("Connected")

    def close_spider(self, spider):
        # clean up when spider is closed
        print(f"Spiders {spider.job_id} closing...")
        result = job_repository.update_status(spider.job_id, CrawlJobStatus.finished)
        print(f"Updated tasks repo, result {result}")
        self.client.close()

    def process_item(self, item, spider):
        """
        For each CrawlerItem item, insert the item into the specified
        collection of the MongoDB database. If the item
        already exists, replace it (this prevents duplicates).

        To check if an item already exists, filter by the item's
        url field.

        Only store CrawlerItems.
        """
        adapted_item = ItemAdapter(item).asdict()
        # Finds the document with the matching url.
        query = {'url': item['url']}

        if not isinstance(item, CrawlerItem):
            logging.debug("Not an instance of CrawlerItem")
            logging.debug(item['url'])
            self.db[settings.MONGO_COLLECTION_OTHERS]\
                .replace_one(query, adapted_item, upsert=True)
            return item

        # upsert=True means insert the document if the query doesn't find a match.
        self.db[settings.MONGO_COLLECTION_ITEMS].replace_one(
            query, adapted_item, upsert=True
        )

        urls = item["image_urls"]
        if type(urls) is list and len(urls) != 0:
            self.save_to_bucket(urls, settings.MONGO_BUCKET_IMAGES, spider)

        urls = item["file_urls"]
        if type(urls) is list and len(urls) != 0:
            self.save_to_bucket(urls, settings.MONGO_BUCKET_FILES, spider)

        logging.debug(f"MongoDB: Inserted {item['url']}.")
        return item

    def save_to_bucket(self, urls, bucket_name, spider):
        for url in urls:
            mime_type = mimetypes.guess_type(url)[0]
            request = requests.get(url, stream=True)
            fs = gridfs.GridFS(self.db, bucket_name)
            fs.put(request.raw, contentType=mime_type,
                   user=spider.user if hasattr(spider, "user") else None,
                   job_id=spider.job_id if hasattr(spider, "job_id") else None,
                   filename=os.path.basename(url), bucket_name=bucket_name)
