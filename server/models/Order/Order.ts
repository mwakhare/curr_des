// import {CancelledData} from '../types/IsCancelled';
// import {ReturnData} from '../types/IsReturn';
// import {TaxDetailData} from '../types/TaxDetail';
// import {StatusData} from '../types/OrderStatus';

// import * as getConnection from '../../../config/db.service';

// export class Order {
//     protected _id: number | null;
// 	//protected _products: Product; 
//     protected _orderTotal : number;
//     protected _orderStatus : StatusData;
//     protected _shippingRef : string;
//     protected _shippingCarrier : string;
//     protected _isCancelled : CancelledData;
//     protected _isReturned : ReturnData;
//     protected _tax : TaxDetailData;

// 	constructor(id: number, orderTotal : number, orderStatus : StatusData,          
//                 shippingRef : string, shippingCarrier : string, isCancelled : CancelledData,
//                 isReturned : ReturnData, tax : TaxDetailData)
//     {
// 		this._id = id;
//         //products: Product; 
//         this._orderTotal = orderTotal;
//         this._orderStatus = orderStatus;
//         this._shippingRef = shippingRef;
//         this._shippingCarrier = shippingCarrier;
//         this._isCancelled = isCancelled;
//         this._isReturned = isReturned;
//         this._tax = tax;
// 	}

// 	get id (): number 
//     {
// 		return this._id;
// 	}

// 	set id (id: number) 
//     {
// 		this._id = id;
// 	}

//     get orderTotal (): number 
//     {
// 		return this._orderTotal;
// 	}

// 	set orderTotal (orderTotal: number) 
//     {
// 		this._orderTotal = orderTotal;
// 	}

//     get orderStatus (): StatusData 
//     {
// 		return this._orderStatus;
// 	}

// 	set orderStatus (orderStatus: StatusData) 
//     {
// 		this._orderStatus = orderStatus;
// 	}

//     get shippingRef (): string 
//     {
// 		return this._shippingRef;
// 	}

// 	set shippingRef (shippingRef: string) 
//     {
// 		this._shippingRef = shippingRef;
// 	}

//     get shippingCarrier (): string 
//     {
// 		return this._shippingCarrier;
// 	}

// 	set shippingCarrier (shippingCarrier: string) 
//     {
// 		this._shippingCarrier = shippingCarrier;
// 	}

//     get isCancelled (): CancelledData 
//     {
// 		return this._isCancelled;
// 	}

// 	set isCancelled (isCancelled: CancelledData) 
//     {
// 		this._isCancelled = isCancelled;
// 	}

//     get isReturned (): ReturnData 
//     {
// 		return this._isReturned;
// 	}

// 	set isReturned (isReturned: ReturnData) 
//     {
// 		this._isReturned = isReturned;
// 	}
	
//     get tax (): TaxDetailData 
//     {
// 		return this._tax;
// 	}

// 	set tax (tax: TaxDetailData) 
//     {
// 		this._tax = tax;
// 	}

//     public save = (): void => 
// 	{
// 		getConnection( (err,con) => 
// 		{
// 			if (err) 
// 			{
// 				//console.log ({"code" : 100, "status" : "Error in connection database"});
// 				console.log ("Order-save-getConnection: has an error." + err);
				
// 				return;
//           	}   

//         	console.log ('Order-save-getConnection: database connection thread id: ' + con.threadId);
       
// 			let query = `INSERT INTO order ( ) VALUES ( ? )`;

// 			console.log ("Order-save-getConnection: query: " + query);
			
// 			con.query (query, [ ], (err, result) => 
// 			{
// 				console.log ('Order-save-getConnection-con.query before release message.');
				
// 				con.release ();

// 				if (err) 
// 				{  
// 					console.log("Order-save-getConnection-con.query has an error: " + err);
// 					return;
// 				}
				
// 				if ( !result.insertId ) 
// 				{
// 					console.log ("Order-save-getConnection-con.query result: " + result);
// 					return;
// 				}

