class UnitBezier {
    constructor(p1x, p1y, p2x, p2y) {
        this.cx = 3.0 * p1x;
        this.bx = 3.0 * (p2x - p1x) - this.cx;
        this.ax = 1.0 - this.cx - this.bx;
        this.cy = 3.0 * p1y;
        this.by = 3.0 * (p2y - p1y) - this.cy;
        this.ay = 1.0 - this.cy - this.by;
    }
    // get sampleCurveX() {
    //     return ((this.ax * t + this.bx) * t + this.cx) * t;
    // }
    getCurveX(t) {
        return ((this.ax * t + this.bx) * t + this.cx) * t;
    }

    getCurveY(t) {
        return ((this.ax * t + this.bx) * t + this.cx) * t;
    }
}


function test() {
    let ub = new UnitBezier(0, 0, 1, 1)
    let x = ub.getCurveX(0.1)
    console.log(x);
}

function FactorialForDp(n) {
    // 0 , 1, 1, 2,3,5,8,13,21
    n = n + 1;
    let dp = new Array(n + 1);
    // let dp = [0,1,1];
    dp[0] = 0, dp[1] = 1;
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2]
    }
    return dp[n]
}

function Factorial(n) {
    if (n <= 0) return 0;
    let pre = 0,
        cur = 1;
    for (let i = 2; i <= n; i++) {
        let temp = cur;
        cur = pre + cur;
        pre = temp;
    }
    return cur;
}

const Bernstein = function (n, i) {
    var fc = FactorialForDp;
    return fc(n) / fc(i) / fc(n - i);
}
// console.log(Bernstein(10,0));
const Bezier = function (v, k) {
    var b = 0;
    var n = v.length - 1;
    var pw = Math.pow;
    var bn = Bernstein;
    for (var i = 0; i <= n; i++) {
        b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
    }
    return b;
}




function division() {
    let start = 0,end = 20,target = 3.1233242341213123,ep = 1e-5;
    while(start < end){
        let mid = start + (end - start) * 0.5;
        let diff = Math.abs(mid-target);
        if(diff <= ep){
            console.log(1,diff);
            return mid;
        }else if(mid  > target){
            end = mid;
        }else {
            start = mid;
        }
    }
    return start;
}

console.log(division());


