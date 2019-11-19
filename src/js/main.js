const { parseEbnf, createDocumentation } = require("ebnf2railroad");
import React from 'react';
import ReactDOM from 'react-dom';
import Tree from 'react-d3-tree';

document.getElementById("ebnf-evaluate-btn").addEventListener("click", evaluateEbnfInput);

function traverse(node){
    const isObject = (n) => typeof n === 'object' && n.constructor === Object;
    const isArray = (n) => typeof n === 'object' && n.constructor === Array;
    
    if(isObject(node)){
        const name = "";
        const attributes = Object.keys(node);
        // const nodeArray = Object.keys(node).map(k => ({[k] : node[k]}));
        const nodeArray = Object.values(node);
        const children = nodeArray.map(traverse);
        return {name, attributes, children};
    }else if(isArray(node)){
        const name = "Array";
        const children = node.map(traverse);
        return {name, children};
    }else{
        return {name: node.toString()};
    }
}

function evaluateEbnfInput(){
    const ebnf = document.getElementById("ebnf-textarea").value;
    const ast = parseEbnf(ebnf); // can throw parse error exceptions
    const htmlOutput = createDocumentation(ast,{});
    
    const container = document.getElementById("container");
    const astContainer = document.getElementById("ast-container");
    const treeViewContainer = document.getElementById("tree-view-container");
    
    let newAst = traverse(ast);
    console.log(newAst);
    
    container.innerHTML = htmlOutput;
    astContainer.innerText = JSON.stringify(newAst);
    ReactDOM.render(<Tree data={newAst} />, treeViewContainer);
}
