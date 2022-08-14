import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingleRecetteComponent } from './single-recette/single-recette.component';

const routes: Routes = [
  { path: ':id', component: SingleRecetteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecettesRoutingModule { }
