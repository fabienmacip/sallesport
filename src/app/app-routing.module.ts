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
  { path: 'admin', canActivate: [AuthGuard], loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'account', canActivate: [AuthGuard], component: AccountComponent},
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
