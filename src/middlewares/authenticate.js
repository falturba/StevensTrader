import jwt from 'jsonwebtoken';
//import mongodb from 'mongodb';
import config from '../config/jwtConfig';
import Account from '../models/account';

export default (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];
  let token;

  if (authorizationHeader) {
    token = authorizationHeader.split(' ')[1];
  }

  if (token) {
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: 'Failed to authenticate' });
      } else {
        let account = new Account({...decoded});
        Account.findOne({
            _id:decoded.id,
            name:decoded.name,
            email:decoded.email,
        }, function(error, data){
            if(error){
                res.status(401).json({ errors: { form: 'There is database connection problem, please try again.' } });
            }else if(data){
                next();
            }else{
                //not found user in server
                res.status(401).json({ error: 'Failed to authenticate' });
            }
        });
        }
      }
    );
  } else {
    res.status(403).json({
      error: 'No token provided'
    });
  }
}