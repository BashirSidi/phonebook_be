const mongoose = require('mongoose');
require('dotenv').config();
const generateId = () => {
	const newId = Math.floor(Math.random() * 5000);
	return newId;
};

if (process.argv.length < 3) {
	console.log('Please provide the password as an argument: node mongo.js <password>');
	process.exit(1);
}

const password = process.argv[2];

const MONGO_URL = `mongodb+srv://bashberry:${password}@phonebookdb.u9fby.mongodb.net/phonebookdb?retryWrites=true&w=majority`;

mongoose.connect(MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
});

mongoose.connection.on('connected', () => {
	console.log('mongoose is connected!!!');
});

const personSchema = new mongoose.Schema({
	id: Number,
	name: String,
	number: String
});

const Person = mongoose.model('Person', personSchema);

// const person = new Person({
// 	id: generateId(),
// 	name: process.argv[3],
// 	number: process.argv[4]
// });

// person.save().then((result) => {
// 	console.log(`added ${result.name} - ${result.number} to phonebook`);
// 	mongoose.connection.close();
// });

Person.find({}).then((result) => {
	result.forEach((note) => {
		console.log(note);
	});
	mongoose.connection.close();
});
