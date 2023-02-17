const mongoose = require("mongoose")

const EmployeeSchema = mongoose.Schema({
	first_name: {
		type: String,
		required: true
	},
	last_name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	gender: {
		type: String
	},
	salary: {
		type: Number,
		required: true
	}
})

EmployeeSchema.pre("findOneAndUpdate", function (next) {
	this.options.runValidators = true
	next()
})
const EmployeeModel = mongoose.model("Employee", EmployeeSchema, "employees")
module.exports.Employee = EmployeeModel
