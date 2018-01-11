import { Component, OnInit } from '@angular/core';
import { NavbarService } from '@shared/core/navbar/navbar.service';
import { Title, Meta } from '@angular/platform-browser';
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  
  constructor(public nav: NavbarService, private title: Title, private meta: Meta) { }

  ngOnInit() {
    this.nav.show();
    this.title.setTitle('Blog Eidtor');
    this.meta.addTags([
      { name: 'keywords', content: 'Blog Editor'},
      { name: 'description', content: 'Blog Editor' }
    ]);
  }

  
}
