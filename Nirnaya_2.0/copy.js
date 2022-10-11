const fs = require("fs");
const path = require("path");

const now = () => new Date().toISOString();

// Executed before every build to refresh libs/fbf.module.js. Do not break!
const source = path.resolve("../FbF.WebSocket.Control/dist/fbf.module.js");
const target = path.resolve("./libs/fbf.module.js");

/* eslint-disable no-console */
console.log(`${now()} - Attempting to read ${source}`);
const bundle = fs.readFileSync(source);
console.log(`${now()} - Attempting to write ${target}`);
fs.writeFileSync(target, bundle);
console.log(`${now()} - Copy successful`);
/* eslint-enable no-console */