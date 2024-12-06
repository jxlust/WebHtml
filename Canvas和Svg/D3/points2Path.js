function appendRound(digits) {
    let d = Math.floor(digits);
    if (!(d >= 0)) throw new Error(`invalid digits: ${digits}`);
    if (d > 15) return append;
    const k = 10 ** d;
    return function (strings) {
        let str = '';
        console.log('sss:', strings)
        str += strings[0];
        for (let i = 1, n = strings.length; i < n; ++i) {
            str += Math.round(arguments[i] * k) / k + strings[i];
        }
        return str;
    };
}

function limitDigits(strings) {
    let d = Math.floor(digits);
    const k = 10 ** d;
    let str = ''
    str += strings[0];
    for (let i = 1, n = strings.length; i < n; ++i) {
        str += Math.round(arguments[i] * k) / k + strings[i];
    }
    return str;
}

/**
 * 生成贝塞尔曲线路径
 * @param {*} that 
 * @param {*} x 
 * @param {*} y 
 * @returns 
 */
function getBezierCurvePath(that, x, y) {
    var x1 = that._x1,
        y1 = that._y1,
        x2 = that._x2,
        y2 = that._y2;

    if (that._l01_a > 1e-12) {
        var a = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a,
            n = 3 * that._l01_a * (that._l01_a + that._l12_a);
        x1 = (x1 * a - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n;
        y1 = (y1 * a - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n;
    }

    if (that._l23_a > 1e-12) {
        var b = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a,
            m = 3 * that._l23_a * (that._l23_a + that._l12_a);
        x2 = (x2 * b + that._x1 * that._l23_2a - x * that._l12_2a) / m;
        y2 = (y2 * b + that._y1 * that._l23_2a - y * that._l12_2a) / m;
    }
    return that._append`C${+x1},${+y1} ${+x2},${+y2} ${+that._x2},${+that._y2}`
}
/**
 * Catmull-Rom样条曲线
 * 通过传入点集合绘制曲线
 * Catmull-Rom用于生成平滑曲线的插值方法，特别适合用于创建连续且光滑的路径。
 * Catmull-Rom样条通过一组点来定义，并且在每个点之间生成一个平滑的过渡。
 * @description 参考d3源码实现
 * @example
 *  const pointsList = [[0, 0], [10, 20], [20, 30], [30, 79]]
 *  const ccr = new CurveCatmullRom(pointsList)
 *  const curvePath = ccr.generatePath()
 */
export class CurveCatmullRom {
    constructor(points, alpha = 0.5) {
        this.points = points;
        this.alpha = alpha;
        this._append = appendRound(3)
    }
    buildPointPath(x, y) {
        x = +x, y = +y;
        if (this._point) {
            var x23 = this._x2 - x,
                y23 = this._y2 - y;
            this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this.alpha));
        }
        switch (this._point) {
            case 0:
                this._point = 1;
                this._path += this._append`M${+x},${+y}`;
                break;
            case 1: this._point = 2; break;
            case 2: this._point = 3; // falls through
            default:
                const curvePath = getBezierCurvePath(this, x, y);
                this._path += curvePath
                break;
        }

        this._l01_a = this._l12_a, this._l12_a = this._l23_a;
        this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
        this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
        this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
    }

    generatePath() {
        let len = this.points.length;
        // start
        this.initLineData();
        for (let i = 0; i < len; ++i) {
            const [x, y] = this.points[i]
            this.buildPointPath(x, y)
        }
        // end
        this.handleLineEnd();
        return this._path
    }
    lineToPath(x, y) {
        this._path += this._append`L${+x},${+y}`;
    }
    handleLineEnd() {
        let len = this.points.length;
        if (len > 2) {
            this.buildPointPath(this._x2, this._y2);
        } else if (len === 2) {
            // 2个点，不画曲线，直接连线
            this.lineToPath(this._x2, this._y2)
        }
    }
    initLineData() {
        this._x0 = this._x1 = this._x2 =
            this._y0 = this._y1 = this._y2 = NaN;
        this._l01_a = this._l12_a = this._l23_a =
            this._l01_2a = this._l12_2a = this._l23_2a =
            this._point = 0;
        this._path = ''
    }
}

const pointsList = [[0, 0], [10, 20], [20, 30], [30, 79]]
const ccr = new CurveCatmullRom(pointsList)
const curvePath = ccr.generatePath()
console.log('curvePath:', curvePath)