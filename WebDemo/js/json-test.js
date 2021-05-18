var obj = {
	name: 'xxx',
	sex: {
		test: 1,
		good: 'aa'
	},
	num: 1
};

function test1() {
	for (var k in obj) {
		console.log(k + "xx");
	}
}

function test2() {
	console.log(Array.prototype.map.call(obj22, function (item) {
		console.log(item + 'tt');
		return item
	}) + ",,,ssss");
}
var obj22 = {
	0: 'aaa',
	1: 'bb',
	length: 2
};

function test3() {
	var str = JSON.stringify(obj, function (k, v) {
		console.log('k'+k, v);
		//从外层开始找，从外到内
		// if (typeof v === 'number') {
		// 	return;
		// }
		if ( k === 'name') {
			return;
		}
		return v;
	});

	console.log(str);
}
test3();

function test4() {
	var jsonStr = '{"name":{"sex":11,"count":23432},"count":111}';
	var parseObj = JSON.parse(jsonStr, function (k, v) {
		console.log('key' + k, v);
		//从内层开始找，从内到外
		if (k === 'count') return undefined;
		return v;
	})
	console.log(parseObj);
}
//test4();