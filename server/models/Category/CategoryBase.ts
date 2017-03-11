import {CategoryInfo} from '../types/CategoryInfo';
import * as mysql from 'mysql';

export class CategoryBase {
	protected _id: number | null;
	protected _category_info: CategoryInfo;
	constructor(id: number, category_info: CategoryInfo) {
		this._id = id;
		this._category_info = category_info;
	}
	get id(): number {
		return this._id;
	}
	set id(id: number) {
		this._id = id;
	}
	get category_info(): CategoryInfo {
		return this._category_info;
	}
	set category_info(category_info: CategoryInfo) {
		this._category_info = category_info;
	}
	save = (): void => {}
	delete = (): boolean => { return false; }
}