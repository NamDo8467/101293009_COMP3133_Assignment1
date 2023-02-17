const express = require("express")
const PORT = 5000
const { graphqlHTTP } = require("express-graphql")
const schema = require("./schema/schema")
const app = express()
const mongoose = require("mongoose")
const URI = "mongodb+srv://namdo:namdo@cluster0.qftfl.mongodb.net/comp3133_assignment1?retryWrites=true&w=majority"
app.use(
	"/graphql",
	graphqlHTTP({
		schema,
		graphiql: true
	})
)

mongoose.connect(URI, err => {
	if (err) {
		console.log(err)
	} else {
		console.log("MongoDB connected")
	}
})

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
