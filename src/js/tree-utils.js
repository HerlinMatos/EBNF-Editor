const isObject = (n) => typeof n === 'object' && n.constructor === Object;
const isArray = (n) => typeof n === 'object' && n.constructor === Array;

//TODO: This function is incomplete and needs some optimizations 
function formatTree(node, ast, noRoot){
    if(isObject(node)){
        const nodeKeys = Object.keys(node);
        const nodeValues = Object.values(node);
        if(node.terminal)
            return {name: node.terminal}
        if(node.nonTerminal)
            return formatTree(ast.find(n => n.identifier == node.nonTerminal), ast, true)
        if(nodeKeys.includes('sequence')){
            return {name: 'sequence', children: nodeValues.map((n) => formatTree(n,ast,true))[0]}
        }
        if(nodeKeys.includes('repetition')){
            return {name: 'repetition', attributes: ['skippable: '+node.skippable],children: [formatTree(node.repetition,ast,true)]}
        }
        if(nodeKeys.includes('choice')){
            return {name: 'choice', children: nodeValues.map((n) => formatTree(n,ast,true))[0]}
        }
        if(nodeKeys.includes('optional')){
            return {name: 'optional', children: [formatTree(node.optional,ast, true)]}
        }
        if(nodeKeys.includes('definition')){
            return {name: node.identifier, children: [formatTree(node.definition,ast, true)]}
        }
    }else if(isArray(node) && noRoot){
        return node.filter(n => !n.comment).map((n) => formatTree(n,ast,true));
    }else if(isArray(node) && !noRoot){
        const name = "Expressions";
        const ast = node;
        const children = node.filter(n => !n.comment).map((n) => formatTree(n,ast,true));
        return {name, children};
    }
}

module.exports = { 
    formatTree
};