import { bfsFindPath,randInt,DIRECT_OPT} from './MazeUtil.js'
class MazeDfs {
    constructor(row, col) {
        if (row < 1 || col < 1) {
            throw new Error('The length is at least 1');
        }
        this.row = row;
        this.col = col;

        //每个点可以看成一棵树，整个是森林
        //实际的点设置为奇数，因为边是墙的原因
        this.mRow = 2 * row + 1;
        this.mCol = 2 * col + 1;
        this.matrix = [];

        this.path = [];
        this.createMatrix();

        this.dfsGenerate();

    }
    createMatrix() {
        let {
            matrix
        } = this;
        //每个点可以看成一棵树，整个是森林
        //实际的点设置为奇数，因为边是墙的原因
        let r = this.mRow;
        let c = this.mCol;

        for (let i = 0; i < r; i++) {
            matrix[i] = new Array(c);
            for (let j = 0; j < c; j++) {
                if (i % 2 === 1 && j % 2 === 1) {
                    matrix[i][j] = 0;
                } else {
                    matrix[i][j] = 1;
                }
            }
        }
    }

    // 随机深度优先算法
// 1. 选择初始单元格，将其标记为已访问并将其推入堆栈
// 2. 当堆栈不为空时
//     1. 从堆栈中弹出一个单元格并使其成为当前单元格
//     2. 如果当前单元格中有尚未访问过的任何邻居
//         1. 将当前单元格推入堆栈
//         2. 选择一个未访问的邻居
//         3. 删除当前单元格和所选单元格之间的墙
//         4. 将所选单元格标记为已访问并将其推入堆栈

    dfsGenerate(){
        let {matrix,row,col,mRow,mCol} = this;
        let count = row * col;

        // new Array(count).fill(0)
        let visited = new Array(count).fill(0);
        let stack = [];

        let randomPoint =  (Math.random() * count) | 0;
        stack.push(randomPoint);
        visited[randomPoint] = 1;//访问过了

        let point = undefined; //当前单元格
        while(stack.length){
            //把点解析成坐标
            point = stack.pop()
			let px = (point / col) | 0;
			let py = point % col;
            //1.遍历出未访问过的邻接节点
            //2.若有，从中随机选择一个点，若不存在，继续循环
            let nextObj = this.getAroundPoint(px,py,visited);
            if(nextObj){
                stack.push(point);

                //拆墙
                let originX = 2 * px + 1 + nextObj.x;
                let originY = 2 * py + 1 + nextObj.y;
                matrix[originX][originY] = 0;//打通墙
                visited[nextObj.nextP] = 1;//已访问

                stack.push(nextObj.nextP);
            }

        }

        //栈清空，生成完毕
        
    }

    getAroundPoint(px,py,visited){
        let {row,col} = this;
        let around = [];
        for(let {x,y} of DIRECT_OPT){
            let nextX = px + x,
                nextY = py + y;
            if(nextX >= 0 && nextX < row && nextY >= 0 && nextY < col){
                let nextP = nextX * col + nextY;
                if(!visited[nextP]){
                    around.push({
                        x,
                        y,
                        nextP
                    })
                }
            }
        }
        if(around.length){
            let rIndex = (around.length * Math.random()) | 0;
            return around[rIndex]
        }
        return null;
    }
    getMatrix() {
		return this.matrix;
	}

    findPath(){
        const {matrix} = this;
        return bfsFindPath(matrix)
    }
}

export {
	MazeDfs as Maze
}