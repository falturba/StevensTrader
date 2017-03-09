let dbPath
if( process.env.NODE_ENV=='test'){
    dbPath = 'mongodb://ds023644.mlab.com:23644/stevenstradersystem_test'
}else{
    dbPath = 'mongodb://ds139959.mlab.com:39959/stevenstradersystem'
}
export {dbPath}