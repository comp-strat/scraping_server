from scrapy import cmdline
import subprocess
from scrapyscript import Job, Processor
from crawler.spiders.recursive_spider import RecursiveSpider
from scrapy.utils.project import get_project_settings
from crawler import crawlTaskTracker
from crawler import settings

SCRAPY_RUN_CMD = "scrapy crawl schoolspider -a school_list="
def update_status (id, mongo_settings):
    setting = lambda word, otherwise: mongo_settings[word] if word in mongo_settings else otherwise
    task_repository = crawlTaskTracker.CrawlTaskRepository(
        mongo_uri=setting("MONGO_URI",settings.MONGO_URI), 
        mongo_user=setting("MONGO_USERNAME",settings.MONGO_USERNAME), 
        mongo_pass=setting("MONGO_PASSWORD",settings.MONGO_PASSWORD),
        db_name=setting("MONGODB_DB",settings.MONGODB_DB),
        jobs_collection=setting("MONGODB_COLLECTION_JOBS",settings.MONGODB_COLLECTION_JOBS))
    task_repository.updateStatus(id)

def execute_scrapy_from_url(url, rq_id,mongo_settings, user):
    print(url, rq_id,user)
    job = Job(RecursiveSpider, url=url,user=user, mongo_settings=mongo_settings, rq_id=rq_id)
    processor = Processor(settings=get_project_settings())
    data = processor.run(job)
    print("PROCESS DONE")
    return data

def execute_scrapy_from_file(filename,rq_id=None,user=None):
    run_cmd = SCRAPY_RUN_CMD + str(filename)
    print(run_cmd)
    subprocess.run(['cat',filename])
    job = Job(RecursiveSpider, school_list=str(filename),user=user, rq_id=rq_id)
    processor = Processor(settings=get_project_settings())
    data = processor.run(job)
    print("PROCESS DONE")
    return data #cmdline.execute(run_cmd.split())
