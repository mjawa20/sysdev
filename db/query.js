const migrationQuery = `
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  age INT NOT NULL
)
`
const register = "DROP PROCEDURE IF EXISTS register; CREATE PROCEDURE register(IN username VARCHAR(255), IN password VARCHAR(255), IN age INT)\n" +
  "BEGIN\n" +
  "INSERT INTO users (username, password, age) VALUES (username, password, age);\n" +
  "END\n"

const getUserByUsername = "DROP PROCEDURE IF EXISTS getUserByUsername; CREATE PROCEDURE getUserByUsername(IN usernameParam VARCHAR(255))\n" +
  "BEGIN\n" +
  "SELECT * FROM users WHERE username = usernameParam; \n" +
  "END\n"

const getAllUser = "DROP PROCEDURE IF EXISTS getAllUser; CREATE PROCEDURE getAllUser()\n" +
  "BEGIN\n" +
  "SELECT * FROM users; \n" +
  "END\n"

module.exports = { migrationQuery, getAllUser, getUserByUsername, register }