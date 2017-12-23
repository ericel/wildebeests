import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent, IndexMainComponent } from './index.component';
import { EditorComponent } from './editor/editor.component';
import { BlogComponent } from './blog/blog.component';
import { AuthGuard } from '../../../shared/core/auth/authguard/auth.guard';
export const routes: Routes = [
   { 
    path: '', 
    component: IndexComponent,
    children: [
      {
        path: '', component: IndexMainComponent, pathMatch: 'full'
      },
      {
        path: 'editor', component: EditorComponent, pathMatch: 'full', canActivate: [AuthGuard]
       // path: 'send/:id', component: SendComponent, pathMatch: 'full' 
      },
      {
        path: ':string/:string', component: BlogComponent, pathMatch: 'full'
      }
    ] 
   }
 
];

export const routing = RouterModule.forChild(routes);