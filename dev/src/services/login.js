import express from 'express';
import bodyParser from "body-parser";
import Account from '../models/account';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/jwtConfig';

let router = express.Router();
router.use(bodyParser.json());


router.post('/login',function(req,res){
    console.log("services/login", req.body);
    const { email, password } = req.body;
    Account.findOne({
        email:email
    }, function(error, data){
        if(error){
            res.status(500).json({ errors: { form: 'There is database connection problem, please try again.' } });
            return;
        }else if(data){
            var account = new Account(data);
            if(account.statusCheck(account.status))
            {
                 var isCorrectPassword = account.validPassword(password);
            //check hash password
            if(isCorrectPassword){
                const token = jwt.sign({
                    id: account._id.toString(),
                    name: account.name,
                    email: account.email
                }, config.jwtSecret);
                console.dir(account._id.toString());
                
                Account.update(account,{token:token}).exec();
                res.json({ token });
            }else{
                res.status(401).json({ errors: { form: 'Password incorrect.' } });
            }
        } else
        {
            res.status(401).json({ errors: { form: 'user is suspended' } });
        }
           
        }else{
            res.status(401).json({ errors: { form: 'Cannot find user.' } });
        }
    });
});

//can not use [export default] because the server.js use recursive require()
module.exports = router;