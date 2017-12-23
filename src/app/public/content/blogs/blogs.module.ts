import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent, IndexMainComponent } from './index.component';
import { EditorComponent } from './editor/editor.component';
import { routing } from './blogs.routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BlogsEffects } from './state/blogs.effects';
import { blogReducer } from './state/blogs.reducer';
import { SkinModule } from '../../../shared/core/skin/skin.module';
import { BlogComponent } from './blog/blog.component';
import * as moment from 'moment';
import { MomentModule } from 'angular2-moment';
@NgModule({
  imports: [
    CommonModule,
    routing,
    SkinModule,
    SharedModule,
    MomentModule,
    StoreModule.forFeature('blog', blogReducer),
    EffectsModule.forFeature([BlogsEffects])
  ],
  declarations: [
    IndexComponent,
    IndexMainComponent,
    EditorComponent,
    BlogComponent
  ]
})
export class BlogsModule { }
