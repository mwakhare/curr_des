import * as joi from "joi";

export default {
	// POST /api/users
	createUser: {
		body: {
			username: joi.string().required(),
			mobileNumber: joi.string().regex(/^[1-9][0-9]{9}$/).required()
		}
	},

	// UPDATE /api/users/:userId
	updateUser: {
		body: {
			name: joi.string().required(),
			//mobileNumber: joi.string().regex(/^[1-9][0-9]{9}$/).required()
		},
		params: {
			userId: joi.string().hex().required()
		}
	},

	// POST /api/auth/login
	login: {
		body: {
			email: joi.string().email().required(),
			password: joi.string().required()
		}
	},

	// POST /api/auth/register
	register: {
		body: {
			name: joi.string().required(),
			email: joi.string().email().required(),
			password: joi.string().required()
		}
	}
};