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
  //접근제한자 생략하면 public일 줄 알았는데 아니라 속성으로 인식도 못한다.
  //생성자에서 접근 제한자를 안쓰면 속성을 직접 선언해야한다.
  constructor(private price:number){}
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