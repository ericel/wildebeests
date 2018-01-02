import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./../../../money/send/send.component.css']
})
export class UserDetailCard implements OnInit {
  @Input() user0;
  constructor() { }

  ngOnInit() {
  }

}
