const mongoose = require("mongoose");
const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

mongoose
  .connect(url, { family: 4 })
  .then((result) => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.error("Failed to establish connection with MongoDB", error.message);
  });

const personSchema = new mongoose.Schema({
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{2,3}-\d+/.test(v);
      },
      message: (props) => `${props.value} is not a valid number`,
    },
    required: true,
  },
  name: { type: String, minLength: 3, required: true },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
