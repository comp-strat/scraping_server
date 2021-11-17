from flask import Flask, request, send_file

#import pandas as pd
#from datetime import datetime

from redis import Redis
import rq
from rq import job
import crawlTaskTracker
import settings
from bson import json_util
from bson.objectid import ObjectId
import json
import getzip
import uuid
import subprocess

from flask import jsonify

"""
from authlib.integrations.flask_oauth2 import ResourceProtector, current_token
from authlib.oauth2.rfc7662 import IntrospectTokenValidator
import requests
"""
app = Flask(__name__)
"""
class MyIntrospectTokenValidator(IntrospectTokenValidator):
    def introspect_token(self, token_string):
        url = 'https://example.com/oauth/introspect'
        data = {'token': token_string, 'token_type_hint': 'access_token'}
        auth = (settings.GOOGLE_OAUTH_CLIENT_URL, settings.GOOGLE_OAUTH_CLIENT_SECRET)
        resp = requests.post(url, data=data, auth=auth)
        resp.raise_for_status()
        return resp.json()

require_oauth = ResourceProtector()

# only bearer token is supported currently
require_oauth.register_token_validator(MyIntrospectTokenValidator())
"""

task_repository = crawlTaskTracker.CrawlTaskRepository(
    mongo_uri=settings.MONGO_URI, 
    mongo_user=settings.MONGO_USERNAME, 
    mongo_pass=settings.MONGO_PASSWORD,
    db_name=settings.MONGODB_DB,
    jobs_collection=settings.MONGODB_COLLECTION_JOBS)

@app.after_request
def after_request(response):
    header = response.headers
    header["Access-Control-Allow-Credentials"] =  True
    header["Access-Control-Allow-Origin"] = settings.CLIENT_ORIGIN
    header["Access-Control-Allow-Headers"] = "*"
    header["Content-Type"] = "text/json"
    return response

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/job', methods=['POST'])
def create_task():
    data = json.loads(request.data.decode('utf-8'))
    if 'urls' not in data:
        return {'status': 400, 'message': 'No urls found!'}
    
    #school_list = pd.DataFrame({"NCESSCH":["100" for _ in data["urls"]], "URL_2019":data["urls"]})
    #now = datetime.now()
    #school_list.to_csv('./schools/spiders/' + now.strftime('%d%m%Y_%H%M%S') + '.csv', index=False)
    #print("tmp file written")

    queue = rq.Queue('crawling-tasks', connection=Redis.from_url('redis://'))
    
    urls = data["urls"].split(",")
    job_id = str(uuid.uuid4())
    mongo_settings = {
        "MONGO_URI": settings.MONGO_URI
    }
    job = queue.enqueue("crawler.execute_scrapy_from_urls", urls, mongo_settings, job_id=job_id)
    queue.enqueue("crawler.update_status",job_id, mongo_settings) # After task is done, update status to failed or completed

    #job = queue.enqueue('schools.execute_scrapy_from_flask', './schools/spiders/' + now.strftime('%d%m%Y_%H%M%S') + '.csv', './schools/spiders/' + now.strftime('%d%m%Y_%H%M%S'))
    #job_id = job.get_id()
    
    #crawl_task = crawlTaskTracker.CrawlTask(job_id) # Future work: add user id too
    #task_mongo_id = task_repository.putTask(crawl_task)
    print("Created job", job_id, urls)
    return {'status': 200, 'message': 'Crawl Started', 'job_id': str(job_id)}

@app.route('/jobs', methods=['GET'])
def get_all_jobs():
    user = None # TODO: get user by session
    return task_repository.get_all_tasks(user)

@app.route('/job/<task_id>', methods=['GET'])
def get_task_by_id(task_id):
    if task_id == None:
        return {'status': 400, 'message': 'No Task ID provided'}
    #completion_status = task_repository.get_task_progress(task_id)
    completion_status = task_repository.getStatus(task_id)
    return {'task_id': task_id, 'completion_status': completion_status}

@app.route('/job/<task_id>', methods=['DELETE'])
def kill_task(task_id):
    print("KILLING TASK",task_id)
    if task_id == None:
        return {'status': 400, 'message': 'No Task ID provided'}
    kill_status = task_repository.kill_task(task_id)
    return {'task_id': task_id, 'kill_sucessful': int(kill_status)}

@app.route('/job/<task_id>/files',methods=["GET"])
def send_zip(task_id):
    if task_id == None:
        return {'status': 400, 'message': 'No Task ID provided'}
    status = task_repository.get_task_progress(task_id)
    if status == "Ongoing":
        return {'status': 403, 'message': 'Task still ongoing'}
    #if status == "Error":
    #    return {'status': 403, 'message': 'Task errored!'}
    
    filepath = getzip.getzip(task_id)
    return_file = send_file(filepath,attachment_filename="crawl-output.zip",as_attachment=True)
    subprocess.run(["rm",filepath])
    return return_file


if __name__ == '__main__':
    app.run(host='localhost', debug=True, port=settings.SERVER_PORT)
