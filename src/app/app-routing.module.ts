import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/* import { DashboardComponent } from './admin/dashboard/dashboard.component'; */
import { ContactComponent } from './contact/contact.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { MentionsLegalesComponent } from './mentions-legales/mentions-legales.component';
import { PolitiqueConfidentialiteComponent } from './politique-confidentialite/politique-confidentialite.component';
import { PartenaireComponent } from './admin/partenaire/partenaire.component';
import { GrantsComponent } from './admin/grants/grants.component';
import { StructureComponent } from './admin/structure/structure.component';
//import { RecettesComponent } from './recettes/recettes.component';

const routes: Routes = [
  { path: 'admin', canActivate: [AuthGuard], loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'account', canActivate: [AuthGuard], loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  { path: 'recettes', loadChildren: () => import('./recettes/recettes.module').then(m => m.RecettesModule) },
  { path: 'partenaires', component: PartenaireComponent},
  { path: 'structures', component: StructureComponent},
  { path: 'structures/:partenaireId/:partenaireNomFranchise', component: StructureComponent},
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
