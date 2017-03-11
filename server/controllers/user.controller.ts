import {Customer} from '../models/User/Customer';
import {UserInfo} from '../models/types/UserInfo';
import {SocialData} from '../models/types/SocialData';
import {VerificationData} from '../models/types/VerificationData';
import {UserProfileData} from '../models/types/UserProfileData';
import {Address} from '../models/types/Address';
import {Favourites} from '../models/types/Favourites';
import * as bcrypt from 'bcryptjs';

/**
 * UserController class is for RESTful user API using CRUD operations
 *
 */
export class UserController 
{
	//load () loads Customer object into the memory for further operations
	public load (req, res, next, id) 
	{
		//extracts customer object from the database using user ID.
		Customer.getOne (id, function (err, user:Customer) 
		{
			if (err)
			{
				res.json ({
							success: false,
							error_code: 91911,
							general_message: 'User record is not found.',
	
							errors: 
							{
									User: "User doesn't exist or is already deleted.",
									Method: "Customer.getOne",
									Class: "UserController"
							}
						});
							
				return next (err);
			}
			else 
			{
				req.loadedUser = user;
				return next();
			}
		}); //Customer.getOne
	} //load

	/**
	 * GET /api/user/:userID
	 * Return the user's information of given userID.
	 * This API is used to get all the information of the registered user of given userID.
	*/
	public getUser (req, res) 
	{

		let user: Customer = req.loadedUser;

		if ((user !== undefined) || (user != null))
		{
			return res.json ({"success" : true, "getUser_result" :  user});
		}
	
		return res.status(400).json (
						{
							success: false,
							error_code: 91911,
							general_message: 'The User record is not found.',
	
							errors: 
							{
									User: "The User doesn't exist or may already be deleted.",
									Method: "getUser",
									Class: "UserController"
							}
						});
	}

	/**
	 * POST /api/user/:userID
	 * This API is used to update the record of the registered user of given userID into the database.
	*/
	public update (req, res) 
	{
		/* req.user object is already in memory 
		because of above load() method*/ 
		let user: Customer = req.loadedUser;  
		//TODO: should modify if user is undefined (record not found). like delete or getone or lis

		// if ((user === undefined) || (user === null))
		// {
		// 	return res.json ({message : 'User may already be deleted or It does NOT exist.'});
		// }

		/* data validation (name, email, password etc.) */
		if (typeof(req.body.name) != "undefined" || req.body.name != null)
		{
			user.user_info.name = req.body.name;
		}
		
		if (typeof(req.body.email) != "undefined" || req.body.email != null)
		{
			user.user_info.email = req.body.email;
		}
		
		if (typeof(req.body.password) != "undefined" || req.body.password != null)
		{
			user.user_info.password = bcrypt.hashSync( req.body.password, bcrypt.genSaltSync(10) );
		}
		
		
		if (typeof(req.body.date_of_birth) != "undefined" || req.body.date_of_birth != null)
		{
			user.user_info.date_of_birth = new Date (req.body.date_of_birth);
		}
				 
		if (typeof(req.body.date_of_anniversary) != "undefined" || req.body.date_of_anniversary != null)
		{
			user.user_info.date_of_anniversary = new Date (req.body.date_of_anniversary);
		}

		
		if (typeof(req.body.gender) != "undefined" || req.body.gender != null)
		{
			user.user_info.gender = req.body.gender;
		}
		
		
		if (typeof(req.body.social) != "undefined" || req.body.social != null)
		{
			user.user_info.social = req.body.social;
		}
		
		if (typeof(req.body.tc) != "undefined" || req.body.tc != null)
		{
			user.user_info.tc = req.body.tc;
		}
	
		if (typeof(req.body.mobile_number) != "undefined" || req.body.mobile_number != null)
		{
			user.user_info.mobile_number = req.body.mobile_number;
		}
		
		if (typeof(req.body.verified) != "undefined" || req.body.verified != null)
		{
			user.user_info.verified = req.body.verified;
		}
		
		if (typeof(req.body.active) != "undefined" || req.body.active != null)
		{
			user.user_info.active = req.body.active;
		}
		
		if (typeof(req.body.last_login) != "undefined" || req.body.last_login != null)
		{
			user.user_info.last_login = new Date (req.body.last_login);
		}
		
		if (req.body.ip_address !== null || req.body.ip_address !== "")
		{
			user.user_info.ip_address = req.body.ip_address;
		}
		
		if (typeof(req.body.mac_address) != "undefined" || req.body.mac_address != null)
		{
			user.user_info.mac_address = req.body.mac_address;
		}
		
		if (typeof(req.body.browser_string) != "undefined" || req.body.browser_string != null)
		{
			user.user_info.browser_string = req.body.browser_string;
		}
		
		if (typeof(req.body.profile_pic) != "undefined" || req.body.profile_pic != null)
		{
			user.profile.profile_pic = req.body.profile_pic;
		}
		
		if (typeof(req.body.address) != "undefined" || req.body.address != null)
		{
			user.profile.address = req.body.address;
		}
		
		if (typeof(req.body.role) != "undefined" || req.body.role != null)
		{
			user.profile.role = req.body.role;
		}
		
		if (typeof(req.body.capabilities) != "undefined" || req.body.capabilities != null)
		{
			user.profile.capabilities = req.body.capabilities;
		}
		
		if (typeof(req.body.favourites) != "undefined" || req.body.favourites != null)
		{
			user.profile.favourites = req.body.favourites;
		}
	
		user.update( (err, result) => {
			if( err ) 
				return res.status(400).json (
						{
							success: false,
							error_code: 91912,
							general_message: 'Error has occured.',
	
							errors: 
							{
									User: "User doesn't exist or is already deleted.",
							}
						});
			else
				return res.json ({"success" : true, "update_result" : result});
		});
	} //update		 	

