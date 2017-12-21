import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../../../shared/core/navbar/navbar.service';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as actions from './../state/blogs.actions';
import * as fromBlog from './../state/blogs.reducer';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  constructor(public nav: NavbarService,
     private title: Title,
    private meta: Meta,
    private router: Router,
    private route: ActivatedRoute,) { }
  
    ngOnInit() {
      this.nav.show();
        this.route.params.subscribe(params => {
        let str = params['string'];
        let n = str.lastIndexOf('-');
        let result = str.substring(n + 1);
        console.log(result)
      });
      this.title.setTitle('Blog name');
      this.meta.addTags([
        { name: 'keywords', content: 'Blog Editor'},
        { name: 'description', content: 'Blog Editor' }
      ]);
    }
}
