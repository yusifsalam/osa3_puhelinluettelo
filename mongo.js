const mongoose = require("mongoose");

const url =
  "mongodb://fullstack:{}}fullstack-phonebook";
mongoose.connect(
  url,
  { useNewUrlParser: true }
);

const Person = mongoose.model("People", {
  name: String,
  number: String
});

if (process.argv.length === 2) {
  console.log("puhelinluettelo");
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 4) {
  const person = new Person({
    name: process.argv[2],
    number: process.argv[3]
  });
  person.save().then(result => {
    console.log(
      `lisataan henkilo ${result.name} numero ${result.number} luetteloon`
    );
    mongoose.connection.close();
  });
}
