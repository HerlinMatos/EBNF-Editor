const { parseEbnf, createDocumentation } = require("ebnf2railroad");
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
    
    container.innerHTML = htmlOutput;
    astContainer.innerText = JSON.stringify(ast);
    ReactDOM.render(<Tree data={ast} />, treeViewContainer);
}