// 				this.id = result.insertId;
				
// 				console.log('Order-save-getConnection-con.query- User is Created (OK.)' + result.insertId);
// 			}); //con.query
// 		}); //getConnection
// 	} //save

// 	public update = (): void => 
// 	{
// 		getConnection ( (err,con) => 
// 		{
// 			if (err) 
// 			{
// 				//console.log({"code" : 100, "status" : "Error in connection database"});
// 				console.log("Order-update-getConnection- has an error: " + err);
// 				return;
//         	}   
        	
// 			console.log ('Order-update-getConnection (order table) database connection thread id: ' + con.threadId);
       
// 			//let query = `UPDATE order SET  = ? WHERE id = ?`;

//             let queryToTest = "UPDATE user_profile SET "
// 					 	+ "profile_picture = '" + this.profile.profile_pic + "', "  
// 						+ "address = '" + addressStringify + "', " 
// 						+ "role = " + this.profile.role + ", " 
// 						+ "capablities = " + this.profile.capabilities + ", " 
// 						+ "favourites = '" + favouritesStringify + "' "
// 						+ "WHERE user_id = " + this.id;
			
// 			console.log ("Order-update-getConnection - query: " + query);

// 			con.query (queryToTest, [, this.id], (err, result) => 
// 			{
// 				console.log ("Order-update-getConnection-con.query before release messge.");
// 				con.release ();

// 				if (err) 
// 				{
// 					console.log ("Order-update-getConnection-con.query has an error: " + err);
// 					return;
// 				}

// 				if( !result.insertId ) 
// 				{
// 					console.log ("Order-update-getConnection-con.query - result: " + result);
// 					return;
// 				}
				
// 				console.log ('Order-update-getConnection-con.query - Order is updated: ' + result.insertId);
// 			}); //con.query
// 		}); //getConnection

// 	// 	getConnection ( (err, con) => 
// 	// 	{
// 	// 		if (err) 
// 	// 		{
// 	// 			//console.log({"code" : 100, "status" : "Error in connection database"});
// 	// 			console.log("Order-update-getConnection2 has an error: " + err);
// 	// 			return;
//     //     	}   

//     //     	console.log ('Order-update-getConnection2 (user_profile table) - database connection thread id: ' + con.threadId);
       
// 	// 		let addressStringify = JSON.stringify (this.profile.address);
// 	// 		let favouritesStringify = JSON.stringify (this.profile.favourites);

// 	// 		let queryToTest = "UPDATE user_profile SET "
// 	// 				 	+ "profile_picture = '" + this.profile.profile_pic + "', "  
// 	// 					+ "address = '" + addressStringify + "', " 
// 	// 					+ "role = " + this.profile.role + ", " 
// 	// 					+ "capablities = " + this.profile.capabilities + ", " 
// 	// 					+ "favourites = '" + favouritesStringify + "' "
// 	// 					+ "WHERE user_id = " + this.id;

// 	// 		console.log ("Order-update-getConnection2-con.query query: " + queryToTest);

// 	// 		con.query (queryToTest,	(err, result) => 
// 	// 		{
				
// 	// 			console.log ("Order-update-getConnection2-con.query before release messge.");
// 	// 			con.release ();

// 	// 			if (err) 
// 	// 			{
// 	// 				console.log ("Order-update-getConnection2-con.query has an error: " + err);
// 	// 				return;
// 	// 			}

// 	// 			if ( !result.insertId ) 
// 	// 			{
// 	// 				console.log ("Order-update-getConnection2-con.query result: " + result);
// 	// 				return;
// 	// 			}

// 	// 			console.log('Order-update-getConnection2-con.query User_profile is Updated. result.insertId: ' + result.insertId);
// 	// 		}); //con.query
// 	// 	}); //getConnection
	
//     } //update

