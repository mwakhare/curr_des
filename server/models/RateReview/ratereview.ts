import * as getConnection from '../../../config/db.service';
import {ItemRateReview} from '../types/ItemRateReview';
import {RateReviewFields} from '../types/RateReviewFields';
import * as util from 'util';

/**
 * RateReview class . 
 * Products, Brands - rating and reviewing by customer.
 *
 */
export class RateReview  
{
    protected _id: number;
    protected _itemCode: number;
    protected _review: string;
    protected _rate: number;
    protected _createdBy: number;
    protected _createdOn: Date;
    protected _lastModifiedBy: number;
    protected _lastModifiedOn: Date;

	protected _is_Approved: boolean;

	protected _tableName: string;

	
	
	/**
	 * constructor() 
	 *	 
	 * @param <number> ID
	 * @param <number> itemCode
	 * @param <string> review
	 * @param <number> rate
	 *
	 */
	constructor (id: number, itemCode: number, review: string, rate: number, createdBy: number, createdOn: string, lastModifiedBy: number,  lastModifiedOn: string, tableName: string = "rate_review") 
	{
		this._id = id;
        this._itemCode = itemCode;
        this._review = review;
        this._rate = rate;
        this._createdBy = createdBy;
        this._createdOn = new Date (createdOn);
        this._lastModifiedBy = lastModifiedBy;
        this._lastModifiedOn = new Date (lastModifiedOn);
		this._tableName = tableName;
	}

	//ID setter
	set ID (id: number) 
	{
		this._id = id;
	}

	//ID getter
	get ID (): number
	{
		return this._id;
	}

    //ItemCode setter
	set ItemCode (itemCode: number) 
	{
		this._itemCode = itemCode;
	}

	//ItemCode getter
	get ItemCode (): number
	{
		return this._itemCode;
	}

    //Review setter
	set Review (review: string) 
	{
		this._review = review;
	}

	//Review getter
	get Review (): string
	{
		return this._review;
	}

    //Rate setter
	set Rate (rate: number) 
	{
		this._rate = rate;
	}

	//getter
	get Rate (): number
	{
		return this._rate;
	}

    //CreatedBy setter
	set CreatedBy (createdBy: number) 
	{
		this._createdBy = createdBy;
	}

	//CreatedBy getter
	get CreatedBy (): number
	{
		return this._createdBy;
	}

    //CreatedOn setter
	set CreatedOn (createdOn: Date) 
	{
		this._createdOn = new Date (createdOn);
	}

	//CreatedOn getter
	get CreatedOn (): Date
	{
		return this._createdOn;
	}

    //LastModifiedBy setter
	set LastModifiedBy (lastModifiedBy: number) 
	{
		this._lastModifiedBy = lastModifiedBy;
	}

	//LastModifiedBy getter
	get LastModifiedBy (): number
	{
		return this._lastModifiedBy;
	}

    //LastModifiedOn setter
	set LastModifiedOn (lastModifiedOn: Date) 
	{
		this._lastModifiedOn = lastModifiedOn;
	}

	//LastModifiedOn getter
	get LastModifiedOn (): Date
	{
		return this._lastModifiedOn;
	}

	 //Review setter
	set IsApproved (isApproved: boolean) 
	{
		this._is_Approved = isApproved;
	}

	//Review getter
	get IsApproved (): boolean
	{
		return this._is_Approved;
	}

	 //Review setter
	set TableName (tableName: string) 
	{
		this._tableName = tableName;
	}

	//Review getter
	get TableName (): string
	{
		return this._tableName;
	}

