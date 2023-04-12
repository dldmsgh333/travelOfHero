import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject, interval, of } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { Person,Test } from '../model/person';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  @Input() hero:string;
  @Output() newNumber = new EventEmitter<number>();
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

    console.log(getName({name : 'myname'}));
  }
  ngOnInit(): void {
    this.newNumber.emit(333);
    // this.jsGrammerTest2();
    this.jsGrammerTest3();
    // console.log(typeof this.jsGrammerTest);
    
  }

}
