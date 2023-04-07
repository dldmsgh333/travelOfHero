import { Directive, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[appTest]'
})
export class TestDirective implements OnInit,OnDestroy{

  ngOnDestroy(): void {
    console.log("destory");
  }

  ngOnInit(): void {
    console.log("init");
  }
  constructor() { }

}
