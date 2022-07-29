import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { MentionsLegalesComponent } from './mentions-legales/mentions-legales.component';
import { PolitiqueConfidentialiteComponent } from './politique-confidentialite/politique-confidentialite.component';
import { RecettesComponent } from './recettes/recettes.component';

const routes: Routes = [
  /* { path: 'admin/:id', component: DashboardComponent }, */
  { path: 'admin/patients/:id', component: DashboardComponent },
  { path: 'admin', component: DashboardComponent, loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'recettes', component: RecettesComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'mentions-legales', component: MentionsLegalesComponent},
  { path: 'politique-confidentialite', component: PolitiqueConfidentialiteComponent},
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
