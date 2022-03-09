from __future__ import annotations

import sys
from functools import wraps

from bson import ObjectId
from pymongo.results import UpdateResult
from rq.command import send_stop_job_command
from enum import Enum
from server import settings
import redis
import rq
import pymongo
import time


class CrawlTaskStatus(Enum):
    ongoing = "Ongoing"
    failed = "Failed"
    cancelled = "Cancelled"
    finished = "Finished"


Status = CrawlTaskStatus


class CrawlTask:

    def __init__(self, urls: list[str] = None, user: str = None, title: str = None):
        self.urls = urls
        self.user = user
        self.title = title
        self.creation_dt = int(time.time())
        self.status = Status.ongoing

    def to_dict(self):
        return {
            "urls": self.urls,
            "user": self.user,
            "title": self.title,
            "creation_dt": self.creation_dt,
            "status": self.status.value
        }

    def from_dict(self, source: dict) -> CrawlTask:
        self.urls = source["urls"]
        self.user = source["user"]
        self.title = source["title"]
        self.creation_dt = source["creation_dt"]
        self.status = Status[source["status"].lower()]
        return self


def get_rq_connection() -> redis.client.Redis:
    return redis.Redis.from_url('redis://')


def get_rq_job(task_id: str) -> rq.job.Job | None:
    try:
        conn = get_rq_connection()
        rq_job = rq.job.Job.fetch(task_id, connection=conn)
    except redis.exceptions.RedisError as e:
        print(f"Fail to get task from redis queue, exception: {e}", file=sys.stderr)
        return None
    return rq_job


def get_task_progress(task_id) -> Status | None:
    job = get_rq_job(task_id)
    if not job:
        return None
    print(job)
    if job.is_failed:
        return Status.failed
    elif job.is_stopped or job.is_deferred:
        return Status.cancelled
    elif job.is_finished:
        return Status.finished
    elif job.is_started or job.is_queued:
        return Status.ongoing
    else:
        return None


class CrawlTaskRepository:

    def __init__(self, mongo_uri, mongo_user, mongo_pass, db_name, jobs_collection):
        self.client = pymongo.MongoClient(mongo_uri, username=mongo_user, password=mongo_pass)
        self.collection = self.client[db_name][jobs_collection]

    def new_task(self, urls: list[str], user: str, title: str) -> str:
        """
        Create a new crawling task in the tracking repository
        :param urls: starting urls of the crawling task
        :param user: identifier of the user initiated the crawl
        :param title: title of the crawling task
        :return: a task id used to identify the job
        """
        task = CrawlTask(urls, user, title)
        result = self.collection.insert_one(task.to_dict())
        return str(result.inserted_id)

    def get_task(self, task_id) -> CrawlTask | None:
        task = CrawlTask()
        task_dict = self.collection.find_one({"_id": ObjectId(task_id)})
        return task.from_dict(task_dict) if task_dict is not None else None

    def update_task(self, task_id: str, task: CrawlTask) -> pymongo.results.UpdateResult:
        return self.collection.replace_one({"_id": ObjectId(task_id)}, task.to_dict())

    def update_status(self, task_id: str, status: Status | None = None) -> pymongo.results.UpdateResult:
        if status is None:
            status = get_task_progress(task_id)
            raise ValueError(f"No status specified in argument, and no task with id {task_id} in rq")

        task = self.get_task(task_id)
        if task is None:
            raise ValueError(f"No task with id {task_id} in tracking database")
        task.status = status
        return self.update_task(task_id, task)

    def get_status(self, task_id: str) -> Status:
        task = self.get_task(task_id)
        if task is None:
            raise ValueError(f"No task with id {task_id} in tracking database")
        return self.get_task(task_id).status

    def kill_task(self, task_id: str) -> bool:
        job = get_rq_job(task_id)
        if not job:
            return False
        job.cancel()
        if job.is_started:
            conn = get_rq_connection()
            send_stop_job_command(conn, task_id)
        self.update_status(task_id, Status.cancelled)
        return True

    def get_all_tasks(self, user: str) -> [CrawlTask]:
        tasks = [CrawlTask().from_dict(task_dict) for task_dict in self.collection.find({"user": user})]
        return tasks


task_repository = CrawlTaskRepository(
    mongo_uri=settings.MONGO_URI,
    mongo_user=settings.MONGO_USERNAME,
    mongo_pass=settings.MONGO_PASSWORD,
    db_name=settings.MONGODB_DB,
    jobs_collection=settings.MONGODB_COLLECTION_JOBS
)

if __name__ == '__main__':
    task_repository.update_status("6228609ecb16a14c0a0b113d", Status.finished)
