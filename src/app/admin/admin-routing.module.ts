import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecetteComponent } from './recette/recette.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'recettes', component: RecetteComponent },
/*   { path: 'dashboard/:id', component: DashboardComponent }, */
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
