const HuffMan = function (str) {
    this.str = str; //ascii字符串
    this.map = {};
    this.code = null;
    this.nodeLists = [];

}

const NodeTree = function (obj, left, right) {
    this.obj = obj;
    this.left = left;
    this.right = right;
}

HuffMan.prototype.getKeyCountMap = function (str) {
    let map = {};
    for (let v of str) {
        if (v in map) {
            map[v]++;
        } else {
            map[v] = 1;
        }
    }
    this.map = map;
    this.sortMap(map);
    // return map;
}

HuffMan.prototype.sortMap = function (map) {
    let keys = Object.keys(map);
    let arr = [];
    for (let k of keys) {
        let obj = {
            key: k,
            val: map[k]
        }
        arr.push(new NodeTree(obj, null, null));
    }
    //小到大排序
    this.nodeLists = arr.sort((v1, v2) => {
        return v1.obj.val - v2.obj.val;
    })
    // console.log(this.nodeLists);
}
HuffMan.prototype.toTree = function () {
    let i = 0;
    let len = this.nodeLists.length;
    let lists = this.nodeLists;
    let parentNode, node1, node2;
    while (lists.length > 1) {
        parentNode = new NodeTree({
            key: null,
            val: lists[i]['obj'].val + lists[i + 1]['obj'].val
        }, lists[i], lists[i + 1])
        lists.splice(i, 2);
        lists.push(parentNode);
        lists.sort((v1, v2) => {
            return v1.obj.val - v2.obj.val;
        })
    }
    let root = lists[0] || new NodeTree();
    // console.log('root', root);
    return root;

}
HuffMan.prototype.changeD = function (tree, code) {
    if (tree.left !== null) {
        this.changeD.call(this, tree.left, code + '0')
    } else {
        this.map[tree.obj.key] = code;
    }
    if(tree.right !== null){
        this.changeD.call(this,tree.right,code + '1');
    }else{
        this.map[tree.obj.key] = code;
    }
}
HuffMan.prototype.codeStr = function () {
    this.getKeyCountMap(this.str);
    let tree = this.toTree();
    this.changeD(tree, '');
    // console.log(this.map);
    let result = '';
    for(let s of this.str){
        result += this.map[s]
    }
    console.log(result);
    return result;

}

new HuffMan('abbcccdddd').codeStr();