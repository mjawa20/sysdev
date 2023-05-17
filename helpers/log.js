const fs = require('fs')

module.exports = {
  writeLog: (message) => {
    fs.appendFileSync("log", message,
      { encoding: "utf8" }
    )
  }
}