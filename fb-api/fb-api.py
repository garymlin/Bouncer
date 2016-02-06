import facebook
import requests
import urllib
import urlparse
import subprocess

# secret shit
app_id = '1678482825757904'
app_secret = '11bccf91e778b59b56965580724542fc'
access_token = 'CAAX2kjyXRNABAAJb55LBvTJLqpFY4P6UW8mz48kJ8B1sVlhuG00yIhDY2V5se4M1aQYMMNqzcUqPYTTXLcz6RftlUpcwevI2zI4CKQP2X6itHlvnz8g1fg9j7iEH9lvHkGyRn7J9daonyCQJ6taBad6FRZAj9PZCCBQ8ErLZAYdZApu8p7toT59Q30dTX1uOUtWnzpBeLhcWs0nnBSIV'

graph = facebook.GraphAPI(access_token= access_token)

user = graph.get_object("me")
extended_token = graph.extend_access_token(app_id = app_id, app_secret = app_secret)


friends = graph.get_connections(id='me', connection_name='friends')

# event = graph.get_object("events")

r = requests.get("https://graph.facebook.com/v2.5/10207677670636362/events")

print user
print friends
# print event

