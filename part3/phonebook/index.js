require("dotenv").config();
const express = require("express");
var morgan = require("morgan");
const Person = require("./models/person");

const app = express();
app.use(express.json());

morgan.token("body", function getBody(req) {
  return JSON.stringify(req.body);
});
app.use(morgan(":method :url :status 61 - :response-time ms :body"));
app.use(express.static("dist"));

app.get("/api/persons", (request, response, next) => {
  Person.find()
    .then((persons) => {
      if (persons) {
        response.json(persons);
      } else {
        response.json(400).end();
      }
    })
    .catch((error) => next(error));
});

app.get("/api/persons/info", (request, response, next) => {
  Person.countDocuments()
    .then((number) => {
      console.log(number);
      const date = new Date();
      response.send(`<div>
    <p>Phonebook has info for ${number} people</p>
    <p>${date}</p>
    </div>`);
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findById(id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(400).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findByIdAndDelete(id)
    .then((person) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number is missing from the request",
    });
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  });
  person
    .save()
    .then((savedPerson) => response.json(savedPerson))
    .catch((error) => next(error));
});

const opts = { runValidators: true };

app.put("/api/persons/:id", (request, response, next) => {
  const { name, number } = request.body;
  const id = request.params.id;
  Person.findById(id).then((person) => {
    if (!person) {
      return response.status(400).end();
    }

    console.log(name, number);

    person.name = name;
    person.number = number;

    return person
      .save()
      .then((result) => response.json(result))
      .catch((error) => {
        next(error);
      });
  });
});

const unknownEndpoint = (request, response) => {
  console.error("Unknown Endpoint");
  response.status(404).send({ error: "unkown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name == "Cast Error") {
    response.status(404).send("malformatted id");
  } else if (error.name === "ValidationError") {
    response.status(404).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Application started on port : ${PORT}`);
});
