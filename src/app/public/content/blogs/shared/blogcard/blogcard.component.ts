import { Component, OnInit,  Input, Output } from '@angular/core';

@Component({
  selector: 'app-blogcard',
  templateUrl: './blogcard.component.html',
  styleUrls: ['./blogcard.component.css']
})
export class BlogcardComponent implements OnInit {
  @Input() blog;
  constructor() { }

  ngOnInit() {

  }

}
