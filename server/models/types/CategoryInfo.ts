
export type CategoryInfo = {
	//id: number,
	category_name: string,
	category_description: string,
	category_parent: JSON | null,
	category_child: JSON | null,
	category_image: string,
	created_by: number,
	created_on: Date ,
	last_modified_by: number,
	last_modified_on: Date,
};