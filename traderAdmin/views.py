from admin import admin,mongo
from flask import render_template # necessary libraries and files

#db.accounts.find({},{name:1, email: 1, _id:0})
@admin.route('/users')
def users():
    accts= mongo.db.accounts.find({},{'name':1, 'email': 1, '_id':0})# query for user info 
    return render_template('index.html',
                            accounts=accts)# render html in users route