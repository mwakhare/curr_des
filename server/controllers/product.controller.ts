import * as getConnection from '../../config/db.service';
import {Product} from '../../server/models/Product/Product';
import {ProductInfo} from '../models/types/ProductInfo';
import {AttributesData} from '../../server/models/types/AttributesData';
import {StockData} from '../../server/models/types/StockData';
import {SalePriceData} from '../../server/models/types/SalePriceData';
import * as util from 'util';

/**
 * ProductController class is for RESTful product API using CRUD operations
 *
 */

export class ProductController 
{

	//load () loads Product object into the memory for further operations
	public load( req, res, next, id) {
	//extracts Product object from the database using product ID.
		Product.getOneProduct(id, function(err, product)
		{
			if(err) {
				return res.json(err);
			}
			else {
				req.loadedProduct = product;
				return next();
			}
		});//Product.getOne
	}//load

	/**
	 * GET /api/product/:productID
	 * Return the product's information of given productID.
	 * This API is used to get all the information of the product of given productID.
	*/
	
	public getProduct (req, res)
	{
		return res.json(req.loadedProduct);
	}

	/**
	 * GET /api/product
	 * This API is used to get the list of all the information of all the product at Korsall database.
	*/

	public list(req, res) 
	{
		Product.list((err, products) => {
			if(err)
				return res.json(err);
			else
				return res.json(products);
		}); //Product.list
	} //list

