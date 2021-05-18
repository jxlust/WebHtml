function A(){
	this.a = 'a';
	this.b = 'b';
	this.add = function(){
		return this.a + this.b;
	}
}
A.prototype.show = function(){
	console.log('hhhh');
}

function B(){
	
}
B.prototype = new A();
var b = new B();
b.b = 'sssss';
console.log('1',b.a);
console.log('2',b.add());
b.show();
//console.log('3',);

function Student (name,age){
	this.name = name;
	this.age = age;
	this.say = function(){
		alert('hello'+this.name+this.age);
	}
}
Student.prototype.code = '1000';
Student.prototype.play = function(){
		alert('palying');
}
function Teacher (){
	Student.apply(this,arguments);
	//Student.call(this,arguments[0],arguments[1]);
	this.teach = function(){
		alert('teaching');
	};
}

Teacher.prototype = new Student();
var t = new Teacher('wz',33);
t.say();
alert('code'+t.code);
t.play();
t.teach();


