const CELL_WIDTH = 40;

//定义球体对象
function Ball({
	x = 20,
	y = 20,
	radius = 12
} = {}) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = 'skyblue';

	this.draw = function (ctx) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
		ctx.closePath();
		ctx.fillStyle = this.color;
		ctx.fill();
	}

}
class DrawMaze {
	constructor(matrix) {
		if (matrix.length < 2 || matrix[0].length < 2) {
			throw new Error('The length is at least 2');
		}
		this.matrix = matrix;
		
		this.col = this.matrix[0].length;
		this.row = this.matrix.length;
		this.canvas = undefined;
		this.ctx = undefined;
		//如果canvas不存在，需要自己初始化一个
		this.initCanvas();
	}
	initCanvas() {
		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d');
		// this.canvas.width = window.innerWidth;
		// this.canvas.height = window.innerHeight;
		this.canvas.width = this.col * CELL_WIDTH;
		this.canvas.height = this.row * CELL_WIDTH;
		document.body.appendChild(this.canvas);
	}

	updateCanvas(matrix){
		this.matrix = matrix;
		this.col = this.matrix[0].length;
		this.row = this.matrix.length;
		let width = this.col * CELL_WIDTH,
		height = this.row * CELL_WIDTH
		this.canvas.width = width;
		this.canvas.height = height;
		this.ctx.clearRect(0,0,width,height)
	}

	async draw() {
		let {
			matrix,
			ctx
		} = this;
		const m = matrix.length,
			n = matrix[0].length;
		matrix.forEach((col, x) => {
			col.forEach((value, y) => {
				ctx.save();
				ctx.beginPath();
				ctx.fillStyle = value === 1 ? '#000' : '#f8f8f8';
				ctx.fillRect(CELL_WIDTH * y, CELL_WIDTH * x, CELL_WIDTH * y + CELL_WIDTH, CELL_WIDTH * x + CELL_WIDTH);
				//绘制格子对应的数字
				// ctx.font = "14px Georgia";
				// ctx.fillStyle = 'red';
				// ctx.fillText(x * n + y, CELL_WIDTH * y, CELL_WIDTH * x + 15);
				ctx.restore();

			})
		})

		return await this.initEvent();

	}


	initEvent() {
		return new Promise( resolve => {
			const {
				matrix,
				ctx,
				col,
				row,
			} = this;
	
			const currentPoint = {
				x: 1,
				y: 1,
			}
			// const translatePoint = [0,0]
			const endPoint = {
				x: row - 2,
				y: col - 2
			}
	
			//绘制起始点
			let ball = new Ball({
				x: 1.5 * CELL_WIDTH,
				y: 1.5 * CELL_WIDTH
			});
	
			ctx.save(); //保存坐原点平移之前的状态
			ball.draw(ctx);
			const keyupEvent = function (event) {				
				let keycode = event.keyCode || event.which || event.charCode;
				// console.log(111, event.key, event.keyCode);
				let {
					x,
					y
				} = currentPoint;
				if (keycode === 87) {
					//上
					x -= 1;
				} else if (keycode === 83) {
					//下
					x += 1;
				} else if (keycode === 65) {
					//左
					y -= 1;
				} else if (keycode === 68) {
					//右
					y += 1;
				}else{
					return false;
				}
	
				if (x >= 0 && x < row && y >= 0 && y < col && matrix[x][y] === 0) {
					console.log('ok');
					// translatePoint[0] = ty + CELL_WIDTH * ty;
					// translatePoint[1] = tx + CELL_WIDTH * tx;
					//清空前一个区域的
					let oldx = currentPoint.x * CELL_WIDTH;
					let oldy = currentPoint.y * CELL_WIDTH;
					console.log('old:',oldx,oldy);
					
					ball.x = (y + 0.5) * CELL_WIDTH;
					ball.y = (x + 0.5) * CELL_WIDTH;
					//清楚起点，以及矩形的宽高
					ctx.clearRect(oldy,oldx, CELL_WIDTH,CELL_WIDTH);				
					// ctx.translate(translatePoint[0], translatePoint[1]);
					ball.draw(ctx);
	
					//更新当前位置
					currentPoint.x = x;
					currentPoint.y = y;
	
					if(x === endPoint.x && y === endPoint.y){
						console.log('通过了！下一关');

						document.removeEventListener('keyup',keyupEvent)
						resolve('ok')			
					}
				} else {
					//墙或者越界了走不动
					console.log('墙，动不了');
				}
	
	
			}
			document.addEventListener('keyup', keyupEvent)

		})
	
	}


}

export {
	DrawMaze
}