from flask import Flask, request, send_file, session, jsonify

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
from functools import wraps
import requests

app = Flask(__name__)

task_repository = crawlTaskTracker.CrawlTaskRepository(
    mongo_uri=settings.MONGO_URI, 
    mongo_user=settings.MONGO_USERNAME, 
    mongo_pass=settings.MONGO_PASSWORD,
    db_name=settings.MONGODB_DB,
    jobs_collection=settings.MONGODB_COLLECTION_JOBS)

def token_required(f):
   @wraps(f)
   def decorator(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[-1].strip()
 
        if not token:
            return jsonify({'status':401,'message': 'a valid token is missing'}), 401
       
        url = "https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=" + token

        r = requests.get(url)
        if r.status_code != requests.codes.ok:
           return jsonify({'status':401,'message': 'token is invalid'}), 401
        else:
            current_user = r.json()["email"]

        return f(current_user, *args, **kwargs)
   return decorator

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
@token_required
def create_task(user):
    print(user, request.data)
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
    job = queue.enqueue("crawler.execute_scrapy_from_urls", urls, mongo_settings, user, job_id=job_id)
    queue.enqueue("crawler.update_status",job_id, mongo_settings) # After task is done, update status to failed or completed

    #job = queue.enqueue('schools.execute_scrapy_from_flask', './schools/spiders/' + now.strftime('%d%m%Y_%H%M%S') + '.csv', './schools/spiders/' + now.strftime('%d%m%Y_%H%M%S'))
    #job_id = job.get_id()
    
    #crawl_task = crawlTaskTracker.CrawlTask(job_id) # Future work: add user id too
    #task_mongo_id = task_repository.putTask(crawl_task)
    print("Created job", job_id, urls)
    return {'status': 200, 'message': 'Crawl Started', 'job_id': str(job_id)}

@app.route('/jobs', methods=['GET'])
@token_required
def get_all_jobs(user):
    return task_repository.get_all_tasks(user)

@app.route('/job/<task_id>', methods=['GET'])
@token_required
def get_task_by_id(user,task_id):
    # Currently every registered user can get access to task info, TODO: restrict to owner only
    if task_id == None:
        return {'status': 400, 'message': 'No Task ID provided'}
    #completion_status = task_repository.get_task_progress(task_id)
    completion_status = task_repository.getStatus(task_id)
    return {'task_id': task_id, 'completion_status': completion_status}

@app.route('/job/<task_id>', methods=['DELETE'])
@token_required
def kill_task(user,task_id):
    # Currently every registered user can kill a task if they know the id, TODO: restrict to owner only
    print("KILLING TASK",task_id)
    if task_id == None:
        return {'status': 400, 'message': 'No Task ID provided'}
    kill_status = task_repository.kill_task(task_id)
    return {'task_id': task_id, 'kill_sucessful': int(kill_status)}

@app.route('/job/<task_id>/files',methods=["GET"])
@token_required
def send_zip(user,task_id):
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
