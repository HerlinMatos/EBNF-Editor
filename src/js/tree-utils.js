const isObject = (n) => typeof n === 'object' && n.constructor === Object;
const isArray = (n) => typeof n === 'object' && n.constructor === Array;

//TODO: This function is incomplete and needs some optimizations 
function formatTree(node, noRoot){
    if(isObject(node)){
        if(node.terminal)
            return {name: node.terminal}
        if(node.nonTerminal)
            return {name: node.nonTerminal}
        if(Object.values(node).length == 1 && isArray(Object.values(node)[0])){
            return {name: Object.keys(node)[0], children: Object.values(node).map((n) => formatTree(n,true))[0]}
        }
        const name = node.identifier || '';
        const filterNodeAttr = (attr) => {
            if(attr[0] == 'identifier') return false;
            if(attr[0] == 'location') return false;
            return true;
        }
        const children = Object.entries(node).filter(filterNodeAttr).map((a) => formatTree(a[1],true));
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