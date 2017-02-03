const fs       = require("fs")
const path     = require("path")
let currentNum = require("./getNum.js")()

let src = path.join(__dirname, "../src",currentNum    + ".js");
let out = path.join(__dirname, "../src", currentNum+1 + ".js");
fs.createReadStream(src).pipe(fs.createWriteStream(out))
