import {Customer} from '../models/User/Customer';
import {UserInfo} from '../models/types/UserInfo';
import {SocialData} from '../models/types/SocialData';
import {VerificationData} from '../models/types/VerificationData';
import {UserProfileData} from '../models/types/UserProfileData';
import {Address} from '../models/types/Address';
import {Favourites} from '../models/types/Favourites';
import * as bcrypt from 'bcryptjs';

import {Designer} from '../models/User/Designer';
import {DesignerData} from '../models/types/DesignerData';
import {DesignerPref} from '../models/types/DesignerPref';

import {DesignerBillingInfo} from '../models/types/DesignerBillingInfo';
import {DesignerAddInfo} from '../models/types/DesignerAddInfo';
import {Design} from '../models/types/Design';
import {DesignerStore} from '../models/types/DesignerStore';
import {DesignerQualiCerti} from '../models/types/DesignerQualiCerti';

/**
 * DesignerDetailController class is for RESTful designer API using CRUD operations
 *
 */
export class DesignerAddInfoController 
{
	//load () loads Designer object into the memory for further operations
	public load (req, res, next, id) 
	{
		//extracts designer object from the database using user ID.
		Designer.getOne (id, function (err, designer:Designer) 
		{
			if (err)
			{
				res.json ({
							success: false,
							error_code: 91911,
							general_message: 'Designer record is not found.',
	
							errors: 
							{
									User: "Designer doesn't exist or is already deleted.",
									Method: "Designer.getOne",
									Class: "DesignerAddInfoController"
							}
						});
							
				return next (err);
			}
			else 
			{
				req.loadedDesigner = designer;
				return next();
			}
		}); //Designer.getOne
	} //load

	/**
	 * GET /api/designer/:userID
	 * Return the designer's information of given userID.
	 * This API is used to get all the information of the registered designer of given userID.
	*/
	public getDesigner (req, res) 
	{

		let designer: Designer = req.loadedDesigner;

		if ((designer !== undefined) || (designer != null))
		{
			return res.json ({"success" : true, "getDesigner_result" :  designer});
		}
	
		return res.status(400).json (
						{
							success: false,
							error_code: 91911,
							general_message: 'The Designer record is not found.',
	
							errors: 
							{
									User: "The designer doesn't exist or may already be deleted.",
									Method: "getDesigner",
									Class: "DesignerAddInfoController"
							}
						});
	}

	
    public updateDesignerAdditionalInfo (req, res) 
	{
		/* req.user object is already in memory 
		because of above load() method*/ 
		let designer: Designer = req.loadedDesigner;  


		/* data validation (name, email, password etc.) */
		if (typeof(req.body.Require_Warehouse) != "undefined" || req.body.Require_Warehouse != null)
		{
			designer.AdditionalInfo.Require_Warehouse = req.body.Require_Warehouse;
		}

        if (typeof(req.body.Require_Shipping_Service) != "undefined" || req.body.Require_Shipping_Service != null)
		{
			designer.AdditionalInfo.Require_Shipping_Service = req.body.Require_Shipping_Service;
		}

        if (typeof(req.body.Require_Manufacturer_Support) != "undefined" || req.body.Require_Manufacturer_Support != null)
		{
			designer.AdditionalInfo.Require_Manufacturer_Support = req.body.Require_Manufacturer_Support;
		}

        
		designer.updateAdditionalInfo ( (err, result) => {
			if( err ) 
				return res.status(400).json (
						{
							success: false,
							error_code: 91912,
							general_message: 'Error has occured.',
	
							errors: 
							{
									User: "Designer doesn't exist or is already deleted.",
							}
						});
			else
				return res.json ({"success" : true, "DesignerAddInfoController_result" : result});
		});
	} //updateDesignerBillingInfo		 	



	/**
	 * GET /api/designer
	 * This API is used to get the list of all the information of all the registered designer at Korsall database
	*/
	public list (req, res) 
	{
		Designer.list ((err, designers) => 
		{
			if (err)
			{
				return res.status (400).json (
						{
							success: false,
							error_code: 91911,
							general_message: 'List not found.',
	
							errors: 
							{
									msg: "data base connection etc...",
									method: "list",
									class: "DesignerAddInfoController"
							}
						});
			}
			else
			{
				console.log (designers);
				return res.json ({"success" : true, "list_result" : designers});
			}
		}); //Designer.list
	} //list
			
	/**
	 * DELETE /api/designer/:userID
	 * Delete the designer record of the given userID from the registration database.  
	*/
	public remove (req, res) 
	{
		
	}
	
} // DesignerController