const { parseEbnf, createDocumentation } = require("ebnf2railroad");
const { formatTree } = require("./tree-utils.js");
import React from 'react';
import ReactDOM from 'react-dom';
import Tree from 'react-d3-tree';
import Split from 'react-split'
import * as monaco from 'monaco-editor';

document.getElementById("ebnf-evaluate-btn").addEventListener("click", evaluateEbnfInput);

function evaluateEbnfInput(){
    const ebnf = monacoInstance.getValue();
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

self.MonacoEnvironment = {
    getWorkerUrl: function(moduleId, label) {
      if (label === 'json') {
        return './json.worker.js';
      }
      if (label === 'css') {
        return './css.worker.js';
      }
      if (label === 'html') {
        return './html.worker.js';
      }
      if (label === 'typescript' || label === 'javascript') {
        return './ts.worker.js';
      }
      return './editor.worker.js';
    },
  };
  
 window.monacoInstance =  monaco.editor.create(document.getElementById('editor'), {
    value: [
      'x = "1";',
    ].join('\n'),
    language: 'javascript'
  });

document.getElementById("ebnf-save-btn").addEventListener("click", function(){
    localStorage.setItem('ebnf.editor.text', monacoInstance.getValue());
});
