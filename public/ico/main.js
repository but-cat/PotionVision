const fs = require("fs")
const path = require("path")

const fileName = "./"

let files = fs.readdirSync(fileName);
files.forEach(function (value, key) {
	fs.rename(path.join(fileName, value), path.join(fileName, value.replace(/@3x/,"")), function (err) {
		if (err) throw err;
	});
});
console.log("Successfully renamed the file!");