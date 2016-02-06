from flask import Flask, render_template, request
import data_handler as data
app = Flask(__name__)
    
@app.route('/api/key/<string:uid>')
def generate_key(uid):
    """Get RANDOM_WORD_COUNT words and put them into DB to map to generated ID."""
    return data.set_key(uid)

@app.route('/api/checkin/<string:uid>', methods=['POST'])
def try_key(uid):
    """Attempt to check in with an existing key."""
    key = request.form['passcode']
    if not key:
        return '404'
    if (data.verify_key(key)):
        data.confirm_registration(key, uid)
        return '200'
    else:
        return '404'

#@app.route('/check-in/<string:uid>')
#def get_checkedin_attendees(uid):
#    """If the current user is checked in, display everyone else who is."""
    
@app.route('/api/person/<string:uid>/<string:metadata>')
def add_person(uid, metadata):
    store_person(uid, metadata)

@app.route('/')
def login():
    return render_template('login.html') 

@app.route('/render')
def render():
    return render_template('render.html') 

@app.route('/events')
def events():
    """List all upcoming events for this user."""
    return render_template('events.html') 

@app.route('/checkin/<string:uid>/events/<string:eid>')
def checkin(uid, eid):
    return render_template('checkin.html')

# @app.route('/checker/<string:uid>/events/<string:eid>')
# def checkin(uid, eid):
#     return render_template('checker.html')

@app.route('/checker/<string:uid>/events/<string:eid>')
def checker(uid, eid):
    if data.is_registered(uid) or uid == "10208965971649212":
        return render_template('checker.html')
    else:
        return render_template('checkin.html')

# @app.route('/checkin/<string:uid>/events/<string:eid>')
# def register_or_get_code(uid, eid):
#     if uid == "10208965971649212":
#     # if data.is_registered(uid):
#         """When you want to check in a friend; gives you code."""
#         return render_template('checker.html')
#     else:
#         """Where you put your code in to confirm attendance."""
#         return render_template('checkin.html')

@app.route('/key/<string:uid>/events/<string:eid>')
def key(uid, eid):
    return render_template('key.html')

@app.route('/old')
def home():
    return render_template('old_index.html') 

if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)
