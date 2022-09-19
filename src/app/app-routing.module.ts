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
import { MailsComponent } from './admin/mails/mails.component';
import { AccountModule } from './account/account.module';
import { AccountComponent } from './account/account.component';
//import { RecettesComponent } from './recettes/recettes.component';

const routes: Routes = [
  // Avant modif
  /* { path: 'admin', canActivate: [AuthGuard], loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }, */



  // Après modif
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },



  // Pas touché
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'account', component: AccountComponent},
  /* { path: 'account', canActivate: [AuthGuard], loadChildren: () => import('./account/account.module').then(m => m.AccountModule) }, */
  { path: 'recettes', loadChildren: () => import('./recettes/recettes.module').then(m => m.RecettesModule) },
/*   { path: 'partenaires', component: PartenaireComponent},
  { path: 'structures', component: StructureComponent},
  { path: 'structures/:partenaireId/:partenaireNomFranchise', component: StructureComponent},
  { path: 'mails', component: MailsComponent }, */
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
