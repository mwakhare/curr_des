"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ProductBase_1 = require("./ProductBase");
var getConnection = require("../../../config/db.service");
var util = require("util");
var Product = (function (_super) {
    __extends(Product, _super);
    function Product(id, product_info) {
        var _this = _super.call(this, id, product_info) || this;
        _this.save = function (callback) {
            getConnection(function (err, con) {
                if (err) {
                    console.log("Product-save-getConnection: has an error." + err);
                    callback(err);
                    return;
                }
                console.log('product-save-getConnection: database connection thread id: ' + con.threadId);
                var query = "INSERT INTO product (product_info) VALUES ( ? )";
                console.log("product-save-getConnection: query: " + query);
                con.query(query, JSON.stringify(_this.product_info), function (err, result) {
                    console.log('Product-save-getConnection-con.query before release message.');
                    con.release();
                    if (err) {
                        console.log("Product-save-getConnection-con.query has an error: " + err);
                        callback(err);
                        return;
                    }
                    _this.id = result.insertId;
                    console.log('Product-save-getConnection-con.query- Product is Created (OK.): Record Database ID: ' + result.insertId);
                    console.log('Product-save-getConnection: database connection thread id: ' + con.threadId);
                    callback(null, true);
                });
            });
        };
        _this.update = function (callback) {
            getConnection(function (err, con) {
                console.log("Inside update getconnection method.");
                if (err) {
                    console.log("products-update-getConnection1- has an error: " + err);
                    callback(err);
                    return;
                }
                console.log('products-update-getConnection (product table) database connection thread id: ' + con.threadId);
                var query = "UPDATE product SET product_info = ? WHERE id = ?";
                console.log("products-update-getConnection - query: " + query);
                con.query(query, [JSON.stringify(_this.product_info), _this.id], function (err, result) {
                    console.log("Inside update getconnection con.query method.");
                    console.log("products-update-getConnection-con.query before release message.");
                    con.release();
                    if (err) {
                        console.log("products-update-getConnection-con.query has an error: " + err);
                        callback(err);
                        return;
                    }
                    callback(null, true);
                    return;
                });
            });
        };
        _this.delete = function (callback) {
            console.log("In delete method.");
            console.log(_this);
            var id = _this.id;
            getConnection(function (err, con) {
                if (err) {
                    console.log("products-delete-getConnection has an error: " + err);
                    callback(err);
                    return;
                }
                console.log('products-delete-getConnection- (products) - database connection thread id: ' + con.threadId);
                console.log("In getConnection method.");
                var deleteproductsQuery = "UPDATE product SET is_deleted = 1 WHERE id = " + id;
                con.query(deleteproductsQuery, function (err, products) {
                    console.log("products-delete-getConnection-con.query (products) before release message.");
                    con.release();
                    if (err) {
                        console.log("products-delete-getConnection-con.query has an error: " + err);
                        console.log("products-delete-getConnection-con.query has an error: " + util.inspect(this));
                        callback(err);
                        return;
                    }
                    callback(null, true);
                    return;
                });
            });
        };
        return _this;
    }
    Product.getProduct = function (productIDToFind, callback) {
        getConnection(function (err, con) {
            if (err) {
                console.log("getProduct getConnection has an error: " + err);
                return;
            }
            var productQuery = 'SELECT * from product where id = ' + productIDToFind;
            con.query(productQuery, function (err, product) {
                con.release();
                if (err) {
                    console.log("getProduct  getConnection-con.query has an error: " + err);
                    callback(err);
                }
                else {
                    var id = product[0].id;
                    var product_info = product[0].product_info;
                    var is_deleted = product[0].is_deleted;
                    var prod = new Product(id, product_info);
                    callback(err, prod, is_deleted);
                }
            });
        });
    };
    Product.getOneProduct = function (productIDToFind, callback) {
        getConnection(function (err, con) {
            if (err) {
                console.log("product-static-getOne-getConnection has an error: " + err);
                return;
            }
            console.log('product-static-getOne-getConnection- database connection thread id: ' + con.threadId);
            var productQuery = 'SELECT * from product where id = ' + productIDToFind;
            console.log("product-static-getOne-getConnection: productQuery: " + productQuery);
            con.query(productQuery, function (err, product) {
                console.log('product-static-getOne-getConnection-con.query before release');
                con.release();
                if (err) {
                    console.log("product-static-getOne-getConnection-con.query has an error: " + err);
                    callback(err);
                }
                else {
                    console.log("product-static-getOne-getConnection-con.query: productQuery is OK.");
                    var product_info = void 0;
                    if (product[0].product_info !== undefined) {
                        product_info = JSON.parse(product[0].product_info);
                    }
                    var product1 = new Product(product[0].id, product_info);
                    callback(err, product1);
                }
            });
        });
    };
    Product.list = function (callback) {
        getConnection(function (err, con) {
            if (err) {
                console.log("getConnection  error");
                return;
            }
            var productQuery = "SELECT * from product";
            con.query(productQuery, function (err, products) {
                con.release();
                if (err) {
                    console.log("productQuery  error");
                    callback(err);
                }
                else {
                    callback(err, products);
                }
            });
        });
    };
    ;
    return Product;
}(ProductBase_1.ProductBase));
exports.Product = Product;
//# sourceMappingURL=Product.js.map