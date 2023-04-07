import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-parent',
  templateUrl: './test-parent.component.html',
  styleUrls: ['./test-parent.component.css']
})
export class TestParentComponent implements OnInit {
  hero ="good";
  temp = "property"
  constructor() { }

  addItem(newItem: string) {
  }
  test(num){
    console.log(num);
  }
  ngOnInit(): void {
  }

}
