import { Component, OnInit } from '@angular/core';
import { interval, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor() { }
  observableTest(){
    // Create an Observable that will publish a value on an interval
    let num=[1,2,3,4,5];
    let temp = of(...num);
    temp.subscribe( item => 
      {
        console.log(item);
      },() => console.log("finish"), () => console.log("finish"));
  }

  ngOnInit(): void {
  }

}
