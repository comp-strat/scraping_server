import shutil

import pymongo
import gridfs
import os
import csv
import server.settings as settings
from shutil import make_archive
from tempfile import TemporaryDirectory
from bson import ObjectId

db = pymongo.MongoClient(
    settings.MONGO_URI, username=settings.MONGO_USERNAME,
    password=settings.MONGO_PASSWORD
)[settings.MONGO_DB]


def bucket_export(folder, bucket_name, job_id):
    bucket_folder_path = os.path.join(folder, f"{bucket_name}/")
    os.makedirs(os.path.dirname(bucket_folder_path), exist_ok=True)
    fs = gridfs.GridFSBucket(db, bucket_name)
    for f in fs.find({"job_id": job_id}):
        with open(os.path.join(bucket_folder_path, f.filename), "wb") \
                as local_file:
            fs.download_to_stream(f._id, local_file)


def items_export(folder, job_id):

    # if db[settings.MONGO_COLLECTION_ITEMS].count_documents({"job_id": job_id}) == 0:
    #     return

    collection = db[settings.MONGO_COLLECTION_ITEMS]

    if collection.count_documents({"job_id": job_id}) == 0:
        return

    docs = collection.find({"job_id": job_id})

    fields = list(docs[0].keys())
    output_file = os.path.join(folder, f"{job_id}.csv")
    with open(output_file, "w", newline='') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fields, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(docs)


def get_zip(job_id: str) -> str:
    dir_path = os.path.dirname(os.path.realpath(__file__))
    result_file_path = os.path.join(dir_path, "results", job_id)
    with TemporaryDirectory() as temp_dir:
        bucket_export(temp_dir, settings.MONGO_BUCKET_IMAGES, job_id)
        bucket_export(temp_dir, settings.MONGO_BUCKET_FILES, job_id)
        items_export(temp_dir, job_id)
        shutil.make_archive(result_file_path, "zip", temp_dir)

    return f"{result_file_path}.zip"
