const chalk = require("chalk");
const Main = require("./src/Main");
const out = process.stdout;

let main = new Main("config.js");

main.on("httpReady", () => {
    console.log("HTTP Ready");
});

main.on("httpsReady", () => {
    console.log("HTTPS Ready");
});

main.start();
