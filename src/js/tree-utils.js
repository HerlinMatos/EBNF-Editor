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
        if(nodeValues.length == 1 && isArray(nodeValues[0])){
            return {name: nodeKeys[0], children: nodeValues.map((n) => formatTree(n,true))[0]}
        }
        if(nodeValues.length == 1 && isObject(nodeValues[0])){
            return {name: nodeKeys[0], children: formatTree(nodeValues,true) }
        }
        const name = node.identifier || '';
        const filterNodeAttr = (attr) => {
            if(attr[0] == 'identifier') return false;
            if(attr[0] == 'location') return false;
            return true;
        }
        const children = Object.entries(node).filter(filterNodeAttr).map(([key, value]) => formatTree(value,true));
        return {name, children};
    }else if(isArray(node) && noRoot){
        return node.map((n) => formatTree(n,true));
    }else if(isArray(node) && !noRoot){
        const name = "Expressions";
        const children = node.map((n) => formatTree(n,true));
        return {name, children};
    }else{
        return {name: node.toString()};
    }
}

module.exports = { 
    formatTree
};