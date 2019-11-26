const { parseEbnf, createDocumentation } = require("ebnf2railroad");
const { formatTree } = require("./tree-utils.js");
import React from 'react';
import ReactDOM from 'react-dom';
import Tree from 'react-d3-tree';

document.getElementById("ebnf-evaluate-btn").addEventListener("click", evaluateEbnfInput);

function evaluateEbnfInput(){
    const ebnf = document.getElementById("ebnf-textarea").value;
    const ast = parseEbnf(ebnf); // can throw parse error exceptions
    const htmlOutput = createDocumentation(ast,{});
    
    const container = document.getElementById("container");
    const astContainer = document.getElementById("ast-container");
    const treeViewContainer = document.getElementById("tree-view-container");
    
    const newAst = formatTree(ast);
    
    container.innerHTML = htmlOutput;
    astContainer.innerText = JSON.stringify(newAst);
    ReactDOM.render(<Tree data={newAst} />, treeViewContainer);
}

var editor = ace.edit("editor");
editor.setTheme("ace/theme/chrome");
editor.setOptions({
    fontSize: "12pt",
    enableLiveAutocompletion: true
});
editor.session.setMode("ace/mode/javascript");
