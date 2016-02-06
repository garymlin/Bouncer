import requests
import redis

RANDOM_WORD_COUNT = 4
EXPIRATION_TIME_SECONDS = 60
RANDOM_WORD_URL = 'http://randomword.setgetgo.com/get.php'

# prefixes to identify 'tables' in redis
KEYS_PREFIX = 'key:' # unused keys that can be used to verify checkins
PEOPLE_PREFIX = 'people:' # information on users from Facebook
LINEAGE_PREFIX = 'parent:' # who checked who in

db = redis.Redis()

def generate_key():
    print 'hi'
    l = []

    for i in range(0, RANDOM_WORD_COUNT):
        r = requests.get(RANDOM_WORD_URL)

        if (r.status_code == 200):
            l.append(r.text)

    return ' '.join(l)

def set_key(uid):
    unique_str = generate_key()
    print unique_str
    db.setex(KEYS_PREFIX + unique_str, uid, EXPIRATION_TIME_SECONDS)
    return unique_str

def verify_key(key):
    return db.exists(KEYS_PREFIX + key)

def confirm_registration(key, uid):
    parent_uid = db.get(KEYS_PREFIX + key_str) 
    db.delete(KEYS_PREFIX + key)
    db.set(LINEAGE_PREFIX + uid, parent_uid)

def store_person(uid, metadata):
    db.set(PEOPLE_PREFIX + uid, metadata)

def get_person(uid):
    return db.get(uid)
