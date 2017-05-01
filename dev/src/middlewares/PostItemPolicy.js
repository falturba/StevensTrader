
import Account from '../models/account'
import Items from '../models/item' 

export default (req,res,next) => {


	Account.findOne({token:req.token},{_id:1},function(err,acc){

		if(err)
		{
			console.log(err);
			res.status(500).json({status:"Internal database error"});
		}
		Items.count({userId:acc.id},function(err,c){
			if(err)
			{
				console.log(err);
				res.status(500).json({status:"internal error in the database"});
			}
			if(c)
				{
					if(c<5)
					{
						next();

					} 
					else res.status(406).json({status:"maximum three items per user"});
				}
			else
			{

				next();
			}

		});


	});


} 
