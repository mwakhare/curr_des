import {ProductInfo} from '../types/ProductInfo';
import * as mysql from 'mysql';

export abstract class ProductBase {
	protected _id: number | null;
	protected _product_info: ProductInfo;
	constructor(id: number, product_info: ProductInfo) {
		this._id = id;
		this._product_info = product_info;
	}
	get id(): number {
		return this._id;
	}
	set id(id: number) {
		this._id = id;
	}
	get product_info(): ProductInfo {
		return this._product_info;
	}
	set product_info(product_info: ProductInfo) {
		this._product_info = product_info;
	}
	abstract save = (callback): void => {}
	abstract delete = (callback): void => {  }
}