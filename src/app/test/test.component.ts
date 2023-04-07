import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject, interval, of } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

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

  ngOnInit(): void {
    this.observeTest3();

  }

}
