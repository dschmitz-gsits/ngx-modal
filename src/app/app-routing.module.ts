import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./sample1-simple-usage/sample1.module').then(m => m.Sample1Module)
  },
  {
    path: 'route-modals',
    loadChildren: () => import('./sample2-routing-modal/sample2.module').then(m => m.Sample2Module)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
