const isObject = (n) => typeof n === 'object' && n.constructor === Object;
const isArray = (n) => typeof n === 'object' && n.constructor === Array;

//TODO: This function is incomplete and needs some optimizations 
function formatTree(node, noRoot){
    if(isObject(node)){
        if(node.terminal)
            return {name: node.terminal}
        if(node.nonTerminal)
            return {name: node.nonTerminal}
        const nodeKeys = Object.keys(node);
        const nodeValues = Object.values(node);
        if(nodeKeys.includes('sequence')){
            return {name: 'sequence', children: nodeValues.map((n) => formatTree(n,true))[0]}
        }
        if(nodeKeys.includes('repetition')){
            return {name: 'repetition', attributes: ['skippable: '+node.skippable],children: [formatTree(node.repetition, true)]}
        }
        if(nodeKeys.includes('choice')){
            return {name: 'choice', children: nodeValues.map((n) => formatTree(n,true))[0]}
        }
        if(nodeKeys.includes('optional')){
            return {name: 'optional', children: [formatTree(node.optional, true)]}
        }
        if(nodeKeys.includes('definition')){
            return {name: node.identifier, children: [formatTree(node.definition, true)]}
        }
    }else if(isArray(node) && noRoot){
        return node.map((n) => formatTree(n,true));
    }else if(isArray(node) && !noRoot){
        const name = "Expressions";
        const children = node.map((n) => formatTree(n,true));
        return {name, children};
    }
}

module.exports = { 
    formatTree
};