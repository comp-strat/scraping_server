from scrapy import cmdline
import subprocess
from scrapyscript import Job, Processor
from schools.spiders.scrapy_vanilla import RecursiveSpider
from scrapy.utils.project import get_project_settings


SCRAPY_RUN_CMD = "scrapy crawl recursivespider -a target_list="


def execute_scrapy_from_file(filename,rq_id=None,user=None):
    run_cmd = SCRAPY_RUN_CMD + str(filename)
    print(run_cmd)
    subprocess.run(['cat',filename])
    job = Job(RecursiveSpider, school_list=str(filename),user=user, rq_id=rq_id)
    processor = Processor(settings=get_project_settings())
    data = processor.run(job)
    print("PROCESS DONE")
    return data #cmdline.execute(run_cmd.split())
