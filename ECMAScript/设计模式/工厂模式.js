function createPerson(name){
    var person= {
        name: name,
        sayName:function(){
            console.log(this.name);
        }
    };
    return person;
}
//对象调用模式
createPerson("YQY").sayName() // YQY
createPerson("xiaoming").sayName()  //xiaoming
//函数调用模式

// var name = 'xx';
// global.name = 'xx';
var t = createPerson("YQY").sayName.call({name:'xxx'})//xxx
// t()   //undefined    
//原因为createPerson中的sayName方法中的this此时指向window