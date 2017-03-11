import {SupportData} from './SupportData';

import {Design} from './Design';
import {DesignerAddInfo} from './DesignerAddInfo';

import {DesignerQualiCerti} from './DesignerQualiCerti';
import {DesignerBillingInfo} from './DesignerBillingInfo';

import {DesignerPref} from './DesignerPref';
import {DesignerStore} from './DesignerStore';



export type DesignerData = {
	Brand_Name : string,
	Banner_Photo : string,
	Logo : string,
	Alternate_Email : string,
	About_Store : DesignerStore,
	QualiCerti : DesignerQualiCerti,
	Story : string,
	designs : Design []
}


// //old data
// language: string,
// 	currency: string,
// 	brand_name: string,
// 	brand_logo: string,
// 	store_name: string,
// 	store_image: string,
// 	alternate_email: string,
// 	store_start_date: Date,
// 	store_registration_number: string,
// 	no_of_employees: number,
// 	designer_qualification: string,
// 	designer_story: string,
// 	//portfolio: 
// 	//permissions
// 	//specialities
// 	//legal_disputes
// 	support: SupportData