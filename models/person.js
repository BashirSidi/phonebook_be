const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
require('dotenv').config();
//const password = process.argv[2];
const MONGO_URL_LOCAL = process.env.MONGO_URL_LOCAL;
mongoose
	.connect(MONGO_URL_LOCAL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true
	})
	.then(() => {
		console.log('connected to MongoDB');
	})
	.catch((err) => {
		console.log('error connecting to MongoDB', err.messsage);
	});

mongoose.Promise = Promise;

// mongoose.connection.on('connected', () => {
// 	console.log('mongoose is connected!!!');
// });

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		minlength: 3
	},
	number: {
		type: String,
		required: true,
		unique: true,
		minlength: 8
	}
});

personSchema.plugin(uniqueValidator);

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject.__v;
		delete returnedObject._id;
	}
});

module.exports = mongoose.model('Person', personSchema);
