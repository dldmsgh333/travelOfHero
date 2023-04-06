import { Component, OnInit } from '@angular/core';
import { MessageService } from '../service/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  //왜 퍼블릭으로 받는거지?
  //퍼블릭으로 선언해야 바인딩이 가능해서라고 나와있다.
  //template에서 바인딩에 사용하기 때문이다.
  constructor(public messageService : MessageService) { }

  ngOnInit(): void {
  }

}
