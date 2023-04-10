import { Component, OnInit } from '@angular/core';
import { MessageService } from '../service/message.service';
import { CustomerService } from '../customer/customer.service';

@Component({
  selector: 'app-test-parent',
  templateUrl: './test-parent.component.html',
  styleUrls: ['./test-parent.component.css']
})
export class TestParentComponent implements OnInit {
  hero ="good";
  temp = "property"
  constructor(private messageService: MessageService,private customerService:CustomerService) { }

  addItem(newItem: string) {
  }
  test(num){
    console.log(num);
  }
  ngOnInit(): void {
  }
}
