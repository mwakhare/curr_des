"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Product_1 = require("../../server/models/Product/Product");
var util = require("util");
var ProductController = (function () {
    function ProductController() {
    }
    ProductController.prototype.load = function (req, res, next, id) {
        Product_1.Product.getOneProduct(id, function (err, product) {
            if (err) {
                return res.json(err);
            }
            else {
                req.loadedProduct = product;
                return next();
            }
        });
    };
    ProductController.prototype.getProduct = function (req, res) {
        return res.json(req.loadedProduct);
    };
    ProductController.prototype.list = function (req, res) {
        Product_1.Product.list(function (err, products) {
            if (err)
                return res.json(err);
            else
                return res.json(products);
        });
    };
    ProductController.prototype.product_save = function (req, res, next) {
        var name;
        if (req.body.name !== null || req.body.name !== "") {
            name = req.body.name;
        }
        var sku_number;
        if (req.body.sku_number !== null || req.body.sku_number !== "") {
            sku_number = req.body.sku_number;
        }
        var description;
        if (req.body.description !== null || req.body.description !== "") {
            description = req.body.description;
        }
        var price;
        if (req.body.price !== null || req.body.price !== "") {
            price = req.body.price;
        }
        var category_id1;
        if (req.body.category_id1 !== null || req.body.category_id1 !== "") {
            category_id1 = req.body.category_id1;
        }
        var category_id2;
        if (req.body.category_id2 !== null || req.body.category_id2 !== "") {
            category_id2 = req.body.category_id2;
        }
        var category_id;
        category_id = [category_id1, category_id2];
        var featured_image;
        if (req.body.featured_image !== null || req.body.featured_image !== "") {
            featured_image = req.body.featured_image;
        }
        var image_gallery1;
        if (req.body.image_gallery1 !== null || req.body.image_gallery1 !== "") {
            image_gallery1 = req.body.image_gallery1;
        }
        var image_gallery2;
        if (req.body.image_gallery2 !== null || req.body.image_gallery2 !== "") {
            image_gallery2 = req.body.image_gallery2;
        }
        var img_gallery = [image_gallery1, image_gallery2];
        var image_gallery;
        image_gallery = img_gallery;
        var type;
        if (req.body.type !== null || req.body.type !== "") {
            type = req.body.type;
        }
        var color_value1;
        if (req.body.color_value1 !== null || req.body.color_value1 !== "") {
            color_value1 = req.body.color_value1;
        }
        var color_variable;
        if (req.body.color_variable !== null || req.body.color_variable !== "") {
            color_variable = req.body.color_variable;
        }
        var color = { value: color_value1, variable: color_variable };
        var size_value1;
        if (req.body.size_value1 !== null || req.body.size_value1 !== "") {
            size_value1 = req.body.size_value1;
        }
        var size_value2;
        if (req.body.size_value2 !== null || req.body.size_value2 !== "") {
            size_value2 = req.body.size_value2;
        }
        var size_value3;
        if (req.body.size_value3 !== null || req.body.size_value3 !== "") {
            size_value3 = req.body.size_value3;
        }
        var size_value4;
        if (req.body.size_value3 !== null || req.body.size_value4 !== "") {
            size_value4 = req.body.size_value4;
        }
        var size_value5;
        if (req.body.size_value5 !== null || req.body.size_value5 !== "") {
            size_value5 = req.body.size_value5;
        }
        var size_value6;
        if (req.body.size_value6 !== null || req.body.size_value6 !== "") {
            size_value6 = req.body.size_value6;
        }
        var size_value7;
        if (req.body.size_value7 !== null || req.body.size_value7 !== "") {
            size_value7 = req.body.size_value7;
        }
        var size_val;
        size_val = [size_value1, size_value2, size_value3, size_value4, size_value5, size_value6, size_value7];
        var size_variable;
        if (req.body.size_variable !== null || req.body.size_variable !== "") {
            size_variable = req.body.size_variable;
        }
        var size = { value: size_val, variable: size_variable };
        var fabric_value1;
        if (req.body.fabric_value1 !== null || req.body.fabric_value1 !== "") {
            fabric_value1 = req.body.fabric_value1;
        }
        var fabric_variable;
        if (req.body.fabric_variable !== null || req.body.fabric_variable !== "") {
            fabric_variable = req.body.fabric_variable;
        }
        var fabric = { value: fabric_value1, variable: fabric_variable };
        var lining_value1;
        if (req.body.lining_value1 !== null || req.body.lining_value1 !== "") {
            lining_value1 = req.body.lining_value1;
        }
        var lining_variable;
        if (req.body.lining_variable !== null || req.body.lining_variable !== "") {
            lining_variable = req.body.lining_variable;
        }
        var lining = { value: lining_value1, variable: lining_variable };
        var sleeve_lining_value1;
        if (req.body.sleeve_lining_value1 !== null || req.body.sleeve_lining_value1 !== "") {
            sleeve_lining_value1 = req.body.sleeve_lining_value1;
        }
        var sleeve_lining_variable;
        if (req.body.sleeve_lining_variable !== null || req.body.sleeve_lining_variable !== "") {
            sleeve_lining_variable = req.body.sleeve_lining_variable;
        }
        var sleeve_lining = { value: sleeve_lining_value1, variable: sleeve_lining_variable };
        var attr = [{ color: color, size: size, fabric: fabric, lining: lining, sleeve_lining: sleeve_lining }];
        var attributes;
        attributes = attr;
        var sale_type;
        if (req.body.sale_type !== null || req.body.sale_type !== "") {
            sale_type = req.body.sale_type;
        }
        var sale_value;
        if (req.body.sale_value !== null || req.body.sale_value !== "") {
            sale_value = req.body.sale_value;
        }
        var sale_price1 = { type: sale_type, value: sale_value };
        var sale_price;
        sale_price = sale_price1;
        var sale_duration;
        if (req.body.sale_duration !== null || req.body.sale_duration !== "") {
            sale_duration = req.body.sale_duration;
        }
        sale_duration = new Date(sale_duration);
        var tag1;
        if (req.body.tag1 !== null || req.body.tag1 !== "") {
            tag1 = req.body.tag1;
        }
        var tag2;
        if (req.body.tag2 !== null || req.body.tag2 !== "") {
            tag2 = req.body.tag2;
        }
        var tag3;
        if (req.body.tag3 !== null || req.body.tag3 !== "") {
            tag3 = req.body.tag3;
        }
        var tag4;
        if (req.body.tag4 !== null || req.body.tag4 !== "") {
            tag4 = req.body.tag4;
        }
        var tag = [tag1, tag2, tag3, tag4];
        var tags;
        tags = tag;
        var product_info = {
            name: name,
            sku_number: sku_number,
            description: description,
            price: price,
            category_id: category_id,
            featured_image: featured_image,
            image_gallery: image_gallery,
            type: type,
            attributes: attributes,
            variation: null,
            stock: null,
            sale_price: sale_price,
            sale_duration: sale_duration,
            tags: tags
        };
        var currentProduct = new Product_1.Product(null, product_info);
        currentProduct.save(function (err, val) {
            if (err) {
                return res.json({ message: "product is NOT created." });
            }
            return res.json({ message: "product is created." });
        });
    };
    ProductController.prototype.update = function (req, res) {
        var product = req.loadedProduct;
        console.log("Inside controller update");
        console.log("before: " + util.inspect(product));
        if (typeof (req.body.name) != "undefined" || req.body.name != null) {
            product.product_info.name = req.body.name;
        }
        var sku_number;
        if (req.body.sku_number !== null || req.body.sku_number !== "") {
            product.product_info.sku_number = req.body.sku_number;
        }
        var description;
        if (req.body.description !== null || req.body.description !== "") {
            product.product_info.description = req.body.description;
        }
        var price;
        if (req.body.price !== null || req.body.price !== "") {
            product.product_info.price = req.body.price;
        }
        var category_id1;
        if (req.body.category_id1 !== null || req.body.category_id1 !== "") {
            category_id1 = req.body.category_id1;
        }
        var category_id2;
        if (req.body.category_id2 !== null || req.body.category_id2 !== "") {
            category_id2 = req.body.category_id2;
        }
        product.product_info.category_id = [category_id1, category_id2];
        var featured_image;
        if (req.body.featured_image !== null || req.body.featured_image !== "") {
            product.product_info.featured_image = req.body.featured_image;
        }
        var image_gallery1;
        if (req.body.image_gallery1 !== null || req.body.image_gallery1 !== "") {
            image_gallery1 = req.body.image_gallery1;
        }
        var image_gallery2;
        if (req.body.image_gallery2 !== null || req.body.image_gallery2 !== "") {
            image_gallery2 = req.body.image_gallery2;
        }
        var img_gallery = [image_gallery1, image_gallery2];
        var image_gallery;
        product.product_info.image_gallery = img_gallery;
        var type;
        if (req.body.type !== null || req.body.type !== "") {
            product.product_info.type = req.body.type;
        }
        var color_value1;
        if (req.body.color_value1 !== null || req.body.color_value1 !== "") {
            color_value1 = req.body.color_value1;
        }
        var color_variable;
        if (req.body.color_variable !== null || req.body.color_variable !== "") {
            color_variable = req.body.color_variable;
        }
        var color = { value: color_value1, variable: color_variable };
        var size_value1;
        if (req.body.size_value1 !== null || req.body.size_value1 !== "") {
            size_value1 = req.body.size_value1;
        }
        var size_value2;
        if (req.body.size_value2 !== null || req.body.size_value2 !== "") {
            size_value2 = req.body.size_value2;
        }
        var size_value3;
        if (req.body.size_value3 !== null || req.body.size_value3 !== "") {
            size_value3 = req.body.size_value3;
        }
        var size_value4;
        if (req.body.size_value3 !== null || req.body.size_value4 !== "") {
            size_value4 = req.body.size_value4;
        }
        var size_value5;
        if (req.body.size_value5 !== null || req.body.size_value5 !== "") {
            size_value5 = req.body.size_value5;
        }
        var size_value6;
        if (req.body.size_value6 !== null || req.body.size_value6 !== "") {
            size_value6 = req.body.size_value6;
        }
        var size_value7;
        if (req.body.size_value7 !== null || req.body.size_value7 !== "") {
            size_value7 = req.body.size_value7;
        }
        var size_val;
        size_val = [size_value1, size_value2, size_value3, size_value4, size_value5, size_value6, size_value7];
        var size_variable;
        if (req.body.size_variable !== null || req.body.size_variable !== "") {
            size_variable = req.body.size_variable;
        }
        var size = { value: size_val, variable: size_variable };
        var fabric_value1;
        if (req.body.fabric_value1 !== null || req.body.fabric_value1 !== "") {
            fabric_value1 = req.body.fabric_value1;
        }
        var fabric_variable;
        if (req.body.fabric_variable !== null || req.body.fabric_variable !== "") {
            fabric_variable = req.body.fabric_variable;
        }
        var fabric = { value: fabric_value1, variable: fabric_variable };
        var lining_value1;
        if (req.body.lining_value1 !== null || req.body.lining_value1 !== "") {
            lining_value1 = req.body.lining_value1;
        }
        var lining_variable;
        if (req.body.lining_variable !== null || req.body.lining_variable !== "") {
            lining_variable = req.body.lining_variable;
        }
        var lining = { value: lining_value1, variable: lining_variable };
        var sleeve_lining_value1;
        if (req.body.sleeve_lining_value1 !== null || req.body.sleeve_lining_value1 !== "") {
            sleeve_lining_value1 = req.body.sleeve_lining_value1;
        }
        var sleeve_lining_variable;
        if (req.body.sleeve_lining_variable !== null || req.body.sleeve_lining_variable !== "") {
            sleeve_lining_variable = req.body.sleeve_lining_variable;
        }
        var sleeve_lining = { value: sleeve_lining_value1, variable: sleeve_lining_variable };
        var attr = [{ color: color, size: size, fabric: fabric, lining: lining, sleeve_lining: sleeve_lining }];
        product.product_info.attributes = attr;
        var sale_type;
        if (req.body.sale_type !== null || req.body.sale_type !== "") {
            sale_type = req.body.sale_type;
        }
        var sale_value;
        if (req.body.sale_value !== null || req.body.sale_value !== "") {
            sale_value = req.body.sale_value;
        }
        var sale_price1 = { type: sale_type, value: sale_value };
        product.product_info.sale_price = sale_price1;
        var sale_duration;
        if (req.body.sale_duration !== null || req.body.sale_duration !== "") {
            sale_duration = req.body.sale_duration;
        }
        product.product_info.sale_duration = new Date(sale_duration);
        var tag1;
        if (req.body.tag1 !== null || req.body.tag1 !== "") {
            tag1 = req.body.tag1;
        }
        var tag2;
        if (req.body.tag2 !== null || req.body.tag2 !== "") {
            tag2 = req.body.tag2;
        }
        var tag3;
        if (req.body.tag3 !== null || req.body.tag3 !== "") {
            tag3 = req.body.tag3;
        }
        var tag4;
        if (req.body.tag4 !== null || req.body.tag4 !== "") {
            tag4 = req.body.tag4;
        }
        var tag = [tag1, tag2, tag3, tag4];
        product.product_info.tags = tag;
        product.update(function (err, val) {
            if (err) {
                return res.json({ message: "product is NOT Updated." });
            }
            return res.json({ message: "product is Updated." });
        });
        console.log("after: " + util.inspect(product));
    };
    ProductController.prototype.remove = function (req, res) {
        var product = req.loadedProduct;
        console.log(product);
        product.delete(function (err, result) {
            if (err)
                return res.json(err);
            return res.json({ message: "product is deleted." });
        });
    };
    return ProductController;
}());
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map