import pymongo
import gridfs
from server import settings
from tempfile import TemporaryDirectory
from os.path import join
import shutil
import time

def gridfs_bucket(db,foldername, bucket, rq_id):
    fs = gridfs.GridFSBucket(db,bucket)
    for f in fs.find({"rq_id":rq_id}):
       with open(join(foldername,f.filename),"wb") as localfile:
           fs.download_to_stream(f._id, localfile)


def url_to_filename(s):
    s = s.replace("/","|")
    return "".join( x for x in s if (x.isalnum() or x in "|._- "))


def text_collection(db,foldername, collection, rq_id):
    records = db[collection]
    for f in records.find({"rq_id":rq_id}):
        filename = url_to_filename(f["url"])+".txt"
        with open(join(foldername,filename),"w") as localfile:
            localfile.write(f["text"])


def getzip(job_id: str):
    connection = pymongo.MongoClient(
                settings.MONGO_URI,
                username = settings.MONGO_USERNAME, 
                password = settings.MONGO_PASSWORD
            )
    db = connection[settings.MONGO_DB]
    with TemporaryDirectory() as temp_dir:
        gridfs_bucket(db, temp_dir, settings.MONGO_BUCKET_IMAGES, rq_id)
        gridfs_bucket(db, temp_dir, settings.MONGO_BUCKET_FILES, rq_id)
        text_collection(db, temp_dir, settings.MONGO_COLLECTION_TEXT, rq_id)
        zip_path = join("crawled_data_", "files", rq_id+'_'+str(time.time()))
        shutil.make_archive(zip_path, 'zip', temp_dir)

    return zip_path + ".zip"
