from flask import Flask, render_template
import data_handler as data
app = Flask(__name__)

@app.route('/key/<string:uid>')
def generate_key(uid):
    """Get RANDOM_WORD_COUNT words and put them into DB to map to generated ID."""
    return data.set_key(uid)

@app.route('/check-in/<string:uid>/<string:key>')
def try_key(uid):
    """Attempt to check in with an existing key."""
    if (data.key_exists(key)):
        data.confirm_registration(key)
        return '200 OK'
    else:
        return '404 Not Found'

@app.route('/person/<string:uid>/<string:metadata>')
def add_person(uid, metadata):
    store_person(uid, metadata)

@app.route('/')
def login():
    return render_template('login.html') 

@app.route('/events')
def events():
    return render_template('events.html') 

@app.route('/old')
def home():
    return render_template('old_index.html') 

if __name__ == '__main__':
    app.run(host="0.0.0.0")
