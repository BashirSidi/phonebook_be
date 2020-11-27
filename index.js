const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body '));

let persons = [
	{
		id: 1,
		name: 'Bashir Sidi',
		number: '+2348067753638'
	},
	{
		id: 2,
		name: 'BashBerry',
		number: '08103510117'
	},
	{
		id: 3,
		name: 'Ahmad Lawan',
		number: '07023673847'
	},
	{
		id: 4,
		name: 'B Babagana',
		number: '09095383534'
	}
];

// const generateId = () => {
// 	const maxId = persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0;
// 	return maxId + 1;
// };

const generateId = () => {
	const newId = Math.floor(Math.random() * 5000);
	return newId;
};

app.get('/', (req, res) => {
	res.send('PHONEBOOK BACKEND index route');
});

app.get('/info', (req, res) => {
	const pT = persons.length;
	const dt = new Date();
	res.send(`The phonebook has ${pT} people. ${dt}`);
});

app.get('/api/persons', (req, res) => {
	res.json(persons);
});

app.post('/api/persons', (req, res) => {
	const person = {
		id: generateId(),
		name: 'Ahmad Sidi',
		number: '+1231231234'
	};
	if (person.name === '' || person.number === '') {
		alert('name or number is missing!');
	} else {
		const name = persons.find((p) => p.name === person.name);
		if (name) {
			res.status(404).send({ error: 'name already exist in the phonebook' });
		} else {
			const data = persons.concat(person);
			res.json(data);
		}
	}
});

app.get('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id);
	const person = persons.find((p) => p.id === id);
	if (person) {
		res.json(person);
	} else {
		res.status(404).end();
	}
});

app.delete('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id);
	persons = persons.filter((p) => p.id !== id);
	res.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`App is listening on port ${PORT}`);
});
