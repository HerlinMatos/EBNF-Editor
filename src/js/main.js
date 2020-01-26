const { parseEbnf, createDocumentation } = require("ebnf2railroad");
const { formatTree } = require("./tree-utils.js");
import React from 'react';
import ReactDOM from 'react-dom';
import Tree from 'react-d3-tree';
import Split from 'react-split'
import { create } from './editor'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css' // Import precompiled Bootstrap css
import '@fortawesome/fontawesome-free/css/all.css'
import '../scss/main.scss'

ReactDOM.render(<Split
    sizes={[100/3, 100/3, 100/3]}
    minSize={10}
    expandToMin={false}
    gutterSize={10}
    gutterAlign="center"
    snapOffset={30}
    dragInterval={1}
    direction="horizontal"
    cursor="col-resize">
    <div class="splited-item">
    <div id="editor"></div>
    </div>
    <div class="splited-item">
        <div id="container"></div>
        <div id="ast-container"></div>
    </div>
    <div class="splited-item">
        <div id="tree-view-container"></div>
    </div>
    </Split>, document.getElementById('root'));

function initEditor() {
    window.monacoInstance = create(document.getElementById('editor'));
    let storedValue = localStorage.getItem('ebnf.editor.text');
    if(storedValue)
        window.monacoInstance.setValue(storedValue);
}

function railRoadStyles() {
    document.querySelector('#container>header').remove();
    document.querySelector('#container>nav').remove();
    document.querySelector('#container>main').style.margin = 0;
}

function evaluateEbnfInput(event){
    event.preventDefault();
    try {
        const ebnf = monacoInstance.getValue();
        const ast = parseEbnf(ebnf); // can throw parse error exceptions
        const htmlOutput = createDocumentation(ast,{});
        const container = document.getElementById("container");
        // const astContainer = document.getElementById("ast-container");
        const treeViewContainer = document.getElementById("tree-view-container");
        const newAst = formatTree(ast);
        container.innerHTML = htmlOutput;
        railRoadStyles();
        // astContainer.innerText = JSON.stringify(newAst);
        ReactDOM.render(<Tree data={newAst} />, treeViewContainer);
    } catch (error) {
        alert(error);
    }
}

initEditor();

document.getElementById("ebnf-evaluate-btn").addEventListener("click", evaluateEbnfInput);
document.getElementById("ebnf-save-btn").addEventListener("click", function(event){
    event.preventDefault();
    localStorage.setItem('ebnf.editor.text', monacoInstance.getValue());
});
