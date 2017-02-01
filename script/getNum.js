const fs = require("fs")
const path = require("path")

module.exports = () => {
  let dir = fs.readdirSync(path.join(__dirname, "../src"));
  if(dir.length === 0 ) return 0;
  let num = dir.map( str => str.match(/^(\d*)\.js$/))
    .filter( e => e )
    .map( matches => matches[1] )
    .map( str => +str );
  let max = Math.max(...num);
  return max;
}
