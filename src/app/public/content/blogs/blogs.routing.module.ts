import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent, IndexMainComponent } from './index.component';
import { EditorComponent } from './editor/editor.component';
export const routes: Routes = [
   { 
    path: '', 
    component: IndexComponent,
    children: [
      {
        path: '', component: IndexMainComponent, pathMatch: 'full'
      },
      {
        path: 'editor', component: EditorComponent, pathMatch: 'full'
       // path: 'send/:id', component: SendComponent, pathMatch: 'full' 
      }
    ] 
   }
 
];

export const routing = RouterModule.forChild(routes);