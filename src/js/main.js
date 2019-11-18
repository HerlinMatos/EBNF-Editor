const { parseEbnf, createDocumentation } = require("ebnf2railroad");

const ebnf = document.getElementById("ebnf-textarea").value;
const ast = parseEbnf(ebnf); // can throw parse error exceptions
const htmlOutput = createDocumentation(ast,{});

const container = document.getElementById("container");
const astContainer = document.getElementById("ast-container");

container.innerHTML = htmlOutput;
astContainer.innerText = JSON.stringify(ast);