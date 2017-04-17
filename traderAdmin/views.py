from admin import admin
from admin import mongo
from flask import render_template # necessary libraries and files

@admin.route('/users')
def users():
    accounts= mongo.db.accounts.find()# query for user info
    return render_template('indexA.html',
                            accounts=accounts)# render html in users route