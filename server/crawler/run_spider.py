"""
In crawler/crawler, use the command

    python3 crawler/run_spider.py 

To run the recursivespider.
The primary purpose of this file is for the Scrapy Dockerfile.

NOTE: by default, data doesn’t persist when that container no longer exists.
"""
from scrapy import cmdline
import multiprocessing
import os
import crawler.execute_scrapy_from_file as execute_scrapy_from_file
import subprocess
from rq import get_current_job

from crawler import crawlTaskTracker
from crawler import settings

# See scrapy_vanilla.py for the meaning of this command.
#scrapy_run_cmd = "scrapy crawl recursivespider -a csv_input=schools/spiders/test_urls.csv"
SCRAPY_RUN_CMD = "scrapy crawl recursivespider -a target_list="

SPLIT_FILE_CMD = 'split -l 100 --additional-suffix='

SPLIT_PREFIX = 'split_urls/'

#cmdline.execute(scrapy_run_cmd.split())

task_repository = crawlTaskTracker.CrawlTaskRepository(
    mongo_uri=settings.MONGO_URI, 
    mongo_user=settings.MONGO_USERNAME, 
    mongo_pass=settings.MONGO_PASSWORD,
    db_name=settings.MONGODB_DB,
    jobs_collection=settings.MONGODB_COLLECTION_JOBS)

def execute_scrapy_from_urls(urls, mongo_settings, user=None, title=None):
    id = get_current_job().id
    setting = lambda word, otherwise: mongo_settings[word] if word in mongo_settings else otherwise
    task_repository = crawlTaskTracker.CrawlTaskRepository(
        mongo_uri=setting("MONGO_URI",settings.MONGO_URI), 
        mongo_user=setting("MONGO_USERNAME",settings.MONGO_USERNAME), 
        mongo_pass=setting("MONGO_PASSWORD",settings.MONGO_PASSWORD),
        db_name=setting("MONGODB_DB",settings.MONGODB_DB),
        jobs_collection=setting("MONGODB_COLLECTION_JOBS",settings.MONGODB_COLLECTION_JOBS))
    task_repository.addTask(urls, id, user, title)
    
    pool = multiprocessing.Pool(multiprocessing.cpu_count() - 1)
    pool.starmap(execute_scrapy_from_file.execute_scrapy_from_url, [(url, id, mongo_settings, user) for url in urls])
    pool.close()
    pool.join()
    
    print("Pool Closed")


def execute_scrapy_from_flask(filename, file_prefix):
    print('Making new Directory for split files')
    subprocess.run(['pwd'])
    subprocess.run(['mkdir',file_prefix + SPLIT_PREFIX])
    print("Splitting tmp file " + str(filename))
    split_cmd = SPLIT_FILE_CMD + '.csv ' + str(filename) + ' ' + str(file_prefix) + SPLIT_PREFIX
    print("Split command " + split_cmd)
    subprocess.run(split_cmd.split())
    subprocess.run(['ls', '-l'])
    
    print("Starting Pool for file processing")
    pool = multiprocessing.Pool(multiprocessing.cpu_count() - 1)
    id = get_current_job().id
    list_files = [(file_prefix + SPLIT_PREFIX + file,id,None) for file in os.listdir(file_prefix + SPLIT_PREFIX)]
    print(list_files)
    
    pool.starmap(execute_scrapy_from_file.execute_scrapy_from_file, list_files)
    pool.close()
    pool.join()
    print("Pool closed. Cleaning up!")
    cleanup_cmd = 'rm ' + filename
    subprocess.run(cleanup_cmd.split())
    cleanup_cmd = 'rm -r ' + file_prefix + SPLIT_PREFIX
    return subprocess.run(cleanup_cmd.split())