	/**
	* save  product  into the database 
	* @param <string> name - product name
	* @param <string> sku_number - product sku_number
	* @param <number> price - product price 
	*/
	public product_save (req, res, next) 
	{
		//product data validation (name,sku_number,price etc.)
		let name: string;
		if (req.body.name !== null || req.body.name !== "")
		{
			name = req.body.name;
		}

		let sku_number: string;
		if (req.body.sku_number !== null || req.body.sku_number !== "")
		{
			sku_number = req.body.sku_number;
		}

		let description: string;
		if (req.body.description !== null || req.body.description !== "")
		{
			description = req.body.description;
		}

		let price: number;
		if (req.body.price !== null || req.body.price !== "")
		{
			price = req.body.price;
		}

		let category_id1:number;
		if (req.body.category_id1 !== null || req.body.category_id1 !== "")
		{
			category_id1 = req.body.category_id1;
		}
		let category_id2:number;
		if (req.body.category_id2 !== null || req.body.category_id2 !== "")
		{
			category_id2 = req.body.category_id2;
		}

		let category_id:number[];
		category_id =[category_id1,category_id2];

		let featured_image:string;
		if (req.body.featured_image !== null || req.body.featured_image !== "")
		{
			featured_image = req.body.featured_image;
		}

		let image_gallery1:string;
		if (req.body.image_gallery1 !== null || req.body.image_gallery1 !== "")
		{
			image_gallery1 = req.body.image_gallery1;
		}

		let image_gallery2:string;
		if (req.body.image_gallery2 !== null || req.body.image_gallery2 !== "")
		{
			image_gallery2 = req.body.image_gallery2;
		}


		let img_gallery = [image_gallery1,image_gallery2];
		let image_gallery:string[];
			image_gallery = img_gallery;

		let type:string;
		if (req.body.type !== null || req.body.type !== "")
		{
			type = req.body.type;
		}


		let color_value1:string[];
		if (req.body.color_value1 !== null || req.body.color_value1 !== "")
		{
			color_value1 = req.body.color_value1;
		}

		let color_variable:boolean;
		if (req.body.color_variable !== null || req.body.color_variable !== "")
		{
			color_variable = req.body.color_variable;
		}
		
		let color = {value:color_value1,variable:color_variable};

		let size_value1:string;
		if (req.body.size_value1 !== null || req.body.size_value1 !== "")
		{
			size_value1 = req.body.size_value1;
		}

		let size_value2:string;
		if (req.body.size_value2 !== null || req.body.size_value2 !== "")
		{
			size_value2 = req.body.size_value2;
		}
		let size_value3:string;
		if (req.body.size_value3 !== null || req.body.size_value3 !== "")
		{
			size_value3 = req.body.size_value3;
		}
		let size_value4:string;
		if (req.body.size_value3 !== null || req.body.size_value4 !== "")
		{
			size_value4 = req.body.size_value4;
		}
		let size_value5:string;
		if (req.body.size_value5 !== null || req.body.size_value5 !== "")
		{
			size_value5 = req.body.size_value5;
		}
		let size_value6:string;
		if (req.body.size_value6 !== null || req.body.size_value6 !== "")
		{
			size_value6 = req.body.size_value6;
		}
		let size_value7:string;
		if (req.body.size_value7 !== null || req.body.size_value7 !== "")
		{
			size_value7 = req.body.size_value7;
		}

		let size_val :string[];
		size_val =[size_value1,size_value2,size_value3,size_value4,size_value5,size_value6,size_value7];

		let size_variable:boolean;
		if (req.body.size_variable !== null || req.body.size_variable !== "")
		{
			size_variable = req.body.size_variable;
		}

		let size = {value:size_val,variable:size_variable};

		let fabric_value1:string[];
		if (req.body.fabric_value1 !== null || req.body.fabric_value1 !== "")
		{
			fabric_value1 = req.body.fabric_value1;
		}

		let fabric_variable:boolean;
		if (req.body.fabric_variable !== null || req.body.fabric_variable !== "")
		{
			fabric_variable = req.body.fabric_variable;
		}
		
		
		let fabric = {value:fabric_value1,variable:fabric_variable};

		let lining_value1:string[];
		if (req.body.lining_value1 !== null || req.body.lining_value1 !== "")
		{
			lining_value1 = req.body.lining_value1;
		}

		let lining_variable:boolean;
		if (req.body.lining_variable !== null || req.body.lining_variable !== "")
		{
			lining_variable = req.body.lining_variable;
		}
		
		let lining = {value:lining_value1,variable:lining_variable};

		let sleeve_lining_value1:string[];
		if (req.body.sleeve_lining_value1 !== null || req.body.sleeve_lining_value1 !== "")
		{
			sleeve_lining_value1 = req.body.sleeve_lining_value1;
		}

		let sleeve_lining_variable:boolean;
		if (req.body.sleeve_lining_variable !== null || req.body.sleeve_lining_variable !== "")
		{
			sleeve_lining_variable = req.body.sleeve_lining_variable;
		}
		
		
		let sleeve_lining = {value:sleeve_lining_value1,variable:sleeve_lining_variable};

		let attr = [{color,size,fabric,lining,sleeve_lining}];


		let attributes: AttributesData[];
			attributes = attr;

		let sale_type:string;
			if (req.body.sale_type !== null || req.body.sale_type !== "")
		{
			sale_type = req.body.sale_type;
		}

		let sale_value:number;
		if (req.body.sale_value !== null || req.body.sale_value !== "")
		{
			sale_value = req.body.sale_value;
		}
		let sale_price1 = {type:sale_type,value:sale_value};
		let sale_price:SalePriceData;
		sale_price =sale_price1;

		let sale_duration: Date;
		if (req.body.sale_duration !== null || req.body.sale_duration !== "")
		{
			sale_duration = req.body.sale_duration;
		}

		sale_duration = new Date (sale_duration);
		

		let tag1:string;
		if (req.body.tag1 !== null || req.body.tag1 !== "")
		{
			tag1 =req.body.tag1;
		}
		let tag2:string;
		if (req.body.tag2 !== null || req.body.tag2 !== "")
		{
			tag2 =req.body.tag2;
		}

		let tag3:string;
		if (req.body.tag3 !== null || req.body.tag3 !== "")
		{
			tag3 =req.body.tag3;
		}
	
		let tag4:string;
		if (req.body.tag4 !== null || req.body.tag4 !== "")
		{
			tag4 =req.body.tag4;
		}
	
		let tag = [tag1,tag2,tag3,tag4];
		let tags: string[];
		tags = tag;

		let product_info: ProductInfo = 
		{
			name:name,
			sku_number: sku_number,
			description:description,
			price:price,
			category_id:category_id,
			featured_image:featured_image,
			image_gallery:image_gallery,
			type:type,
			attributes:attributes,
			variation:null,
			stock:null,
			sale_price:sale_price,
			sale_duration:sale_duration,
			tags: tags
		};
		
		let currentProduct = new Product (null, product_info);

		//save (insert) object into the database (product)
		currentProduct.save (function (err, val)
		{
			if (err)
			{
				return res.json ({message : "product is NOT created."});
			}

			return res.json ({message : "product is created."});
		});
	}//save

