import requests
import redis
import sys

RANDOM_WORD_COUNT = 1 
EXPIRATION_TIME_SECONDS = 60
RANDOM_WORD_URL = 'http://randomword.setgetgo.com/get.php'

# prefixes to identify 'tables' in redis
KEYS_PREFIX = 'key:' # unused keys that can be used to verify checkins
PEOPLE_PREFIX = 'people:' # information on users from Facebook
LINEAGE_PREFIX = 'parent:' # who checked who in

db = redis.Redis()
try:
    db.client_list()
except redis.ConnectionError:
    print 'Redis not running.'
    sys.exit(0)

def generate_key():
    l = []

    for i in range(0, RANDOM_WORD_COUNT):
        r = requests.get(RANDOM_WORD_URL)

        if (r.status_code == 200):
            l.append(r.text)

    return ' '.join(l)

def set_key(uid):
    unique_str = generate_key()
    db.setex(KEYS_PREFIX + unique_str, uid, EXPIRATION_TIME_SECONDS)
    return unique_str

def verify_key(key):
    return db.exists(KEYS_PREFIX + key)

def confirm_registration(key, uid):
    parent_uid = db.get(KEYS_PREFIX + key) 
    db.delete(KEYS_PREFIX + key)
    db.set(LINEAGE_PREFIX + uid, parent_uid)

def is_registered(uid):
    return db.exists(LINEAGE_PREFIX + uid)

def store_person(uid, metadata):
    db.set(PEOPLE_PREFIX + uid, metadata)

def get_person(uid):
    return db.get(uid)
