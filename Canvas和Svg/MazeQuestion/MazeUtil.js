 
 function bfsFindPath (matrix) {
    //入口(1,1)
    //出口(matrix[row-2][col-2])
    let row = matrix.length,
        col = matrix[0].length;
    let endX = row - 2;
    let endY = col - 2;

    let queue = [];
    let visited = []; //Set();
    // let set = new Set();
    queue.push({
        x: 1,
        y: 1,
        pos: 1 * col + 1
    })
    visited[1 * col + 1] = 1;

    let lastNode = null;

    while (queue.length) {
        let cur = queue.shift();
        if (cur.x === endX && cur.y === endY) {
            lastNode = cur;
            break;
        }
        //获取邻接节点，符合条件的
        // 1. 边界内；2. 是通路； 3. 不曾访问过
        for (let {
                x,
                y
            } of DIRECT_OPT) {
            let newX = cur.x + x;
            let newY = cur.y + y;
            let newP = newX * col + newY;

            if (newX >= 0 && newX < row && newY >= 0 && newY < col && matrix[newX][newY] === 0 && !visited[newP]) {
                visited[newP] = 1;
                let node = {
                    x: newX,
                    y: newY,
                    pre: cur,
                    pos: newP
                }
                queue.push(node)
            }
        }

    }
    //记录了bfs的前驱节点，通过pre查找最短路径
    let path = [];
    while (lastNode) {
        path.unshift({
            x: lastNode.x,
            y: lastNode.y,
            pos: lastNode.pos
        })
        lastNode = lastNode.pre;
    }
    return path;
}

//取区域随机数x>=min && x<max
function randInt(min, max) {
    max = max || 0;
    min = min || 0;
    var step = Math.abs(max - min);
    var st = (arguments.length < 2) ? 0 : min; //参数只有一个的时候，st = 0;
    var result;
    // result = st + (Math.ceil(Math.random() * step)) - 1;
    result = st + ((Math.random() * step) | 0);
    return result;
}
const DIRECT_OPT = [{
    x: 1,
    y: 0
}, {
    x: -1,
    y: 0
}, {
    x: 0,
    y: -1,
}, {
    x: 0,
    y: 1,
}]
export {
    bfsFindPath,
    randInt,
    DIRECT_OPT
}