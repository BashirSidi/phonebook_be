const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const Person = require('./models/person');
const app = express();

app.use(express.static('build'));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body '));

app.get('/', (req, res) => {
	res.send('PHONEBOOK BACKEND INDEX ROUTE GOES HERE');
});

app.get('/info', (req, res) => {
	Person.find({})
		.then((persons) => {
			const pT = persons.length;
			const dt = new Date();
			res.send(`The phonebook has ${pT} people. ${dt}`);
		})
		.catch((err) => {
			console.log(err);
		});
});

app.get('/api/persons', (req, res) => {
	Person.find({})
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			res.send(err);
		});
});

app.post('/api/persons', (req, res) => {
	// if (body.content === undefined) {
	// 	return res.status(400).json({ error: 'content missing!' });
	// }
	Person.create(req.body)
		.then((newData) => {
			res.status(201).json(newData);
		})
		.catch((err) => {
			console.log(err);
			res.send(err);
		});
});

app.get('/api/persons/:id', (req, res, next) => {
	const id = req.params.id;
	Person.findById(id)
		.then((person) => {
			if (person) {
				res.json(person);
			} else {
				res.status(404).end();
			}
		})
		.catch((err) => {
			next(err);
			// console.log(err);
			// res.status(400).send({ error: 'malformatted id | bad request' });
		});
});

app.put('/api/persons/:id', (req, res, next) => {
	const id = req.params.id;
	Person.findByIdAndUpdate(id, req.body, { new: true })
		.then((upatedPerson) => {
			res.json(upatedPerson);
		})
		.catch((err) => next(err));
});

app.delete('/api/persons/:id', (req, res, next) => {
	const id = req.params.id;
	Person.findByIdAndRemove(id)
		.then(() => {
			res.status(204).end();
		})
		.catch((err) => next(err));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`App is listening on port ${PORT}`);
});
