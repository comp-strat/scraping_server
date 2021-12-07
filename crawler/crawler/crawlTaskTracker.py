from pymongo.results import UpdateResult
import redis
import rq
import pymongo
from rq.command import send_stop_job_command
import time

class CrawlTask():
    def __init__(self, rq_id, is_complete=False, user_id=None):
        self.rq_id = rq_id
        self.is_complete = is_complete
        self.user_id = user_id

    def to_dict(self):
        return {'rq_id': self.rq_id, 'is_complete': self.is_complete, 'user_id': self.user_id}


class CrawlTaskRepository():
    def __init__(self, mongo_uri, mongo_user, mongo_pass, db_name, jobs_collection):
        self.client = pymongo.MongoClient(mongo_uri, username=mongo_user, password=mongo_pass)
        self.collection_name = jobs_collection
        self.db_name = db_name
    
    def addTask(self,urls,rq_id,user, title):
        db = self.client[self.db_name]
        collection = db[self.collection_name]
        return collection.insert_one({
            "URLs":urls,
            "rq_id":rq_id,
            "user":user,
            "title":title,
            "created_dt": int(time.time()),
            "status":"Ongoing"
        })

    def putTask(self, task):
        db = self.client[self.db_name]
        collection = db[self.collection_name]
        return collection.insert_one(task.to_dict()).inserted_id

    def getTaskById(self, task_id):
        print("Connecting to db")
        db = self.client[self.db_name]
        print("DB = " + str(db))
        collection = db[self.collection_name]
        print("Collection = " + str(collection))
        return collection.find_one({'rq_id':task_id})

    def updateTask(self, task, task_id):
        db = self.client[self.db_name]
        collection = db[self.collection_name]
        return collection.update({"_id": task_id}, task, True)

    def updateStatus (self, task_rq_id, status = None):
        db = self.client[self.db_name]
        collection = db[self.collection_name]
        if status is None:
            status = self.get_task_progress(task_rq_id)
        print("Updating",task_rq_id,"to",status)
        return collection.update_one({"rq_id": task_rq_id}, {"$set":{"status":status}})
    
    def getStatus (self, task_rq_id):
        db = self.client[self.db_name]
        collection = db[self.collection_name]
        document = collection.find_one({"rq_id":task_rq_id})

        return dict(document) if document else {"status":self.get_task_progress(task_rq_id)}

    def getIncompleteTasksByUserId(self, user_id):
        db = self.client[self.db_name]
        collection = db[self.collection_name]
        return collection.find({'user_id':user_id, 'is_complete':False})

    def getAllTasksByUserId(self, user_id):
        db = self.client[self.db_name]
        collection = db[self.collection_name]
        return collection.find({'user_id':user_id, 'is_complete':False})

    def get_rq_task(self, task_rq_id):
        try:
            conn = redis.Redis.from_url('redis://')
            rq_job = rq.job.Job.fetch(task_rq_id, connection = conn)
        except (redis.exceptions.RedisError, rq.exceptions.NoSuchJobError):
            return (None, None)
        return (rq_job,conn)

    def get_task_progress(self, task_rq_id):
        job, conn = self.get_rq_task(task_rq_id)
        if not job: return "Error"
        print(job)
        if job.is_failed:
            return "Failed"
        if job.is_stopped or job.is_deferred:
            return "Cancelled"
        if job.is_finished:
            return "Finished"
        if job.is_started or job.is_queued:
            return "Ongoing"
        return "Error"
    
    def kill_task (self, task_rq_id):
        job,conn = self.get_rq_task(task_rq_id)
        if not job: return False
        job.cancel()
        print(job.get_status())
        if job.is_started:
            send_stop_job_command(conn,task_rq_id)
        self.updateStatus(task_rq_id, "Cancelled")
        return True

    def get_all_tasks (self, user):
        db = self.client[self.db_name]
        collection = db[self.collection_name]
        #documents = [dict(doc) for doc in collection.find({"user":user})]
        documents = [{
            "created_by": doc["user"],
            "_id": doc["rq_id"],
            "URLs": doc["URLs"],
            "createdDate": doc["created_dt"],
            "status": doc["status"],
            "title": doc["title"]
        } for doc in collection.find({"user":user})]
        return {"data":documents}
