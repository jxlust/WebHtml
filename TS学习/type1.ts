type myType1 = {
    name: string;
  };
  type myType2 = {
    color: string;
  };
  
  type myType3 = myType1 | myType2;
  
  const vv: myType3 = {
    color: "x",
    name: "z",
  };
  type myType4 = [string, number];
  const xx: myType4 = ["str", 100];
  // console.log(xx);
  // xx[1] = 111;
  
  interface if1 {
    say(text: string): string;
    name: string;
  }
  interface if2 {
    sing<T>(text: T): T;
    name: string;
  }
  interface if3 {
    (text: string): string;
  }
  
  const myIfObj: if3 = (msg: string): string => {
    return "x" + msg;
  };
  const myIfObj2: if1 & if2 = {
    name: "x",
    say: function (s): string {
      return "s";
    },
    sing: function<T> (text:T):T {
        return text
    }
  };
  console.log(myIfObj2.sing<string>('hhhhhh')) 
  const myIfObj3: (if1 | if2) = {
      name: 'xx',
      sing: function<T> (text:T):T {
          return text
      }
  }
  myIfObj3.sing<string>('zzzz')