	/**
	 * save() persists RateReview object into the database
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
				console.log ("RateReview-save-getConnection: has an error." + err);
				
				callback (err);
				return;
          	}  

        	console.log ('RateReview-save-getConnection: database connection thread id: ' + con.threadId);
       
			let queryToSave = "INSERT INTO " + this.TableName + " (Item_Code, review, rate, created_by, created_on, last_modified_by,  last_modified_on) "
                        + "VALUES ( ?, ?, ?, ?, ?, ?, ? )";

			console.log ("RateReview-save-getConnection: query: " + queryToSave);
			
			/**
			 * con.query () queries the database 
			 *
			 * @param <string> sql query
			 * @param <Array> sql query param 
			 * @return err or database result object
			 */
			con.query (queryToSave, [this.ItemCode, this.Review, this.Rate, 
                        this.CreatedBy, this.CreatedOn, this.LastModifiedBy, this.LastModifiedOn], (err, result) => 
			{
				console.log ('RateReview-save-getConnection-con.query before release message.');
				
				con.release ();

				if (err) 
				{  
					console.log("RateReview-save-getConnection-con.query has an error: " + err);
					callback (err);
					return
				}
				
				this.ID = result.insertId;
				console.log ('RateReview-save-getConnection-con.query- User is Created (OK.): Record Database ID: ' + result.insertId);
						
				callback (null, true); // this.id or whatever
                return;
			}); //con.query
		}); //getConnection		
	} //save


	/**
	 * update() updates RateReview object into the database
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
			if (err) 
			{
				console.log ("RateReview-update-getConnection- has an error: " + err);
				callback (err);
                return;
        	}
        	
			console.log ('RateReview-update-getConnection database connection thread id: ' + con.threadId);
       
            //have problem in both the date fields - error code:1292, 1411 etc. 
			// let queryToUpdate = "UPDATE rate_review SET "
			// 		 	+ "Item_Code = " + this.ItemCode + ", "  
			// 			+ "review = '" + this.Review + "', " 
			// 			+ "rate = " + this.Rate  + ", " 
			// 			+ "created_by = " + this.CreatedBy  + ", " 
			// 			+ "created_on = '" + this.CreatedOn + "', "
            //             + "last_modified_by = " + this.LastModifiedBy  + ", " 
			// 			+ "last_modified_on = '" + this.LastModifiedOn + "' "
			// 			+ "WHERE id = " + this.ID;

			let queryToUpdate = "UPDATE " + this.TableName + " SET "
					 	//+ "Item_Code = " + this.ItemCode + ", "  
						//+ "review = '" + this.Review + "', " 
						//+ "rate = " + this.Rate  + ", " 
						//+ "created_by = " + this.CreatedBy  + ", " 
						//+ "created_on = '" + this.CreatedOn + "', "
                        + "last_modified_by = " + this.LastModifiedBy  + ", " 
						+ "last_modified_on = '" + this.LastModifiedOn.toISOString().slice(0, 10) + "' "
						+ "WHERE id = " + this.ID;
		
			console.log ("RateReview-update-getConnection - queryToUpdate: " + queryToUpdate);

			/**
			 * con.query () queries the database 
			 *
			 * @param <string> sql query
			 * @param <Array> sql query param 
			 * @return err or database result object
			 */
			con.query (queryToUpdate, (err, result) => 
			{
				console.log ("RateReview-update-getConnection-con.query before release message.");
				con.release ();

				if (err) 
				{
					console.log ("RateReview-update-getConnection-con.query has an error. queryToUpdate: " + err);
					callback (err);
					return;
				}
				else 
                {
					console.log ('RateReview-update-getConnection-con.query RateReview is Updated. result.changedRows: ' + result.changedRows);

					callback (null, true);
					return;
				}				
			}); //con.query
		}); //getConnection

	} //update

	/**
	 * delete() deletes (soft) RateReview  object from the database
	 * (The same logic or method can be used for is_approved database field)
	 * 
	 * @param <function> callback (err, value)
	 * 
	 */
	public delete = (callback): void => 
	{ 
		console.log ("Inside the RateReview-delete method.");
		console.log (this);
		
        //let id = this.ID;

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
				console.log ("RateReview-delete-getConnection has an error: " + err);	
				callback (err);
				return;
			}

			console.log ('RateReview-delete-getConnection- database connection thread id: ' + con.threadId);
			console.log ("Inside the RateReview-delete-getConnection method.");

			let deleteRateReviewQuery = "UPDATE " + this.TableName + " SET is_deleted = 1 WHERE id = " + this.ID;

			/**
			 * con.query () queries the database 
			 *
			 * @param <string> sql query
			 * @param <Array> sql query param 
			 * @return err or database result object
			 */
			con.query (deleteRateReviewQuery, function (err, users)
			{
				console.log ("RateReview-delete-getConnection-con.query (deleteRateReviewQuery) before release message.");

				con.release();

				if (err) 
				{
					console.log("RateReview-delete-getConnection-con.query has an error: " + err);
					
					console.log ("RateReview-delete-getConnection-con.query has an error: " + util.inspect (this));
					callback (err);
					return;
				}
	
				callback (null, true);
				return;
			}); //con.query
		}); //getConnection
	} //delete


	/**
	 * Undelete() undeletes RateReview object from the database 
	 * (The same logic or method can be used for is_approved database field)
	 * 
	 * @param <function> callback (err, value)
	 */

	//maybe, This should be a static method. (confirm)
	//one more param 'id' to undelete the ratereview record.
	public unDelete = (callback): void => 
	{ 
		console.log ("Inside the RateReview-unDelete method.");
		console.log (this);
		
        //let id = this.ID;

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
				console.log ("RateReview-unDelete-getConnection has an error: " + err);	
				callback (err);
				return;
			}

			console.log ('RateReview-unDelete-getConnection- database connection thread id: ' + con.threadId);
			console.log ("Inside the RateReview-unDelete-getConnection method.");

			let unDeleteRateReviewQuery = "UPDATE " + this.TableName + " SET is_deleted = 0 WHERE id = " + this.ID;

			/**
			 * con.query () queries the database 
			 *
			 * @param <string> sql query
			 * @param <Array> sql query param 
			 * @return err or database result object
			 */
			con.query (unDeleteRateReviewQuery, function (err, users)
			{
				console.log ("RateReview-unDelete-getConnection-con.query (unDeleteRateReviewQuery) before release message.");

				con.release();

				if (err) 
				{
					console.log("RateReview-unDelete-getConnection-con.query has an error: " + err);
					
					console.log ("RateReview-unDelete-getConnection-con.query has an error: " + util.inspect (this));
					callback (err);
					return;
				}
	
				callback (null, true);
				return;
			}); //con.query
		}); //getConnection

	} //unDelete


	/**
	 * getOne () extracts one  object from the database
	 *
	 * @param <number> rateAndReviewIDToFind - to extract the specific record from the database
	 * @param <function> callback (err, customer)
	 */

	public static getOne (rateAndReviewIDToFind, callback) //add third param TableName (as getReviewRatingByItemID()) , static method can use only static var
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
				console.log ("RateReview-static-getOne-getConnection has an error: " + err);
				return;
			}

			console.log ('RateReview-static-getOne-getConnection- database connection thread id: ' + con.threadId);

			//this.table name can not be used, as getOne () is static method.
			let selectOneQuery = "SELECT * FROM rate_review where id = " + rateAndReviewIDToFind + " AND is_deleted = 0";
			
			
			console.log ("RateReview-static-getOne-getConnection: selectOneQuery: " + selectOneQuery);

			/**
			 * con.query () queries the database 
			 *
			 * @param <string> sql query
			 * @param <Array> sql query param 
			 * @return err or database result object
			 */			
			con.query (selectOneQuery, function (err, rows)
			{
				console.log ('RateReview-static-getOne-getConnection-con.query before release');
				con.release();

				if (err) 
				{  
					console.log ("RateReview-static-getOne-getConnection-con.query has an error: " + err);
					callback (err);
                    return;
				}
				else
				{
					console.log ("RateReview-static-getOne-getConnection-con.query: selectOneQuery is OK.");

					//convert database object into business logic
					let rateAndReview = new RateReview (rows[0].id, 
                                                            rows[0].Item_Code, 
                                                            rows[0].review, 
                                                            rows[0].rate,
                                                            rows[0].created_by, 
                                                            rows[0].created_on, 
                                                            rows[0].last_modified_by, 
                                                            rows[0].last_modified_on);

					callback (err, rateAndReview);
                    return;
				}
			}); //con.query
		}); //getConnection
	} //getOne


	/**
	 * getReviewRatingByItemID () extracts row from the database and build ratereview JSON object.
	 *
	 * @param <number> itemIDToFind - to extract the specific record from the database
	 * @param <string> table name from the database.
	 * @param <function> callback (err, customer)
	 */
	public static getReviewRatingByItemID (itemIDToFind:number, tableToSql:string, callback) 
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
				console.log ("RateReview-static-getOneItemID-getConnection has an error: " + err);
				return;
			}

			console.log ('RateReview-static-getOneItemID-getConnection- database connection thread id: ' + con.threadId);

			let selectOneItemIDQuery = "SELECT * FROM " + tableToSql + " where Item_Code = " + itemIDToFind + " AND is_deleted = 0 AND is_approved = 1";
			console.log ("RateReview-static-getOneItemID-getConnection: selectOneItemIDQuery: " + selectOneItemIDQuery);

			/**
			 * con.query () queries the database 
			 *
			 * @param <string> sql query
			 * @param <Array> sql query param 
			 * @return err or database result object
			 */			
			con.query (selectOneItemIDQuery, function (err, rows)
			{
				console.log ('RateReview-static-getOneItemID-getConnection-con.query before release');
				con.release();

				if (err) 
				{  
					console.log ("RateReview-static-getOneItemID-getConnection-con.query has an error: " + err);
					callback (err);
                    return;
				}
				else
				{
					console.log ("RateReview-static-getOneItemID-getConnection-con.query: selectOneItemIDQuery is OK.");

					//convert database object into business logic ...

					let ratingTotal: number = 0; 		//addition of all ratings
					let totalRatingCount: number = 0;	//Total number of ratings

					let fiveStar: number = 0;			//Five star ratings
					let fourStar: number = 0;			//Four star ratings
					let threeStar: number = 0;			//Three star ratings
					let twoStar: number = 0;			//Two star ratings
					let oneStar: number = 0;			//One star ratings
					
					//JSON object to return is created in the memory
					let resultToReturn: ItemRateReview =
					{
						 	itemCode: 0,
    						avgRating: 0,
							fiveStar: 0,
							fourStar: 0,
							threeStar: 0,
							twoStar: 0,
							oneStar: 0,
							totalRatingCount: 0,
							detail: null
					};

					//array for detail field in resultToReturn object
					let rateReviewDetailArray : RateReviewFields[] = Array();
					
					for (let i = 0; i < rows.length; i++)
					{
						if (rows[i].rate !== undefined)
						{
							ratingTotal = ratingTotal + rows[i].rate;	//rating addition

							if (rows[i].rate === 5)						//Filtering 5 star
							{
								fiveStar++;
							}

							if (rows[i].rate === 4)						//Filtering 4 star
							{
								fourStar = fourStar + 1;
							}

							if (rows[i].rate === 3)						//Filtering 3 star
							{
								threeStar++;
							}

							if (rows[i].rate === 2)						//Filtering 2 star
							{
								twoStar++;
							}

							if (rows[i].rate === 1)						//Filtering 1 star
							{
								oneStar++;
							}
						}
						 
						totalRatingCount++;								//total no of rating increament

						let rateReviewDetail : RateReviewFields = 		//memory creation for single element for rateReviewDetailArray
						{
								rating: 0,
								review: "",
								createdBy: 0,
								createdOn: new Date("2017-01-01"),
								lastModifiedBy: 0,
								lastModifiedOn: new Date("2017-01-01"),
								isDeleted: false,
								isApproved: true
						};

						//passing database values into JSON object
						rateReviewDetail.rating = rows[i].rate;
						rateReviewDetail.review = rows[i].review;
						rateReviewDetail.createdBy = rows[i].created_by;
						rateReviewDetail.createdOn = new Date (rows[i].created_on);
						rateReviewDetail.lastModifiedBy = rows[i].last_modified_by;
						rateReviewDetail.lastModifiedOn = new Date (rows[i].last_modified_on);

						rateReviewDetailArray.push (rateReviewDetail);		//Array creation
					}

					resultToReturn.itemCode = itemIDToFind;
					resultToReturn.avgRating = ratingTotal / totalRatingCount;
					resultToReturn.totalRatingCount = totalRatingCount;
					resultToReturn.fiveStar = fiveStar;
					resultToReturn.fourStar = fourStar;
					resultToReturn.threeStar = threeStar;
					resultToReturn.twoStar = twoStar;
					resultToReturn.oneStar = oneStar;

					resultToReturn.detail = rateReviewDetailArray;

					callback (err, resultToReturn);
                    return;
				}
			}); //con.query
		}); //getConnection
	} //getOneItemID


	/**
	 * list () extracts list of all objects from the database
	 *
	 * @param <function> callback (err, customer)
	 */
	public static list (callback) //add a param 'TableName' (as getReviewRatingByItemID()) , static method can use only static var
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
				console.log ("RateReview-static-list-getConnection has an error: " + err);
                callback (err);
				return;
			}


			//this.table name can not be used, as list () is static method.
			let selectQuery = "SELECT * FROM rate_review where is_deleted = 0 AND is_approved = 1";
								
			console.log ('RateReview-static-list-getConnection database connection thread id: ' + con.threadId);
			console.log ("RateReview-static-list-getConnection-con.query selectAllQuery: " + selectQuery);

			/**
			 * con.query () queries the database 
			 *
			 * @param <string> sql query
			 * @param <Array> sql query param 
			 * @return err or database result object
			 */
			con.query (selectQuery, function (err, rows)
			{
				console.log ('RateReview-static-list-getConnection-con.query before connection release.');
				con.release ();

				if (err) 
				{  
					console.log ("RateReview-static-list-getConnection-con.query has an error: " + err);
					callback (err);
                    return;
				}
				else
				{
					console.log ("RateReview-static-list-getConnection-con.query selectAllQuery is OK." + rows);
					
					//Converting database object into business logic ...			
					
					let rateAndReviews: RateReview[] = Array ();

					for (let i = 0; i < rows.length; i++)
					{
						rateAndReviews.push (new RateReview (rows[i].id, 
                                                            rows[i].Item_Code, 
                                                            rows[i].review, 
                                                            rows[i].rate,
                                                            rows[i].created_by, 
                                                            rows[i].created_on, 
                                                            rows[i].lastModified_by, 
                                                            rows[i].lastModified_on));
					}

                    console.log ("RateReview-delete-getConnection-con.query has an error: " + util.inspect (rateAndReviews));
					callback (err, rateAndReviews);
                    return;
				}
			}); //con.query
		}); //getConnection
	}; //static list

} //RateReview