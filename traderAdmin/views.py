from admin import admin,mongo
from flask import render_template,request # necessary libraries and files
import bson.objectid

@admin.route('/users', methods=['GET', 'POST'])
def users():
    if request.method == 'POST':# if method is post
        user_id= request.form['user_id'] # id from html post
        # query to find one user with user_id posted from front end
        check= mongo.db.accounts.find_one({"_id":bson.objectid.ObjectId(user_id)},{"status":1,"_id":1})
        if str(check['_id']) == user_id:
            if check['status'] == u'active': # check status and update
                mongo.db.accounts.update({"_id":bson.objectid.ObjectId(user_id)},{"$set":{'status':'suspended'}})
            elif check['status'] == u'suspended': #check status and update
                mongo.db.accounts.update({"_id":bson.objectid.ObjectId(user_id)},{"$set":{'status':'active'}})
            else: 
                pass
        else:
            pass    
    #else get query and render in front end            
    # query for user info    
    accts= mongo.db.accounts.find({},{'name':1, 'email': 1,'status':1, '_id':1}) 
    return render_template('indexA.html',
                            accounts=accts)# render html in users route