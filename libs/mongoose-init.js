/**
 * Created by exit on 10/5/16.
 */
var mongoose = require('mongoose');
var options = {
    db: { native_parser: true },
    server: { poolSize: 5 },
    replset: { rs_name: 'myReplicaSetName' },
    user: 'dbuser',
    pass: 'strader@123'
}
mongoose.connect("ds139959.mlab.com:39959/stevenstradersystem", options);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Establish database connection successfully.");
});

/******************************************
 **************** set port ********************
 ******************************************/
/*var listener = app.listen(3000, function(){
    console.log('Listening on port ' + listener.address().port); //Listening on port 3000
});*/