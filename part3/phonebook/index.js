const express = require("express");
var morgan = require("morgan");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
morgan.token("body", function getBody(req) {
  return JSON.stringify(req.body);
});
app.use(morgan(":method :url :status 61 - :response-time ms :body"));

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/info", (request, response) => {
  const nPeople = persons.length;
  const date = new Date();
  response.send(`<div>
    <p>Phonebook has info for ${nPeople} people</p>
    <p>${date}</p>
    </div>`);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const id = String(Math.floor(1000000 * Math.random()));
  const body = request.body;
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number is missing from the request",
    });
  }
  const nameExists = (name) => {
    const anyone = persons.filter((person) => person.name === name);
    return anyone.length === 0 ? false : true;
  };
  if (nameExists(body.name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }
  const person = {
    ...body,
    id: id,
  };
  persons = persons.concat(person);
  response.json(person);
});

PORT = 3001;
app.listen(PORT, () => {
  console.log(`Application started on port : ${PORT}`);
});
