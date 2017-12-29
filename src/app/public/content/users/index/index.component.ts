import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  template:`<router-outlet></router-outlet>`,
  styleUrls: ['./index.component.css']
})
export class IndexComponent{

  constructor() { }

}


@Component({
  selector: 'app-index-users',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class UsersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
