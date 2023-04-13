export {Person,Test};
interface Person{
  name:string;
  age:number;
  address?:string;
}

interface Test{
  name1:string;
  name2:string;
  name3:string;
}
class Person1 implements Person{
  name:string;
  age:number;
  address: string;
}
class Car{
  getPrice(): number{
    return this.price;
  }
  setPrice(price:number){
    this.price=price;
  }
  constructor(private price:number){}
}

export abstract class Test2{
	abstract test:number;
  abstract add();
  static test1(){
    return console.log('test');
  }
}

class temp123 extends Test2{
  test: number;
   add(){

   };
}

let testCar = new Car(3000);
console.log(testCar.getPrice())
let temp: Person = {name : "jack", age : 30, address : "서울"};//정상
let {age,address} =temp;
function printMe(me:{name: string; age: number; etc?: boolean}){
  console.log(me.etc ? `${me.name} ${me.age} ${me.etc}` : `${me.name} ${me.age}`);
}
// let person2: Person = {name : "jap",age : 30,address : "제주도" , call : "010 5661 5820"}//call은 없는 속성 오류
// let person3: Person = {name : "lee",age : 30}//address가 빠져서 오류

interface Foo {
  bar: number;
  bas: string;
}



type stringNumberFunc =  (string,number) => void

let printMe1: stringNumberFunc = function( name:string, age: number): void {
	console.log(name,age);	
}
let test: stringNumberFunc = function(target: string,count: number): void{
	console.log(`${target} is ${count}`);
}
