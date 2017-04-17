from flask import Flask
from flask_pymongo import PyMongo,pymongo

admin = Flask(__name__) # initiate flask instance called admin

admin.config.from_pyfile('config.py')# connection imported thru this line
#admin.config['MONGO_DBNAME']="stevenstradersystem"
#admin.config['MONGO_URI']="mongodb://dbuser:strader%40123@ds139959.mlab.com:39959/stevenstradersystem"


mongo= PyMongo(admin) # instance of db called mongo

from views import * # taken from views.py

if __name__ ==  '__main__':
    admin.run(debug= True)
