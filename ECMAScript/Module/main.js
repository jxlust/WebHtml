import get,{name,add} from './moduleTest.js';
import {name as asyncName} from './moduleAsync.js';
// import get, * as obj from './circle';
console.log('name:',name);
console.log('sum:',add(1,2));
console.log('get:',get());
console.log('asyncName:',asyncName);
setTimeout(() => {
    console.log('asyn name',asyncName);//bar
}, 2000);


