const { User } = require("../models/User")
const { Employee } = require("../models/Employee")
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLInt, GraphQLNonNull } = require("graphql")

const UserType = new GraphQLObjectType({
	name: "User",
	fields: () => ({
		id: { type: GraphQLID },
		username: { type: GraphQLString },
		email: { type: GraphQLString },
		password: { type: GraphQLString }
	})
})

const EmployeeType = new GraphQLObjectType({
	name: "Employee",
	fields: () => ({
		id: { type: GraphQLID },
		first_name: { type: GraphQLString },
		last_name: { type: GraphQLString },
		email: { type: GraphQLString },
		gender: { type: GraphQLString },
		salary: { type: GraphQLInt }
	})
})
const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		login: {
			type: UserType,
			args: {
				username: { type: new GraphQLNonNull(GraphQLString) },
				password: { type: new GraphQLNonNull(GraphQLString) }
			},
			async resolve(parent, args) {
				const user = await User.findOne({ username: args.username, password: args.password })

				return user
			}
		},
		getAllEmployees: {
			type: new GraphQLList(EmployeeType),
			resolve(parent, args) {
				return Employee.find()
			}
		},

		getEmployeeById: {
			type: EmployeeType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Employee.findById(args.id)
			}
		}
	}
})

// Mutations

const mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		addUser: {
			type: UserType,
			args: {
				username: { type: new GraphQLNonNull(GraphQLString) },
				email: { type: new GraphQLNonNull(GraphQLString) },
				password: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve(parent, args) {
				const user = new User({
					username: args.username,
					email: args.email,
					password: args.password
				})

				return user.save()
			}
		},
		addNewEmployee: {
			type: EmployeeType,
			args: {
				first_name: { type: new GraphQLNonNull(GraphQLString) },
				last_name: { type: new GraphQLNonNull(GraphQLString) },
				email: { type: new GraphQLNonNull(GraphQLString) },
				gender: { type: GraphQLString },
				salary: { type: new GraphQLNonNull(GraphQLInt) }
			},
			resolve(parent, args) {
				const newEmployee = Employee({
					first_name: args.first_name,
					last_name: args.last_name,
					email: args.email,
					gender: args.gender,
					salary: args.salary
				})
				return newEmployee.save()
			}
		},
		updateEmployeeById: {
			type: EmployeeType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString) },
				first_name: { type: new GraphQLNonNull(GraphQLString) },
				last_name: { type: new GraphQLNonNull(GraphQLString) },
				email: { type: new GraphQLNonNull(GraphQLString) },
				gender: { type: GraphQLString },
				salary: { type: new GraphQLNonNull(GraphQLInt) }
			},
			resolve(parent, args) {
				const updatedEmployee = Employee.findByIdAndUpdate(args.id, {
					first_name: args.first_name,
					last_name: args.last_name,
					email: args.email,
					gender: args.gender,
					salary: args.salary
				})
				return updatedEmployee
			}
		},

		deleteEmployeeById: {
			type: EmployeeType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				const deleteEmployee = Employee.findByIdAndDelete(args.id)
				return deleteEmployee
			}
		}
	}
})

module.exports = new GraphQLSchema({ query: RootQuery, mutation })
