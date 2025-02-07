#! /usr/bin/env node
const options = {
  length: {
    val: 12, // Default length
    tokens: ["-l", "-length"],
  },
  capitals: {
    val: true, // Default is enabled
    tokens: ["-c", "-cap", "-capital", "-capitals"],
  },
  lowercase: {
    val: true, // Default is enabled
    tokens: ["-lo", "-lowercase", "-lower", "low"],
  },
  symbols: {
    val: true, // Default is enabled
    tokens: ["-s", "-symbols", "-sym", "-symbol"],
  },
  numbers: {
    val: true, // Default is enabled
    tokens: ["-n", "-numbers", "-number"],
  },
};

const args = process.argv.slice(2);

args.forEach((arg, index) => {
  for (const option in options) {
    if (!options[option].tokens.includes(arg)) continue;

    if (option === "length") {
      handleLengthOption(index);
    } else {
      toggleBooleanOption(option);
    }
  }
});

function handleLengthOption(index) {
  const lengthIndex = index + 1;
  if (lengthIndex < args.length && !isNaN(args[lengthIndex])) {
    options.length.val = parseInt(args[lengthIndex], 10);
  }
}

function toggleBooleanOption(option) {
  options[option].val = !options[option].val;
}

// Ensure at least one character set is selected
if (
  !options.capitals.val &&
  !options.lowercase.val &&
  !options.numbers.val &&
  !options.symbols.val
) {
  console.error("Error: At least one character set must be enabled.");
  process.exit(1);
}

// Build allowable character set
let allowableChars = "";
if (options.capitals.val) allowableChars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
if (options.lowercase.val) allowableChars += "abcdefghijklmnopqrstuvwxyz";
if (options.numbers.val) allowableChars += "0123456789";
if (options.symbols.val) allowableChars += "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

const trueOptions = Object.entries(options)
  .filter(([key, value]) => key !== "length" && value.val === true) // Only filter out length and get true values
  .map(([key]) => key); // Get only the keys of true options

console.log(
  `length: ${options.length.val}, options: ${trueOptions.join(", ")}`
);

// Generate password
let pass = "";
for (let i = 0; i < options.length.val; i++) {
  const randCharIndex = Math.floor(Math.random() * allowableChars.length);
  pass += allowableChars[randCharIndex];
}

// Copy to clipboard (macOS only)
if (process.platform === "darwin") {
  pbcopy(pass);
  console.log(`${pass} is copied to your clipboard`);
}

// Function to copy password to clipboard on macOS
function pbcopy(data) {
  const proc = require("child_process").spawn("pbcopy");
  proc.stdin.write(data);
  proc.stdin.end();
}