// 	public delete = (): boolean => 
// 	{ 
// 		getConnection (function (err, con) 
// 		{
//   			if (err) 
// 			{  
// 				//console.log ({"code" : 100, "status" : "Error in connection database"});
// 				console.log ("Order-delete-getConnection has an error: " + err);
				
// 				return false;
// 			}

// 			console.log ('Order-delete-getConnection- (user) - database connection thread id: ' + con.threadId);

// 			//let deleteUserQuery = "DELETE FROM user WHERE id = " + this.id;
// 			let deleteUserQuery = "DELETE FROM order WHERE id = ?";

// 			console.log ("Order-delete-getConnection deleteUserQuery: " + deleteUserQuery);		

// 			con.query (deleteUserQuery, [this.id], function (err, orders, fields)
// 			{
// 				console.log ("Order-delete-getConnection-con.query (order) before release message.");

// 				con.release();

// 				if (err) 
// 				{
// 					console.log("Order-delete-getConnection-con.query has an error: " + err);
					
// 					return false;
// 				}

// 				if (orders.affectedRows == 1) 
//                 {
//                    	//console.log ({"code" : 100, "status" : "Record is deleted successfully!"});
// 					console.log ("Order-delete-getConnection deleteUserQuery: " + deleteUserQuery);
// 					console.log ("Order-delete-getConnection-con.query - user record is deleted.");
//                 } 
				
// 				console.log ("Order-delete-getConnection deleteUserQuery: " + deleteUserQuery);
// 				console.log ("Order-delete-getConnection-con.query: users: " + orders);
	
// 				return true;
// 			}); //con.query
// 		}); //getConnection
	
// 		//?what should be returned here?
// 		return true;
// 	} //delete

// 	public static getOne (orderIDToFind, callback) 
// 	{
// 		//data base connection			
// 		getConnection (function (err, con) 
// 		{
// 			if (err) 
// 			{  
// 				console.log ("Order-static-getOne-getConnection has an error: " + err);
// 				return;
// 			}

// 			console.log ('Order-static-getOne-getConnection- database connection thread id: ' + con.threadId);

// 			let orderQuery = 'SELECT * FROM order where id = ' + orderIDToFind;
// 			console.log (orderQuery);
// 			console.log ("Order-static-getOne-getConnection: userQuery: " + orderQuery);
								
// 			con.query (orderQuery, function (err, orders)
// 			{
// 				console.log ('Order-static-getOne-getConnection-con.query before release');
// 				con.release();

// 				if (err) 
// 				{  
// 					console.log("Order-static-getOne-getConnection-con.query has an error: " + err);
// 					callback (err);
// 				}
// 				else
// 				{
// 					console.log ("Order-static-getOne-getConnection-con.query: userQuery is OK.");
// 					callback (err, orders);
// 				}
// 			}); //con.query
// 		}); //getConnection
// 	} //getOne

// 	public static list (callback) 
// 	{ 
// 		//data base connection			
// 		getConnection (function (err, con) 
// 		{
//   			if (err) 
// 			{  
// 				console.log ("Order-static-list-getConnection has an error: " + err);
// 				return;
// 			}
								
// 			let orderQuery = "SELECT * FROM order";
								
// 			console.log ('Order-static-list-getConnection database connection (join query) thread id: ' + con.threadId);
// 			console.log ("Order-static-list-getConnection-con.query userQuery: " + orderQuery);

// 			con.query (orderQuery, function (err, orders)
// 			{
// 				console.log ('Order-static-list-getConnection-con.query before connection release.');
// 				con.release ();

// 				if (err) 
// 				{  
// 					console.log ("Order-static-list-getConnection-con.query has an error: " + err);
// 					callback (err);
// 				}
// 				else
// 				{
// 					console.log ("Order-static-list-getConnection-con.query orderQuery is OK.");
// 					callback (err, orders);
// 				}
// 			}); //con.query
// 		}); //getConnection
// 	}; //list
// }   //order 
