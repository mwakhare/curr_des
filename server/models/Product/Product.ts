
import {ProductInfo} from '../types/ProductInfo';
import {ProductBase} from './ProductBase';
import * as getConnection from '../../../config/db.service';
import * as util from 'util';

/**
 * Product class makes a new actor object. 
 * Class is based on abstract ProductBase class.
 *
 */

export class Product extends ProductBase
 {
 	/**
	 * constructor() returns a new element
	 * of class Product
	 *
	 * @param <number> Product ID
	 * @param <ProductInfo> product information
	 */

	constructor( id: number, product_info:ProductInfo)
	{
			super(id,product_info);			
	}

	/**
	 * getOneProduct () extracts single Product objects from the database
	 */

	public static getProduct (productIDToFind, callback) 
	{		
		/**
		 * getConnection () establishes the database connection
		 *
		 * @param <function> callback (err, connection)
		 * @return err or database connection object
		 */	
		getConnection (function (err, con) 
		{
			if (err) 
			{  
				console.log ("getProduct getConnection has an error: " + err);
				return;
			}
			let productQuery = 'SELECT * from product where id = ' + productIDToFind;

			/**
			 * con.query () queries the database 
			 *
			 * @param <string> sql query
			 * @param <Array> sql query param 
			 * @return err or database result object
			 */		
			con.query (productQuery, function (err, product)
			{
				con.release();
				if (err) 
				{  
					console.log("getProduct  getConnection-con.query has an error: " + err);
					callback (err);
				}
				else
				{
					
					let id = product[0].id;
					let product_info = product[0].product_info;
					let is_deleted = product[0].is_deleted;
					let prod = new Product(id,product_info);
					callback (err,prod,is_deleted);
					
				}
			}); 
		});
	} 
	
	/**
	 * getOneProduct () extracts single Product objects from the database
	 */

public static getOneProduct (productIDToFind, callback) 
	{
		/**
		 * getConnection () establishes the database connection
		 *
		 * @param <function> callback (err, connection)
		 * @return err or database connection object
		 */			
		getConnection (function (err, con) 
		{
			if (err) 
			{  
				console.log ("product-static-getOne-getConnection has an error: " + err);
				return;
			}

			console.log ('product-static-getOne-getConnection- database connection thread id: ' + con.threadId);

			let productQuery = 'SELECT * from product where id = ' + productIDToFind;
			console.log ("product-static-getOne-getConnection: productQuery: " + productQuery);

			/**
			 * con.query () queries the database 
			 *
			 * @param <string> sql query
			 * @param <Array> sql query param 
			 * @return err or database result object
			 */			
								
			con.query (productQuery, function (err, product)
			{
				console.log ('product-static-getOne-getConnection-con.query before release');
				con.release();

				if (err) 
				{  
					console.log ("product-static-getOne-getConnection-con.query has an error: " + err);
					callback (err);
				}
				else
				{
					console.log ("product-static-getOne-getConnection-con.query: productQuery is OK.");

					//convert database object into business logic
					let product_info;
					if( product[0].product_info !== undefined ) {
						product_info = JSON.parse(product[0].product_info);
					}

					
					let product1 = new Product(product[0].id, product_info);

					callback (err, product1);
				}
			}); //con.query
		}); //getConnection
	} //getOneProduct

	/**
	 * list () extracts list of all Product objects from the database
	 *
	 * @param <function> callback (err, products)
	 */

	public static list (callback)
	{ 	
		/**
		 * getConnection () establishes the database connection
		 *
		 * @param <function> callback (err, connection)
		 * @return err or database connection object
		 */	
		getConnection (function (err, con) 
		{
  							
			if(err) 
			{  
				console.log("getConnection  error");
				return;
			}					
			let productQuery = "SELECT * from product";	

			/**
			 * con.query () queries the database 
			 *
			 * @param <string> sql query
			 * @param <Array> sql query param 
			 * @return err or database result object
			 */			
			con.query(productQuery, function(err, products){
				con.release();

				if(err) 
				{  
					console.log("productQuery  error");
					callback (err);
				}
				else
				{
					
					callback (err, products);
				}
			});//con.query
		});//getConnection
	}; //static list

	/**
	 * save() persists product object into the database
	 *
	 * @param <function> callback (err, value)
	 */

		public save = (callback): void => 
	{
		/**
		 * getConnection () establishes the database connection
		 *
		 * @param <function> callback (err, connection)
		 * @return err or database connection object
		 */
		
		getConnection ( (err, con) => 
		{
			if (err) 
			{
				console.log ("Product-save-getConnection: has an error." + err);
				
				callback (err);
				return;
          	}  

        	console.log ('product-save-getConnection: database connection thread id: ' + con.threadId);
       
			let query = `INSERT INTO product (product_info) VALUES ( ? )`;
			console.log ("product-save-getConnection: query: " + query);

			/**
			 * con.query () queries the database 
			 *
			 * @param <string> sql query
			 * @param <Array> sql query param 
			 * @return err or database result object
			 */
			
			con.query (query, JSON.stringify (this.product_info), (err, result) => 
			{
				console.log ('Product-save-getConnection-con.query before release message.');
				
				con.release ();

				if (err) 
				{  
					console.log("Product-save-getConnection-con.query has an error: " + err);
					callback (err);
					return;
				}
				
				this.id = result.insertId;
				console.log('Product-save-getConnection-con.query- Product is Created (OK.): Record Database ID: ' + result.insertId);
		        console.log ('Product-save-getConnection: database connection thread id: ' + con.threadId);
				callback (null, true); 
									
			}); //con.query
		}); //getConnection		
	} 		// save

		/**
		* update() updates product object into the database
		*
		* @param <function> callback (err, value)
		*/
	public update = (callback): void => 
	{
		
		/**
		 * getConnection () establishes the database connection
		 *
		 * @param <function> callback (err, connection)
		 * @return err or database connection object
		 */
		getConnection ( (err, con) => 
		{
			console.log ("Inside update getconnection method.");
			if (err) 
			{
				console.log ("products-update-getConnection1- has an error: " + err);

				callback (err);
				return;
        	}
        	
			 console.log ('products-update-getConnection (product table) database connection thread id: ' + con.threadId);
       
			let query = `UPDATE product SET product_info = ? WHERE id = ?`;
			console.log ("products-update-getConnection - query: " + query);

			/**
			 * con.query () queries the database 
			 *
			 * @param <string> sql query
			 * @param <Array> sql query param 
			 * @return err or database result object
			 */
			con.query (query, [JSON.stringify(this.product_info), this.id], (err, result) => 
			{
				console.log ("Inside update getconnection con.query method.");
				console.log ("products-update-getConnection-con.query before release message.");
				con.release ();

				if (err) 
				{
					console.log ("products-update-getConnection-con.query has an error: " + err);
					callback (err);
					return;
				}

				callback (null,true);
				return;
			}); //con.query
		}); //getconnection

	} //update

	/**
	 * delete() deletes (soft) product object from the database
	 *
	 * @param <function> callback (err, value)
	 */


	public delete = (callback): void => 
	{ 
		console.log ("In delete method.");
		console.log(this);
		let id = this.id;

		/**
		 * getConnection () establishes the database connection
		 *
		 * @param <function> callback (err, connection)
		 * @return err or database connection object
		 */

		getConnection ( (err, con) => {
  			if (err) 
			{  
				console.log ("products-delete-getConnection has an error: " + err);	
				callback (err);
				return;
			}

			console.log ('products-delete-getConnection- (products) - database connection thread id: ' + con.threadId);
			console.log ("In getConnection method.");

			let deleteproductsQuery = `UPDATE product SET is_deleted = 1 WHERE id = ` + id;

			/**
			 * con.query () queries the database 
			 *
			 * @param <string> sql query
			 * @param <Array> sql query param 
			 * @return err or database result object
			 */

			con.query (deleteproductsQuery, function (err, products)
			{
				console.log ("products-delete-getConnection-con.query (products) before release message.");

				con.release();

				if (err) 
				{
					console.log("products-delete-getConnection-con.query has an error: " + err);
					
					console.log ("products-delete-getConnection-con.query has an error: " + util.inspect (this));
					callback (err);
					return;
				}
	
				callback (null, true);
				return;
			}); //con.query
		}); // getConnection
	} //delete	

}// Product class