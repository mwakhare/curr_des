"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getConnection = require("../../../config/db.service");
var util = require("util");
var RateReview = (function () {
    function RateReview(id, itemCode, review, rate, createdBy, createdOn, lastModifiedBy, lastModifiedOn, tableName) {
        if (tableName === void 0) { tableName = "rate_review"; }
        var _this = this;
        this.save = function (callback) {
            getConnection(function (err, con) {
                if (err) {
                    console.log("RateReview-save-getConnection: has an error." + err);
                    callback(err);
                    return;
                }
                console.log('RateReview-save-getConnection: database connection thread id: ' + con.threadId);
                var queryToSave = "INSERT INTO " + _this.TableName + " (Item_Code, review, rate, created_by, created_on, last_modified_by,  last_modified_on) "
                    + "VALUES ( ?, ?, ?, ?, ?, ?, ? )";
                console.log("RateReview-save-getConnection: query: " + queryToSave);
                con.query(queryToSave, [_this.ItemCode, _this.Review, _this.Rate,
                    _this.CreatedBy, _this.CreatedOn, _this.LastModifiedBy, _this.LastModifiedOn], function (err, result) {
                    console.log('RateReview-save-getConnection-con.query before release message.');
                    con.release();
                    if (err) {
                        console.log("RateReview-save-getConnection-con.query has an error: " + err);
                        callback(err);
                        return;
                    }
                    _this.ID = result.insertId;
                    console.log('RateReview-save-getConnection-con.query- User is Created (OK.): Record Database ID: ' + result.insertId);
                    callback(null, true);
                    return;
                });
            });
        };
        this.update = function (callback) {
            getConnection(function (err, con) {
                if (err) {
                    console.log("RateReview-update-getConnection- has an error: " + err);
                    callback(err);
                    return;
                }
                console.log('RateReview-update-getConnection database connection thread id: ' + con.threadId);
                var queryToUpdate = "UPDATE " + _this.TableName + " SET "
                    + "last_modified_by = " + _this.LastModifiedBy + ", "
                    + "last_modified_on = '" + _this.LastModifiedOn.toISOString().slice(0, 10) + "' "
                    + "WHERE id = " + _this.ID;
                console.log("RateReview-update-getConnection - queryToUpdate: " + queryToUpdate);
                con.query(queryToUpdate, function (err, result) {
                    console.log("RateReview-update-getConnection-con.query before release message.");
                    con.release();
                    if (err) {
                        console.log("RateReview-update-getConnection-con.query has an error. queryToUpdate: " + err);
                        callback(err);
                        return;
                    }
                    else {
                        console.log('RateReview-update-getConnection-con.query RateReview is Updated. result.changedRows: ' + result.changedRows);
                        callback(null, true);
                        return;
                    }
                });
            });
        };
        this.delete = function (callback) {
            console.log("Inside the RateReview-delete method.");
            console.log(_this);
            getConnection(function (err, con) {
                if (err) {
                    console.log("RateReview-delete-getConnection has an error: " + err);
                    callback(err);
                    return;
                }
                console.log('RateReview-delete-getConnection- database connection thread id: ' + con.threadId);
                console.log("Inside the RateReview-delete-getConnection method.");
                var deleteRateReviewQuery = "UPDATE " + _this.TableName + " SET is_deleted = 1 WHERE id = " + _this.ID;
                con.query(deleteRateReviewQuery, function (err, users) {
                    console.log("RateReview-delete-getConnection-con.query (deleteRateReviewQuery) before release message.");
                    con.release();
                    if (err) {
                        console.log("RateReview-delete-getConnection-con.query has an error: " + err);
                        console.log("RateReview-delete-getConnection-con.query has an error: " + util.inspect(this));
                        callback(err);
                        return;
                    }
                    callback(null, true);
                    return;
                });
            });
        };
        this.unDelete = function (callback) {
            console.log("Inside the RateReview-unDelete method.");
            console.log(_this);
            getConnection(function (err, con) {
                if (err) {
                    console.log("RateReview-unDelete-getConnection has an error: " + err);
                    callback(err);
                    return;
                }
                console.log('RateReview-unDelete-getConnection- database connection thread id: ' + con.threadId);
                console.log("Inside the RateReview-unDelete-getConnection method.");
                var unDeleteRateReviewQuery = "UPDATE " + _this.TableName + " SET is_deleted = 0 WHERE id = " + _this.ID;
                con.query(unDeleteRateReviewQuery, function (err, users) {
                    console.log("RateReview-unDelete-getConnection-con.query (unDeleteRateReviewQuery) before release message.");
                    con.release();
                    if (err) {
                        console.log("RateReview-unDelete-getConnection-con.query has an error: " + err);
                        console.log("RateReview-unDelete-getConnection-con.query has an error: " + util.inspect(this));
                        callback(err);
                        return;
                    }
                    callback(null, true);
                    return;
                });
            });
        };
        this._id = id;
        this._itemCode = itemCode;
        this._review = review;
        this._rate = rate;
        this._createdBy = createdBy;
        this._createdOn = new Date(createdOn);
        this._lastModifiedBy = lastModifiedBy;
        this._lastModifiedOn = new Date(lastModifiedOn);
        this._tableName = tableName;
    }
    Object.defineProperty(RateReview.prototype, "ID", {
        get: function () {
            return this._id;
        },
        set: function (id) {
            this._id = id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RateReview.prototype, "ItemCode", {
        get: function () {
            return this._itemCode;
        },
        set: function (itemCode) {
            this._itemCode = itemCode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RateReview.prototype, "Review", {
        get: function () {
            return this._review;
        },
        set: function (review) {
            this._review = review;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RateReview.prototype, "Rate", {
        get: function () {
            return this._rate;
        },
        set: function (rate) {
            this._rate = rate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RateReview.prototype, "CreatedBy", {
        get: function () {
            return this._createdBy;
        },
        set: function (createdBy) {
            this._createdBy = createdBy;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RateReview.prototype, "CreatedOn", {
        get: function () {
            return this._createdOn;
        },
        set: function (createdOn) {
            this._createdOn = new Date(createdOn);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RateReview.prototype, "LastModifiedBy", {
        get: function () {
            return this._lastModifiedBy;
        },
        set: function (lastModifiedBy) {
            this._lastModifiedBy = lastModifiedBy;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RateReview.prototype, "LastModifiedOn", {
        get: function () {
            return this._lastModifiedOn;
        },
        set: function (lastModifiedOn) {
            this._lastModifiedOn = lastModifiedOn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RateReview.prototype, "IsApproved", {
        get: function () {
            return this._is_Approved;
        },
        set: function (isApproved) {
            this._is_Approved = isApproved;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RateReview.prototype, "TableName", {
        get: function () {
            return this._tableName;
        },
        set: function (tableName) {
            this._tableName = tableName;
        },
        enumerable: true,
        configurable: true
    });
    RateReview.getOne = function (rateAndReviewIDToFind, callback) {
        getConnection(function (err, con) {
            if (err) {
                console.log("RateReview-static-getOne-getConnection has an error: " + err);
                return;
            }
            console.log('RateReview-static-getOne-getConnection- database connection thread id: ' + con.threadId);
            var selectOneQuery = "SELECT * FROM rate_review where id = " + rateAndReviewIDToFind + " AND is_deleted = 0";
            console.log("RateReview-static-getOne-getConnection: selectOneQuery: " + selectOneQuery);
            con.query(selectOneQuery, function (err, rows) {
                console.log('RateReview-static-getOne-getConnection-con.query before release');
                con.release();
                if (err) {
                    console.log("RateReview-static-getOne-getConnection-con.query has an error: " + err);
                    callback(err);
                    return;
                }
                else {
                    console.log("RateReview-static-getOne-getConnection-con.query: selectOneQuery is OK.");
                    var rateAndReview = new RateReview(rows[0].id, rows[0].Item_Code, rows[0].review, rows[0].rate, rows[0].created_by, rows[0].created_on, rows[0].last_modified_by, rows[0].last_modified_on);
                    callback(err, rateAndReview);
                    return;
                }
            });
        });
    };
    RateReview.getReviewRatingByItemID = function (itemIDToFind, tableToSql, callback) {
        getConnection(function (err, con) {
            if (err) {
                console.log("RateReview-static-getOneItemID-getConnection has an error: " + err);
                return;
            }
            console.log('RateReview-static-getOneItemID-getConnection- database connection thread id: ' + con.threadId);
            var selectOneItemIDQuery = "SELECT * FROM " + tableToSql + " where Item_Code = " + itemIDToFind + " AND is_deleted = 0 AND is_approved = 1";
            console.log("RateReview-static-getOneItemID-getConnection: selectOneItemIDQuery: " + selectOneItemIDQuery);
            con.query(selectOneItemIDQuery, function (err, rows) {
                console.log('RateReview-static-getOneItemID-getConnection-con.query before release');
                con.release();
                if (err) {
                    console.log("RateReview-static-getOneItemID-getConnection-con.query has an error: " + err);
                    callback(err);
                    return;
                }
                else {
                    console.log("RateReview-static-getOneItemID-getConnection-con.query: selectOneItemIDQuery is OK.");
                    var ratingTotal = 0;
                    var totalRatingCount = 0;
                    var fiveStar = 0;
                    var fourStar = 0;
                    var threeStar = 0;
                    var twoStar = 0;
                    var oneStar = 0;
                    var resultToReturn = {
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
                    var rateReviewDetailArray = Array();
                    for (var i = 0; i < rows.length; i++) {
                        if (rows[i].rate !== undefined) {
                            ratingTotal = ratingTotal + rows[i].rate;
                            if (rows[i].rate === 5) {
                                fiveStar++;
                            }
                            if (rows[i].rate === 4) {
                                fourStar = fourStar + 1;
                            }
                            if (rows[i].rate === 3) {
                                threeStar++;
                            }
                            if (rows[i].rate === 2) {
                                twoStar++;
                            }
                            if (rows[i].rate === 1) {
                                oneStar++;
                            }
                        }
                        totalRatingCount++;
                        var rateReviewDetail = {
                            rating: 0,
                            review: "",
                            createdBy: 0,
                            createdOn: new Date("2017-01-01"),
                            lastModifiedBy: 0,
                            lastModifiedOn: new Date("2017-01-01"),
                            isDeleted: false,
                            isApproved: true
                        };
                        rateReviewDetail.rating = rows[i].rate;
                        rateReviewDetail.review = rows[i].review;
                        rateReviewDetail.createdBy = rows[i].created_by;
                        rateReviewDetail.createdOn = new Date(rows[i].created_on);
                        rateReviewDetail.lastModifiedBy = rows[i].last_modified_by;
                        rateReviewDetail.lastModifiedOn = new Date(rows[i].last_modified_on);
                        rateReviewDetailArray.push(rateReviewDetail);
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
                    callback(err, resultToReturn);
                    return;
                }
            });
        });
    };
    RateReview.list = function (callback) {
        getConnection(function (err, con) {
            if (err) {
                console.log("RateReview-static-list-getConnection has an error: " + err);
                callback(err);
                return;
            }
            var selectQuery = "SELECT * FROM rate_review where is_deleted = 0 AND is_approved = 1";
            console.log('RateReview-static-list-getConnection database connection thread id: ' + con.threadId);
            console.log("RateReview-static-list-getConnection-con.query selectAllQuery: " + selectQuery);
            con.query(selectQuery, function (err, rows) {
                console.log('RateReview-static-list-getConnection-con.query before connection release.');
                con.release();
                if (err) {
                    console.log("RateReview-static-list-getConnection-con.query has an error: " + err);
                    callback(err);
                    return;
                }
                else {
                    console.log("RateReview-static-list-getConnection-con.query selectAllQuery is OK." + rows);
                    var rateAndReviews = Array();
                    for (var i = 0; i < rows.length; i++) {
                        rateAndReviews.push(new RateReview(rows[i].id, rows[i].Item_Code, rows[i].review, rows[i].rate, rows[i].created_by, rows[i].created_on, rows[i].lastModified_by, rows[i].lastModified_on));
                    }
                    console.log("RateReview-delete-getConnection-con.query has an error: " + util.inspect(rateAndReviews));
                    callback(err, rateAndReviews);
                    return;
                }
            });
        });
    };
    ;
    return RateReview;
}());
exports.RateReview = RateReview;
//# sourceMappingURL=ratereview.js.map