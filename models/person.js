const mongoose = require("mongoose");
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const url = process.env.MONGODB_URI
mongoose.connect(
  url,
  { useNewUrlParser: true }
);
const PersonSchema = mongoose.Schema({
  name: String, 
  number: String
});

PersonSchema.statics.format = function(person) {
  return {
    name: person.name,
    number: person.number,
    id: person._id
  }
}

const Person = mongoose.model("People", PersonSchema);



module.exports = Person