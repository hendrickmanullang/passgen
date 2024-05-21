#! /usr/bin/env node
const passLength = process.argv[2] == null ? 12 : +process.argv[2];

let pass = "";
for (let i = 0; i < passLength; i++) {
  const randCharKey = Math.floor(Math.random() * (126 - 33) + 33);
  pass += String.fromCharCode(randCharKey);
}
console.log(`${pass} is copied to your clipboard`);
pbcopy(pass);

function pbcopy(data) {
  const proc = require("child_process").spawn("pbcopy");
  proc.stdin.write(data);
  proc.stdin.end();
}
