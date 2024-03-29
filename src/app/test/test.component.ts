import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject, interval, merge, of } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { Person,Test } from '../model/person';
import { Event } from '@angular/router';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  @Input() hero:string;
  @Output() newNumber = new EventEmitter<number>();
  love='love'
  //화살표 함수는 this가 맛이간다.
  test = () =>{
    console.log(this.love);
  }

  observeTest2(){
    const locations = new Observable((observer) => {
      let watchId: number;
    
      observer.next("first")
      observer.complete();
      // 구독자가 구독을 해지하면 사용하던 데이터를 모두 지웁니다.
      return {
        unsubscribe() {
          console.log("please")
          // navigator.geolocation.clearWatch(watchId);
        }
      };
    });
    
    // 옵저버블을 시작하려면 subscribe() 함수를 실행합니다.
    const locationsSubscription = locations.subscribe({
      next(position) {
        console.log('Current Position: ', position);
      },
      error(msg) {
        console.log('Error Getting Location: ', msg);
      }
    });
    
    // 옵저버블은 10초 후에 구독을 해지합니다.
    setTimeout(() => {
      locationsSubscription.unsubscribe();
    }, 10000);
  }
  observeTest(){
    const subscriber = (observer) =>{
      try{
        observer.next(2);
        observer.next(13);
        observer.next(14);
        observer.next(15);
        //컴플릿하면 자동으로 해지가 된다고?... 이거 컴플릿의 문제였구나 ㅋㅋ 
        //observer.complete();
        observer.next(100);
      }
      catch(e){
        observer.error(e);

      }
      //콜백으로 구독해지가 제대로 만들어진다.
      return () => console.log("unsubscribe");
    }
    const subscriber2=new Subject<string>();
    // subscriber2.pipe(tap( _ => console.log("test")));
    // switchMap( (n:string) => n)(subscriber2);
    subscriber2.pipe(switchMap( (n:string) => n));
    subscriber2.subscribe((data) => console.log("before "+data));
    subscriber2.next("temp");
    subscriber2.next("temp1");
    subscriber2.next("temp2");
    //구독자 등록이 먼저네 이렇게 하면 위의 것이 처리가 안된다?
    subscriber2.subscribe((data) => console.log("first "+data));
    subscriber2.subscribe((data) => console.log("second "+data));
    
    const observable1 = new Observable(subscriber);

    let temp=subscriber2.subscribe(
      // (num:number) => {console.log(num)},
      str => console.log(str),
      (err) => console.log(err),
      ()=>console.log("complete")
    );
    console.log("before unsubsribe");
    //아니면 요즘은 구독끝나면 자동으로 해주나?..
    //이거 할때 구독해지 해야하는거 아닌가?
    temp.unsubscribe();
    //해지가 여러번 되지는 않는다.
    temp.unsubscribe();
    observable1.subscribe((num:number) => {console.log(num)},);
    temp.unsubscribe();
    

  }

  observeTest3(){
    let temp= of(1,2,3,4,5,5);
    temp.pipe(
      filter( (num:number) => num%2 == 0),
      tap( item => console.log(item)),
      take(2),
      tap( item => console.log(item)),
      ).subscribe();
  }
  timeOutTest(num):void{
    //타임아웃 걸려서 이상해진다.
    setTimeout(num => console.log(`${num}`),2000,num);
  }

  errorTest(){
    let temp=of(1,2,3,4,5);
    temp.pipe( 
      tap( num => {
        if( num%2 === 100)
          throw new Error("test");
        else
          console.log(num);
      }),
      catchError( error => {
        console.log(error.message);
        return of([]);
      }),
    ).subscribe().unsubscribe();
    temp.subscribe();
  }
  
  observableTest(){
    // Create an Observable that will publish a value on an interval
    let num=[1,2,3,4,5];
    let temp = of(...num);
    let test= temp.pipe( map( (num:number) => num+2));
    test.subscribe(item => console.log(item));
    let searchIn : FormControl = new FormControl("");
    // temp.subscribe( item => 
    //   {
    //     console.log(item);
    //   },() => console.log("finish"), () => console.log("finish"));
  }

  constructor() { }

  jsGrammerTest(){
    let today=new Date();//() 빼도 되네
    let array=[1,2,3,4];
    
    //타입 추론 - 변수의 초기값을 통해서 타입을 지정합니다.
    let num=5;
    num=3;
    //num='a';
    let test:string,test2: undefined;
    console.log(typeof test);
    console.log(typeof test2)
    //타입 확인
    // console.log(today);
    // console.log(typeof today);
    // console.log(typeof "hello:");
    // console.log(typeof array);
    // console.log(typeof 123);
    //고차원 함수와 콜백 함수 확인
    // function add(num1){
    //   return function (num2){
    //     return num1+num2;
    //   }
    // }
    // let temp=add(5);
    // console.log(temp(3))

    //number type
    //2진수,8진수,16진수 모두 10진수로 해석된다.
    // var binary = 0b01000001; // 2진수
    // var octal = 0o101;       // 8진수
    // var hex = 0x41;          // 16진수
    // console.log(binary); 
    // console.log(octal);
    // console.log(octal === hex); //같은 타입과 값이다.

    //js는 실수도 같다고 나온다
    let num1=3.33,num2=3.33
    console.log( num1=== num2)//true
    let num3=3.0,num4=3;//정수만을 위한 타입은 없다는거 확인
    console.log(num3 === num4);//true
    console.log(-Infinity )
    
    //string 타입
    //유사 배열처럼 사용이 가능하다. map.filter같은건 안된다.
    let str="hello";
    for( let item of str){
      console.log(item); //h,e,1,1,o 
    }
    console.log(str[2]);//1
    // str[2]='a'; //원시 타입이라 readonly만 가능
    console.log(str.substring(1,3));//el start,end-1 까지
    let ary=[1,2,3,4];
    //연산자할때 정리하자.
    // ===,== 연산의 차이
    //===은 값과 타입비교,==은 값만 비교
  }

  /**
   * 인터페이스,객체,비구조화할당, ... 연산자에 대한 테스트
   */
  jsGrammerTest2(){
    // let temp: Person = {name : "jack", age : 30, address : "서울"};//정상
    // let {address,name} =temp;
    // console.log(` ${address} ${name}`);
    // let names:Test = {name1 : 'name1',name2: 'name2',name3: 'name3'};

    // //잔여 연산자로 쓸 경우
    // let {name1,...namess} = names;//name2,name3 이 namess에 객체로 들어간다.
    // console.log(namess);
    //전개 연산자로 쓰는 경우
    let part1=[1,2,3,4,5],part2=[10,20,30];
    let sum=[...part1,...part2];
    let sum2=[...part1,...part2];
    console.log(...part1)//1,2,3,4,5
    console.log(sum);//[1, 2, 3, 4, 5, 10, 20, 30]
    console.log(sum2);
    let coord={...{x: 0},...{y: 0}}
    console.log(coord);//객체에 안되네?.. 1개짜리만 되는건가보다.iterator가 없으니까?

    let part11={name : 'jane'},part12={age : 22},part13= {city : 'seoul',country : 'kr'}
    let merged={...part11,...part12,...part13};
    let test={...merged};//iterator가 없어서 배열로 만들 수는 없는데 객체론 된다?
    console.log(test);
    const testt =function(...args){
      console.log(args);
    }
    testt.apply(null,[12,3,4,5]);
    testt.call(null,1,2,3,4,5,6);
    console.log([...'apple']);
    // console.log(...coord);

    //타입 변환
    let person:object = {name : 'lee',age: 20};
    //이렇게해야하나싶네 {name:string} 타입으로 변환해서 속성값을 얻음
    (<{name:string}>person).name
    let undefinedTest
    console.log(typeof undefinedTest)
  }

  /**
   * undefined를 전달인자로 받는 상황 고려
   * 실행문과 표현식 예제 테스트
   * 
   */
  jsGrammerTest3(){
    interface INameable{
      name:string;
    }

    //undefined에 name이 있을리가 없다. 그래서 런타임에 문제가 발생한다.
    function getName(o:INameable){
      // return o.name;
      return o != undefined ? o.name : 'unknown name';
    }

    let test123;
    test123=3;

    let nu12:number;
    nu12=3;
    nu12=undefined;
    let a:string,b;
    b=10;
    //javascript 기본문법이라 es5 이하라 실행문이라 안되는건가?
    console.log(getName({name : 'myname'}));

    var temp:number;
    interface Foo {
      name? : string;
      age : number;
    }
    
    function handler (event:Event){
    }
    let foo :Foo = {
      age : 32
    }
  }

  jsGrammerTest4(){

    let num,num2;
    function add(num1:number,num2:number){
      return num1+num2;
    }

    function add1(num1:number,num2:number){
      num1 != undefined ? num1 : num1=0;
      num2 != undefined ? num2 : num2=0;
      console.log(num1,num2)
      return num1+num2;
    }
    let result=add1(num,num2);
    console.log(result)
    let add123= new Function('a','b','return a+b');
    const calc = (value: number, cb: (number) => void): void => {
      let add = (a,b) => a+b 
      
      function multiply(a,b){return a*b}
      let result=multiply(add(1,2),value);
      cb(result);
    }

    calc(30, (result: number) => console.log(`result is ${result}`));
    const ad1d = (a:number): Function => (b:number): number => a+b
    let lll=ad1d(3)
    console.log(lll(3));

    const adD = (a:number): Function => {
      function _add(b:number):number{
        return a+b;
      }
      return _add;
    }
    let add5=adD(5);
    console.log(add5(3));

    
    const makePerson = (name: string,age: number = 10):Person =>{
      const person={name,age};
      return person  
    }
    type Person = {name: string,age: number}
    const printPerson = ({name,age}: Person):void => console.log(`name : ${name},age ${age}`);
    printPerson({name:'nick',age:30});
    console.log(makePerson('jack'));
    console.log(makePerson('tom',30));

    const makeObject = (key,value) => ({[key] : value})
    console.log(makeObject('name','nick')); // {name: 'nick'}

    // class A{
    //   value:number = 1;
    //   method():void {
    //     console.log(this.value);  
    //   }
    // }
    // let a=new A();
    // a.method();

    function makeAdder(x) {
      return function(y) {
        return x + y;
      };
    }

    var add6 = makeAdder(6);
    var add10 = makeAdder(10);
    //클로저에 x와 y의 환경이 저장됨

    console.log(add6(2));  // 107 (x:6 + y:2)
    console.log(add10(2)); // 112 (x:10 + y:2)
    //함수 실행 시 클로저에 저장된 x, y값에 접근하여 값을 계산
    
    class A{
      static num = 50;
    }

    class B{
      static two = 10;
    }
    //can't multiple inheritance
    class C  extends A{

    }
    console.log(A.num);

    
  }

  stringAndArrayTest(){
    let str="hello";
    console.log(str[0]); 
    //string 넣으면 구분자 1개로만 가능하다.
    let chars=str.split("");
    console.log(chars);
    //여러개 하고싶으면 정규 표현식 써야하고, 자르는 개수 제한은 2번째 인자인 limit 사용하면된다.
    //정규표현식은 찾아보고 습득
    
    //join으로 다시 합칠 수 있다.디폴트 seperator는 ,
    let merge=chars.join("");
    console.log(chars.join());// h,e,l,l,o
    console.log(chars.join("")); // hello

    let numberList=[10,20,30,40,50];

    //배열도 객체라 접근이 가능하나 index가 나온다.
    // for( let item in numberList){
    //   console.log(item);
    // }
    
    let person= {name: 'jack',age: 30,address: '서울'}
    //객체를 해도 프로터미가 나오네? 값이 나오는줄 알았는데
    for ( let item in person){
      console.log(item,person)//name ,jack ,age , 30 ...
    }
    //js에선 되는데 ts에서는 막았다.논리적으론 object라 될거같은데 사실 접근이 되는게 좀 이상하긴하다.잘못된 사용법
    // for( let item in merge){
    //   console.log(item);
    // }

    //이게 향상된 포문이랑 같다.string도 유사배열이라 사용이 가능하다.
    for( let item of merge){
      console.log(item);
    }
    //index가 아니라 값이 나온다.
    for( let item of numberList){
      console.log(item);
    }
  } 

  genericTest(num:number[]){
    const arrayLength = <T>(array:T[]):number => array.length;
    //아래처럼 하면 어거지로 된다.
    let mix=[1,2,3,'a'];
    //이렇게 타입지정하면 섞어서 못쓰는구나!
    // let test:number[] = [1,'a','b'];
    let strList:string[]=['1,','2','3'];
    arrayLength(strList);
    arrayLength(['a','b',"c","d"]);
    console.log(arrayLength(mix));
    // console.log(typeof test);

    let numbers=[1,3,4,5,6]
    for( let number of numbers)
      console.log(number)
    type tempAs = (arg1:string,arg2:string) => void
    type test = {a:number,b:number,numbers,number};
    const let1= (a:string,b:string) =>{

    }
    //함수 시그니처는 
    // let1(1,2);
    let ttt=[1,2,3,4]
    function addT(temp:number[]){
        temp.push(1);
    }
    num=[1,2,3,4];

    console.log('num',num);
  }
  name='hello'
  
  arrayTest(test:Person,nums:number[]){
    //중간에 값찍는 법 없나?
    // const array=Array(5).fill(10).map( (x,y,ary) => {console.log(ary); return x+y});
    // console.log(...array)
    
    //=>의 this는 저세상으로 작동한다.
    const person = {
      name: 'lee',
      sayHi(){
        console.log(this.name)
      }
    };
    // console.log(test)
    nums.push(10);
    test.name='lee'
    // console.log(person.sayHi())
    //튜플은 개수가 맞아야한다.난 타입만 지정인줄
    const tuple:[number,string,boolean] = [1,'a',true];
    console.log(tuple)
    //[][]인 이유는 1차원 배열로 구성된 배열을 받으니깐 2차 배열이다
    const mergeArray = function<T>(...args: T[][]):T[]{
      let result = [];
      console.log(args)
      console.log("------")
      for( let item of args){
        // console.log(result,item)
        console.log(item)
          result=[...result,...item]
      }
      return result
    }
    console.log(mergeArray(['ㄴㅇㄹㄴ'],['ㄴㅇㄹㄴㅁㄴ']))
  }

  errorTest2(): [boolean,string]{
    try{
      throw new Error("error test");
    }
    catch(e){
      return [false,e.message];
    }
  }

  async promiseTest(){
    // const readPromise= (filename:string):Promise<string> => new Promise<string>( (
    //   resolve: (value: string) => void,
    //   reject: (error: Error) => void ) => {
    //     if(true){
    //       resolve("success");
    //     }
    //     else{
    //       reject(new Error("fail"));
    //     } 
    //   });
    //   try {
    //     setTimeout(() => { console.log("start?"); throw new Error('Error!'); }, 2000);
    //   } catch (e) {
    //     console.log('에러를 캐치하지 못한다..');
    //     console.log(e);
    //   }
    //   finally{
    //     console.log("finally")
    //   }

    //   const rejected = Promise.reject(new Error("my error"));
    //   rejected.catch( console.log );

    //   const resolve = Promise.resolve(123);
    //   resolve.then(console.log);
    //   const res=resolve.then( (value) => {return value+3333})

    // resolve 호출하면 끝이다.(resolve 처음되면 그 후 호출은 되는데 적용은 안된다.)
    // const myPromise= new Promise<string>( (resolve,reject) =>{
    //   setTimeout( () => {resolve("1"); console.log(2)},3000);
    //   setTimeout( () => {resolve("2");console.log(2)},2000);
    //   setTimeout( () => resolve("3"),1000);
    // })
    // console.log('await',await myPromise);
    // setTimeout(() => {myPromise.then(console.log)},3000)
    // myPromise.then(console.log);
    
    // const promises = Promise.all([
    //     new Promise(resolve => setTimeout( () => resolve(3),3000 )),
    //     new Promise(resolve => setTimeout( () => resolve(2),2000 )),
    //     new Promise(resolve => setTimeout( () => resolve(1),1000 )),
    //   ]).then(console.log);

    //promise를 안달고도 된다.(제일 빠르긴한데 이래도 되나?)
    // const promises = Promise.all([
    //   111,'aaa','ccc'
    // ]).then( value => {console.log(value);return [1,2,3]})//.then(console.log);
    // console.log('teste',promises)

    // const asyncExeception = async () => {
    //   throw new Error('my error2');
    // }
    // asyncExeception().catch( err => console.log(err)) 

    // const test = async (filenames:string[]) => {
    //   return await Promise.all([1,2,3,4]);
    // }
    // test(['first','seconde']).then( ([a,...rest]:number[]) => console.log(a,rest));

    // const resolvePromise=Promise.resolve([1,2,3]);
    // console.log(await resolvePromise);
    // resolvePromise.then(console.log).then(console.log);

    //async자체로 비동기로 처리되는게 아니다!promise와 await이 있어야 비동기 처리다.
    // const test1 = async () => {
    //   Promise.resolve(10).then( (values) => {
    //     for(let number=0;number<values;number++)
    //       console.log(number)
    //     })    
    // }

    // const test2 = async () => {
    //   for(let i=10;i<20;i++)
    //     await console.log('2',2)
    // }
    //아니 내가 생성하는구나. 정신차리자.
    //생성하는 순간 바로 비동기로 처리가 진행된다.그 결과를 받는 순간이 해당 Promise에 then하는 순간인거고. 이거 팩트 맞냐?
    const test1 =new Promise( resolve => {
      setTimeout( () => {console.log('first promise'); resolve(10);},5000)
    }).then( value => console.log('기다렸지?'))
    const test2 =new Promise( resolve => {
      setTimeout( () => console.log('second promise'),3000)
      console.log("되지?")
      resolve(20);
    }).then(console.log)
    //이럼 비동기 처리 아니야?
    let result;
    //결과를 then의 값으로 받고싶으면 await 처리를 하면되는거다.
    //이게 아마 10초뒤에 진행되겠지.
    //then쓰면 결과 받는 순간 실행이지? 그치?
    // result=await test1.then( (value:number) => {
    //   for(let i=0;i < value;i++)
    //     console.log('1',i);
    //   return 5;
    // })
    //여기도 마찬가지겠네?
    // result=await test2.then( (value:number) => {
    //   for(let i=0;i < value;i++)
    //     console.log('2',i);
    //   return 5;
    // })
    // console.log(result);

    
    // test2.then( (value:number) => {
    //   for(let i=0;i < value;i++)
    //     console.log(2);
    // })
    //여기가 바로 올 줄 알았는데 await 때문에 막힌다?
    console.log('first row')
  }

  //함수단위로 독립처리해라.
  async promiseTest2(){
    let value=10;
    //프로미스는 비동기 처리를 하고 성공하면 resolve 실패하면 rejected를 호출한다.
    for(let i=0;i < value;i++){
      console.log('1',i);
    }
    for(let i=0;i < value;i++){
      console.log('2',i);
    }      
  }

  async promiseTest3(){
    let value = await 1
    
  }

  async promiseTest4(){
    const test=new Promise( (resolve,reject) => reject('error')).catch(console.log).then(console.log);
  }

  // asyncTest(){
  //   const buffer:Buffer = readFileSync('./package.json');
  //   console.log(buffer.toString());
  // }
  ngOnInit(): void {
    // this.promiseTest();
    this.promiseTest4();
    //this.newNumber.emit(333);
    // this.jsGrammerTest2();
    // console.log(typeof this.jsGrammerTest);
    // this.stringAndArrayTest()
    // let test:Person = {
    //   name: 'nick',
    //   age: 30
    // }
    // let t=[1,5,9,10,20,6];
    // let temp2=t.sort();
    // console.log(temp2);
    // let temp=t.sort( (a,b) => a - b);
    // this.arrayTest(test,t);
    // console.log(temp2);
    // this.genericTest(t);
    // console.log('test:',test);
    // console.log(this.errorTest2())
  }
  //재귀함수를 짜면되는구나!
  //1~....n까지 숫자 배열을 생성하는 함수
  
}

const f =(callback: () => void): void => callback();