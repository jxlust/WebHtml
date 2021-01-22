// t是百分比，a是参数
// 1阶贝塞尔曲线公式
function onebsr(t, a1, a2) {
    return a1 + (a2 - a1) * t;
}

// 2阶贝塞尔曲线公式
function twobsr(t, a1, a2, a3) {
    return ((1 - t) * (1 - t)) * a1 + 2 * t * (1 - t) * a2 + t * t * a3;
}

// 3阶贝塞尔曲线公式
function threebsr(t, a1, a2, a3, a4) {
    return a1 * (1 - t) * (1 - t) * (1 - t) + 3 * a2 * t * (1 - t) * (1 - t) + 3 * a3 * t * t * (1 - t) + a4 * t * t * t;
}



/**
 * @desc 一阶贝塞尔
 * @param {number} t 当前百分比
 * @param {Array} p1 起点坐标
 * @param {Array} p2 终点坐标
 */
function oneBezier(t, p1, p2) {
    const [x1, y1] = p1;
    const [x2, y2] = p2;
    let x = x1 + (x2 - x1) * t;
    let y = y1 + (y2 - y1) * t;
    return [x, y];
}

/**
 * @desc 二阶贝塞尔
 * @param {number} t 当前百分比
 * @param {Array} p1 起点坐标
 * @param {Array} p2 终点坐标
 * @param {Array} cp 控制点
 */
function twoBezier(t, p1, cp, p2) {
    const [x1, y1] = p1;
    const [cx, cy] = cp;
    const [x2, y2] = p2;
    let x = (1 - t) * (1 - t) * x1 + 2 * t * (1 - t) * cx + t * t * x2;
    let y = (1 - t) * (1 - t) * y1 + 2 * t * (1 - t) * cy + t * t * y2;
    return [x, y];
}

/**
 * @desc 三阶贝塞尔
 * @param {number} t 当前百分比
 * @param {Array} p1 起点坐标
 * @param {Array} p2 终点坐标
 * @param {Array} cp1 控制点1
 * @param {Array} cp2 控制点2
 */
function threeBezier(t, p1, cp1, cp2, p2) {
    const [x1, y1] = p1;
    const [x2, y2] = p2;
    const [cx1, cy1] = cp1;
    const [cx2, cy2] = cp2;
    let x =
        x1 * (1 - t) * (1 - t) * (1 - t) +
        3 * cx1 * t * (1 - t) * (1 - t) +
        3 * cx2 * t * t * (1 - t) +
        x2 * t * t * t;
    let y =
        y1 * (1 - t) * (1 - t) * (1 - t) +
        3 * cy1 * t * (1 - t) * (1 - t) +
        3 * cy2 * t * t * (1 - t) +
        y2 * t * t * t;
    return [x, y];
}

/**
 * @desc 获取点，这里可以设置点的个数
 * @param {number} num 点个数
 * @param {Array} p1 点坐标
 * @param {Array} p2 点坐标
 * @param {Array} p3 点坐标
 * @param {Array} p4 点坐标
 * 如果参数是 num, p1, p2 为一阶贝塞尔
 * 如果参数是 num, p1, c1, p2 为二阶贝塞尔
 * 如果参数是 num, p1, c1, c2, p2 为三阶贝塞尔
 */
function getBezierPoints(num = 100, p1, p2, p3, p4) {
    let func = null;
    const points = [];
    if (!p3 && !p4) {
        func = this.oneBezier;
    } else if (p3 && !p4) {
        func = this.twoBezier;
    } else if (p3 && p4) {
        func = this.threeBezier;
    }
    for (let i = 0; i < num; i++) {
        points.push(func(i / num, p1, p2, p3, p4));
    }
    if (p4) {
        points.push([...p4]);
    } else if (p3) {
        points.push([...p3]);
    }
    return points;
}


