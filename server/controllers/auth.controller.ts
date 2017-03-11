import {Customer} from '../models/User/Customer';
import {UserInfo} from '../models/types/UserInfo';
import {SocialData} from '../models/types/SocialData';
import {VerificationData} from '../models/types/VerificationData';


import * as jwt from "jsonwebtoken";
import * as httpStatus from "http-status";
import * as APIError from '../helpers/APIError';
import * as bcrypt from "bcryptjs";
import * as util from 'util';
import config from '../../config/env';


/**
 * AuthController class is to authenticate user 
 *
 */
export class AuthController 
{
	/**
	 * login () logins the user 
	 *
	 * @param <string> email - user email address
	 * @param <string> password - user password 
	 * @return <JSON> message - json respond (err or jw token) 
	 */
	public login (req, res, next) 
	{

		//user email validation
		let reqUserEmail: string;
		if (req.body.email !== null || req.body.email !== "")
		{
			reqUserEmail = req.body.email;
		}
		else
		{
			return (res.json ({message : 'User name name is NUll or empty'}));
		}

		//user password validation
		let reqPassword: string;
		if (req.body.password !== null || req.body.password !== "")
		{
			reqPassword = req.body.password;
		}
		else
		{
			return (res.json ({message : 'Password name is NUll or empty'}));
		}

		//extract the customer recrod from the database of the given email address (unique field)
		Customer.getOneByEmail (reqUserEmail, function (err, customer: Customer)
		{
			if (err) 
			{  
				console.log ("Customer-static-getOne-getConnection has an error: " + err);
				return (res.json ({email : 'Customer.getOneByEmail NOT OK'}));
			}
			else
			{
				console.log ("The output of Customer.getOneByEmail is Customer: " + util.inspect(customer));

				//compare user entered password to database stored password if both
				//password match, return jw login token.
				if( bcrypt.compareSync(reqPassword, customer.user_info.password) ) {
					const token = jwt.sign ({
						user: customer,
					}, config.jwt_secret );

					return res.json ({
						token,
						user_id: customer.id
					});
				} else {
					res.statusCode = 400;
					return res.json({
						message: 'Password is incorrect',
					});
				}		
			} 
		});
	} 

	/**
	 * register () registers the user into the database 
	 *
	 * @param <string> name - user name
	 * @param <string> email - user email address
	 * @param <string> password - user password 
	 * @return <JSON> message - json respond (err or jw token) 
	 */
	public register (req, res, next) 
	{

		//user data validation (name, email, DOB etc.)
		let reqName: string;
		if (req.body.name !== null || req.body.name !== "")
		{
			reqName = req.body.name;
		}

		let reqEmail: string;
		if (req.body.email !== null || req.body.email !== "")
		{
			reqEmail = req.body.email;
		}

		let reqPassword: string;
		if (req.body.password !== null || req.body.password !== "")
		{
			reqPassword = bcrypt.hashSync( req.body.password, bcrypt.genSaltSync(10) );
		}
	
		let reqDateOfBirth: Date;
		if (req.body.date_of_birth !== null || req.body.date_of_birth !== "")
		{
			reqDateOfBirth = new Date (req.body.date_of_birth);
		}

		let reqDateOfAnniversary: Date;
		if (req.body.date_of_anniversary !== null || req.body.date_of_anniversary !== "")
		{
			reqDateOfAnniversary = new Date (req.body.date_of_anniversary);
		}

		let reqGender: number;
		if (req.body.gender !== null || req.body.gender !== "")
		{
			reqGender = req.body.gender;
		}

		let reqSocial: SocialData[];
		if ((req.body.social !== null) || (req.body.social !== ""))
		{
			reqSocial = req.body.social;
		}

		let reqTc: boolean;
		if (req.body.tc !== null || req.body.tc !== "")
		{
			reqTc = req.body.tc;
		}

		let reqMobile: number;
		if (req.body.mobile_number !== null || req.body.mobile_number !== "")
		{
			reqMobile = req.body.mobile_number;
		}

		let reqVerified: VerificationData[];
		if ((req.body.verified !== null) || (req.body.verified !== "") )
		{
			reqVerified = req.body.verified;
		}

		let reqActive: boolean;
		if (req.body.active !== null || req.body.active !== "")
		{
			reqActive = req.body.active;
		}

		let reqLastLogin: Date;
		if (req.body.last_login !== null || req.body.last_login !== "")
		{
			reqLastLogin = new Date (req.body.last_login);
		}

		let reqIPAddress: string;
		if (req.body.ip_address !== null || req.body.ip_address !== "")
		{
			reqIPAddress = req.body.ip_address;
		}

		let reqMAC_Address: string;
		if (req.body.mac_address !== null || req.body.mac_address !== "")
		{
			reqMAC_Address = req.body.mac_address;
		}

		let reqBrowserString: string;
		if (req.body.browser_string !== null || req.body.browser_string !== "")
		{
			reqBrowserString = req.body.browser_string;
		}

		let user_info: UserInfo = 
		{
			name: reqName,
			email: reqEmail,
			password: reqPassword,
			date_of_birth: reqDateOfBirth,
			date_of_anniversary: reqDateOfAnniversary,
			gender: reqGender,
			social: reqSocial,
			tc: reqTc,
			mobile_number: reqMobile,
			verified: reqVerified,
			active: reqActive,
			last_login: reqLastLogin,
			ip_address: reqIPAddress,
			mac_address: reqMAC_Address,
			browser_string: reqBrowserString,
		}
		
		let currentUser = new Customer (null, user_info);

		//save (insert) object into the database (registered user)
		currentUser.save (function (err, val)
		{
			if (err)
			{
				return res.json ({message : "User is NOT registered."});
			}

			return res.json ({message : "User is registered."});
		});
	}
}