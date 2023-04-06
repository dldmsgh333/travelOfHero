import { Component, OnInit } from '@angular/core';
import { interval, of } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  timeOutTest(num):void{
    //타임아웃 걸려서 이상해진다.
    setTimeout(num => console.log(`${num}`),2000,num);
  }

  errorTest(){
    of(1,2,3,4,5).pipe( 
      tap( num => {
        if( num%2 === 0)
          throw new Error("test");
        else
          console.log(num);
      }),
      catchError( error => {
        console.log(error.message);
        return of([]);
      }),
    ).subscribe();
  }
  
  observableTest(){
    // Create an Observable that will publish a value on an interval
    let num=[1,2,3,4,5];
    let temp = of(...num);
    let test= temp.pipe( map( (num:number) => num+2));
    test.subscribe(item => console.log(item));
    // temp.subscribe( item => 
    //   {
    //     console.log(item);
    //   },() => console.log("finish"), () => console.log("finish"));
  }

  constructor() { }

  ngOnInit(): void {
  }

}
