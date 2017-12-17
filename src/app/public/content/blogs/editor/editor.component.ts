import { Component, OnInit } from '@angular/core';
import { NavbarService } from './../../../../shared/core/navbar/navbar.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  
  constructor(public nav: NavbarService) { }

  ngOnInit() {
    this.nav.show();
  }

  
}
