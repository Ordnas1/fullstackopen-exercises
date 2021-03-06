require("dotenv").config();

const PORT = process.env.PORT;
let MONGO_URL = process.env.MONGODB_URL;
const ENV = process.env.NODE_ENV;

if (ENV === "test") {
  MONGO_URL = process.env.TEST_MONGODB_URL;
}

module.exports = {
  PORT,
  MONGO_URL,
  ENV,
};
