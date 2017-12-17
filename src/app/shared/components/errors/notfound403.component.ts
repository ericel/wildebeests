import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
@Component({
  selector: 'app-notdfound403',
  template: `
  <h1> Valid request but you ain't authorized!

  `,
  styleUrls: ['./errors.css']
})
export class Notfound403Component implements OnInit {

  constructor(private title: Title, private meta: Meta) { }

  ngOnInit() {
    this.title.setTitle("Authorization required!");
    this.meta.addTags([
      {name: 'keywords', content: 'Shakedown Authorization required.'},
      {name: 'description', content: 'Shakedown Authorization required page'}
    ])
  }

}
