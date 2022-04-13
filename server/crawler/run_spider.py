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

    # Read the csv file as pandas df
    df = pd.read_csv(csv_file)

    # Case-insensitive regex match so that
    # URLs, urls, Urls, etc. would all work
    df.filter(regex="(?i)urls?")

    # If there are more than one matches,
    # just select the first column
    urls = df.iloc[:, 0].tolist()

    scrapy_execute(urls, user, title, job_id)


# def execute_scrapy_from_flask(filename, file_prefix):
#     print('Making new Directory for split files')
#     subprocess.run(['pwd'])
#     subprocess.run(['mkdir',file_prefix + SPLIT_PREFIX])
#     print("Splitting tmp file " + str(filename))
#     split_cmd = SPLIT_FILE_CMD + '.csv ' + str(filename) + ' ' + str(file_prefix) + SPLIT_PREFIX
#     print("Split command " + split_cmd)
#     subprocess.run(split_cmd.split())
#     subprocess.run(['ls', '-l'])
#
#     print("Starting Pool for file processing")
#     pool = multiprocessing.Pool(multiprocessing.cpu_count() - 1)
#     id = get_current_job().id
#     list_files = [(file_prefix + SPLIT_PREFIX + file,id,None) for file in os.listdir(file_prefix + SPLIT_PREFIX)]
#     print(list_files)
#
#     pool.starmap(execute_scrapy_from_file.execute_scrapy_from_file, list_files)
#     pool.close()
#     pool.join()
#     print("Pool closed. Cleaning up!")
#     cleanup_cmd = 'rm ' + filename
#     subprocess.run(cleanup_cmd.split())
#     cleanup_cmd = 'rm -r ' + file_prefix + SPLIT_PREFIX
#     return subprocess.run(cleanup_cmd.split())


if __name__ == '__main__':
    scrapy_execute(["https://miclin.me"], "miclin@berkeley.edu", "miclin", "id-aijadifj")