	/**
	 * POST /api/product/:productID
	 * This API is used to update the record of the product of given productID into the database.
	*/

	public update(req, res)
	{
		/* req.product object is already in memory 
		because of above load() method*/ 
		let product:Product = req.loadedProduct;
		console.log ("Inside controller update");
		console.log ("before: " + util.inspect (product));

		/* data validation of (name, sku_number, price,description  etc.) product */
		
		if (typeof(req.body.name) != "undefined" || req.body.name != null)
		{
			product.product_info.name = req.body.name;
		}

		let sku_number: string;
		if (req.body.sku_number !== null || req.body.sku_number !== "")
		{
			product.product_info.sku_number = req.body.sku_number;
		}

		let description: string;
		if (req.body.description !== null || req.body.description !== "")
		{
			product.product_info.description = req.body.description;
		}

		let price: number;
		if (req.body.price !== null || req.body.price !== "")
		{
			product.product_info.price = req.body.price;
		}

		let category_id1:number;
		if (req.body.category_id1 !== null || req.body.category_id1 !== "")
		{
			category_id1 = req.body.category_id1;
		}
		let category_id2:number;
		if (req.body.category_id2 !== null || req.body.category_id2 !== "")
		{
			category_id2 = req.body.category_id2;
		}


		product.product_info.category_id =[category_id1,category_id2];

		let featured_image:string;
		if (req.body.featured_image !== null || req.body.featured_image !== "")
		{
			product.product_info.featured_image = req.body.featured_image;
		}


		let image_gallery1:string;
		if (req.body.image_gallery1 !== null || req.body.image_gallery1 !== "")
		{
			image_gallery1 = req.body.image_gallery1;
		}

		let image_gallery2:string;
		if (req.body.image_gallery2 !== null || req.body.image_gallery2 !== "")
		{
			image_gallery2 = req.body.image_gallery2;
		}


		let img_gallery = [image_gallery1,image_gallery2];
		let image_gallery:string[];
		product.product_info.image_gallery = img_gallery;

		let type:string;
		if (req.body.type !== null || req.body.type !== "")
		{
			product.product_info.type = req.body.type;
		}


		let color_value1:string[];
		if (req.body.color_value1 !== null || req.body.color_value1 !== "")
		{
			color_value1 = req.body.color_value1;
		}

		let color_variable:boolean;
		if (req.body.color_variable !== null || req.body.color_variable !== "")
		{
			color_variable = req.body.color_variable;
		}
		
		let color = {value:color_value1,variable:color_variable};

		let size_value1:string;
		if (req.body.size_value1 !== null || req.body.size_value1 !== "")
		{
			size_value1 = req.body.size_value1;
		}

		let size_value2:string;
		if (req.body.size_value2 !== null || req.body.size_value2 !== "")
		{
			size_value2 = req.body.size_value2;
		}
		let size_value3:string;
		if (req.body.size_value3 !== null || req.body.size_value3 !== "")
		{
			size_value3 = req.body.size_value3;
		}
		let size_value4:string;
		if (req.body.size_value3 !== null || req.body.size_value4 !== "")
		{
			size_value4 = req.body.size_value4;
		}
		let size_value5:string;
		if (req.body.size_value5 !== null || req.body.size_value5 !== "")
		{
			size_value5 = req.body.size_value5;
		}
		let size_value6:string;
		if (req.body.size_value6 !== null || req.body.size_value6 !== "")
		{
			size_value6 = req.body.size_value6;
		}
		let size_value7:string;
		if (req.body.size_value7 !== null || req.body.size_value7 !== "")
		{
			size_value7 = req.body.size_value7;
		}

		let size_val :string[];
		size_val =[size_value1,size_value2,size_value3,size_value4,size_value5,size_value6,size_value7];

		let size_variable:boolean;
		if (req.body.size_variable !== null || req.body.size_variable !== "")
		{
			size_variable = req.body.size_variable;
		}

		let size = {value:size_val,variable:size_variable};

		let fabric_value1:string[];
		if (req.body.fabric_value1 !== null || req.body.fabric_value1 !== "")
		{
			fabric_value1 = req.body.fabric_value1;
		}

		let fabric_variable:boolean;
		if (req.body.fabric_variable !== null || req.body.fabric_variable !== "")
		{
			fabric_variable = req.body.fabric_variable;
		}
		
		
		let fabric = {value:fabric_value1,variable:fabric_variable};

		let lining_value1:string[];
		if (req.body.lining_value1 !== null || req.body.lining_value1 !== "")
		{
			lining_value1 = req.body.lining_value1;
		}

		let lining_variable:boolean;
		if (req.body.lining_variable !== null || req.body.lining_variable !== "")
		{
			lining_variable = req.body.lining_variable;
		}
		
		let lining = {value:lining_value1,variable:lining_variable};

		let sleeve_lining_value1:string[];
		if (req.body.sleeve_lining_value1 !== null || req.body.sleeve_lining_value1 !== "")
		{
			sleeve_lining_value1 = req.body.sleeve_lining_value1;
		}

		let sleeve_lining_variable:boolean;
		if (req.body.sleeve_lining_variable !== null || req.body.sleeve_lining_variable !== "")
		{
			sleeve_lining_variable = req.body.sleeve_lining_variable;
		}
		
		
		let sleeve_lining = {value:sleeve_lining_value1,variable:sleeve_lining_variable};

		let attr = [{color,size,fabric,lining,sleeve_lining}];


			product.product_info.attributes = attr;

		let sale_type:string;
			if (req.body.sale_type !== null || req.body.sale_type !== "")
		{
			sale_type = req.body.sale_type;
		}

		let sale_value:number;
		if (req.body.sale_value !== null || req.body.sale_value !== "")
		{
			sale_value = req.body.sale_value;
		}
		let sale_price1 = {type:sale_type,value:sale_value};
		product.product_info.sale_price =sale_price1;

		let sale_duration: Date;
		if (req.body.sale_duration !== null || req.body.sale_duration !== "")
		{
			sale_duration = req.body.sale_duration;
		}

		product.product_info.sale_duration = new Date (sale_duration);
		

		let tag1:string;
		if (req.body.tag1 !== null || req.body.tag1 !== "")
		{
			tag1 =req.body.tag1;
		}
		let tag2:string;
		if (req.body.tag2 !== null || req.body.tag2 !== "")
		{
			tag2 =req.body.tag2;
		}

		let tag3:string;
		if (req.body.tag3 !== null || req.body.tag3 !== "")
		{
			tag3 =req.body.tag3;
		}
	
		let tag4:string;
		if (req.body.tag4 !== null || req.body.tag4 !== "")
		{
			tag4 =req.body.tag4;
		}
	
		let tag = [tag1,tag2,tag3,tag4];
		product.product_info.tags = tag;

		product.update (function (err, val)
		{
			if (err)
			{
				return res.json ({message : "product is NOT Updated."});
			}

			return res.json ({message : "product is Updated."});
		});

		console.log ("after: " + util.inspect (product));
	}//update


	/**
	 * DELETE /api/product/:productID
	 * Delete the product record of the given productID from the  database.  
	*/
	public remove (req, res) 
	{
		let product:Product = req.loadedProduct;
		console.log(product);
		product.delete( (err, result) => {
			if(err) return res.json(err);

			return res.json ({message : "product is deleted."});

		})
	}
} // ProductController