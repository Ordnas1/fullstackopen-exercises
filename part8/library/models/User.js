const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    requried: true,
    unique: true,
    minlength: 3,
  },
	favoriteGenre:  {
		type: String
	}
});


userSchema.plugin(uniqueValidator)

module.exports = mongoose.model("User", userSchema)