	/**
	 * GET /api/user
	 * This API is used to get the list of all the information of all the registered users at Korsall database
	*/
	public list (req, res) 
	{
		Customer.list ((err, customers) => 
		{
			if (err)
			{
				return res.status(400).json (
						{
							success: false,
							error_code: 91911,
							general_message: 'Lis not found.',
	
							errors: 
							{
									msg: "data base connection etc...",
									method: "list",
									class: "UserController"
							}
						});
			}
			else
			{
				console.log (customers);
				return res.json ({"success" : true, "list_result" : customers});
			}
		}); //Customer.list
	} //list
			
	/**
	 * DELETE /api/user/:userID
	 * Delete the user record of the given userID from the registration database.  
	*/
	public remove (req, res) 
	{
		let user: Customer = req.loadedUser;

		//console.log ("user.controller - In side remove method- user: " + user);

		console.log ("user.controller - remove method- if condition (user is NOT undefined or null).  user: " + user);

		if (user !== undefined)
		{
			user.delete( (err, result) => 
			{
				//console.log ("1. user.controller - remove method-  user.delete( (err, result, val) err:  " + err);
				//console.log ("2. user.controller - remove method-  user.delete( (err, result, val) result:  " + result);
				//console.log ("3. user.controller - remove method-  user.delete( (err, result, val) val:  " + val);
				
				if (err) 
				{
					return res.status(400).json (
						{
							success: false,
							error_code: 91911,
							general_message: 'The User record is not found.',
	
							errors: 
							{
									User: "The User doesn't exist or may already be deleted.",
									Method: "user.delete",
									Class: "UserController"
							}
						});
				}
				else 
				{
					return res.json ({"success" : true, "message": "User is deleted.", "remove_result" : result});
				}
			});
		}
		else
		{
			return res.status(400).json (
						{
							success: false,
							error_code: 91915,
							general_message: 'The User record is not found.',
	
							errors: 
							{
									User: "The User doesn't exist or may already be deleted.",
									condition: "The User is undefined.",
									Method: "user.delete",
									Class: "UserController"
							}
						});
		}


	}
	
} // UserController