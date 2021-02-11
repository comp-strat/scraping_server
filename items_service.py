import pymongo
from config import Config

mongo_host = Config.MONGO_HOST
mongo_port = Config.MONGO_PORT

mongo_client = pymongo.MongoClient(mongo_host, mongo_port)

schoolspider_db = mongo_client.schoolSpider

items = schoolspider_db.outputItems

def get_all_items():
    all_items = []
    for item in items.find():
        all_items.append(str(item))
    print("Returning all items found")
    return all_items
