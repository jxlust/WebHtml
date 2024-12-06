// function catmullRomSplines(points) {
//     const controlPoints = [];
//     for (let i = 0; i < points.length - 1; ++i) {
//         controlPoints[i] = [
//             points[i],
//             0.5 * (2 * points[i + 1] + points[i]),
//             0.5 * (2 * points[i] + points[i + 1]),
//             points[i + 1],
//         ];
//     }
//     return controlPoints;
// }

function catmullRomSpline(t, p0, p1, p2, p3) {
    const t2 = t * t;
    const t3 = t2 * t;
    return (
        0.5 *
        ((2 * p1 + (p2 - p0) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 +
            (3 * p1 - p0 - 3 * p2 + p3) * t3))
    );
}

for (let i = 0; i < 1; i += 0.1) {
    const x = catmullRomSpline(i, 0, 0, 10, 20);
    const y = catmullRomSpline(i, 0, 0, 20, 30);
    console.log(`${x}, ${y}`);
}
console.log('-----------------------------------------------------')
for (let i = 0; i < 1; i += 0.1) {
    const x = catmullRomSpline(i, 0, 10, 20, 30);
    const y = catmullRomSpline(i, 0, 20, 30, 90);
    console.log(`${x}, ${y}`);
}
console.log('-----------------------------------------------------')
for (let i = 0; i < 1; i += 0.1) {
    const x = catmullRomSpline(i, 10, 20, 30, 40);
    const y = catmullRomSpline(i, 20, 30, 90, 190);
    console.log(`${x}, ${y}`);
}