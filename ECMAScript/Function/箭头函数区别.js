
// 箭头函数有几个使用注意点。

// （1）箭头函数没有自己的this对象（详见下文）。

// （2）不可以当作构造函数，也就是说，不可以对箭头函数使用new命令，否则会抛出一个错误。

// （3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

// （4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。

// 上面四点中，最重要的是第一点。对于普通函数来说，内部的this指向函数运行时所在的对象，但是这一点对箭头函数不成立。它没有自己的this对象，内部的this就是定义时上层作用域中的this。也就是说，箭头函数内部的this指向是固定的，相比之下，普通函数的this指向是可变的。

function foo(b) {
	console.log('bb:',arguments);
	this.b = 22;
  // setTimeout((a) => {
  //   // console.log('id:', this.id);
	// 	console.log('ar:');
  // }, 100);
	this.bc = (ar) => {
		console.log(1111,arguments,this.b);
		return 1;
	}
	this.df = function (v) {
		console.log(222,arguments,this.b)
		return 2;
	}
	// console.log('this：',this);
}

var id = 21;
// foo.call({ id: 42 }); //42
new foo(1).bc(999);
new foo(1).df(999);
