const { User } = require("../models/User")
const { Employee } = require("../models/Employee")
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLInt } = require("graphql")

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
		employees: {
			type: new GraphQLList(EmployeeType),
			resolve(parent, args) {
				return Employee.find()
			}
		},
		employee: {
			type: EmployeeType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Employee.findById(args.id)
			}
		}
	}
})

module.exports = new GraphQLSchema({ query: RootQuery })
