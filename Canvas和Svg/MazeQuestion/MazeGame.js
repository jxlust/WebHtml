import {
	Maze
} from './MazeDfs.js';
import {
	DrawMaze
} from './CanvasDraw.js'

const LEVEL_LISTS = [4, 7, 10]; //三关

class MazeGame {
	constructor(element,callback) {
		this.maze = undefined;
		this.element = element;
		this.canvasDraw = undefined;
		this.level = 0;
		this.callback = callback;
	}

	start() {
		let number = LEVEL_LISTS[this.level]

		this.maze = new Maze(number, number);
		let matrix = this.maze.getMatrix();

		this.canvasDraw = new DrawMaze(matrix,this.element);

		this.canvasDraw.draw().then(data => {
			console.log('通过：', data);
			this.level++;
			this.updateView();
		});

	}

	updateView() {
		if (this.level > 2) {
			console.log('全通关了 亲亲');
			this.callback();
			return;
		}
		let number = LEVEL_LISTS[this.level]
		this.maze = new Maze(number, number);
		let matrix = this.maze.getMatrix();

		this.canvasDraw.updateCanvas(matrix);

		this.canvasDraw.draw().then(data => {
			console.log('通过：', data);
			this.level++;
			this.updateView();
		});
	}

}

export {
	MazeGame
}