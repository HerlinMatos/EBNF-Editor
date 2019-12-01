const { parseEbnf, createDocumentation } = require("ebnf2railroad");
const { formatTree } = require("./tree-utils.js");
import React from 'react';
import ReactDOM from 'react-dom';
import Tree from 'react-d3-tree';
import Split from 'react-split'

document.getElementById("ebnf-evaluate-btn").addEventListener("click", evaluateEbnfInput);

function evaluateEbnfInput(){
    var editor = ace.edit("editor");
    const ebnf = editor.getValue();
    const ast = parseEbnf(ebnf); // can throw parse error exceptions
    const htmlOutput = createDocumentation(ast,{});
    
    const container = document.getElementById("container");
    const astContainer = document.getElementById("ast-container");
    const treeViewContainer = document.getElementById("tree-view-container");
    
    const newAst = formatTree(ast);
    
    container.innerHTML = htmlOutput;
    // astContainer.innerText = JSON.stringify(newAst);
    ReactDOM.render(<Tree data={newAst} />, treeViewContainer);
}

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
    <pre id="editor"></pre>
    </div>
    <div class="splited-item">
        <div id="container"></div>
        <div id="ast-container"></div>
    </div>
    <div class="splited-item">
        <div id="tree-view-container"></div>
    </div>
    </Split>, document.getElementById('root'));

// ace.require("ace/ext/language_tools");
var editor = ace.edit("editor");

// ace.config.set('basePath', '/ace-builds/src-noconflict');
ace.config.set('modePath', './src/js');
// ace.config.set('themePath', '/ace-builds/src-noconflict');

editor.session.setMode("ebnf");
editor.setTheme("ace/theme/chrome");
editor.setValue(localStorage.getItem('ebnf.editor.text'));
editor.setOptions({
    fontSize: "12pt",
    enableLiveAutocompletion: true
});

document.getElementById("ebnf-save-btn").addEventListener("click", function(){
    var editor = ace.edit("editor");
    localStorage.setItem('ebnf.editor.text', editor.getValue());
});
