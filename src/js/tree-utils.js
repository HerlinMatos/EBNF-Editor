
function formatTree(node){
    const isObject = (n) => typeof n === 'object' && n.constructor === Object;
    const isArray = (n) => typeof n === 'object' && n.constructor === Array;

    if(isObject(node)){
        if(node.terminal)
            return {name: node.terminal}
        const name = node.identifier || '';
        const attributes = Object.keys(node);
        // const nodeArray = Object.keys(node).map(k => ({[k] : node[k]}));
        const nodeArray = Object.values(node);
        const children = nodeArray.map(formatTree);
        return {name, attributes, children};
    }else if(isArray(node)){
        const name = "Array";
        const children = node.map(formatTree);
        return {name, children};
    }else{
        return {name: node.toString()};
    }
}

module.exports = { 
    formatTree
};