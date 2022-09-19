import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StructureComponent } from './structure/structure.component';
import { PartenaireComponent } from './partenaire/partenaire.component';
import { GrantsComponent } from './grants/grants.component';
import { MailsComponent } from './mails/mails.component';
import { AccountComponent } from '../account/account.component';
import { AccountModule } from '../account/account.module';

const routes: Routes = [

  {path: '', redirectTo: 'partenaires', pathMatch: 'full'},
  { path: 'partenaires', component: PartenaireComponent},
  { path: 'structures', component: StructureComponent},
  { path: 'structures/:partenaireId/:partenaireNomFranchise', component: StructureComponent},
  { path: 'mails', component: MailsComponent },
  /*   { path: 'partenaires', component: PartenaireComponent },
  { path: 'grants', component: GrantsComponent },
  { path: 'account', component: AccountModule },
  { path: 'structures', component: StructureComponent },
  { path: 'mails', component: MailsComponent }, */
  /*   { path: 'dashboard/:id', component: DashboardComponent }, */
  { path: '', redirectTo: 'partenaires', pathMatch: 'full' },
  { path: '**', redirectTo: 'partenaires' }
  /* { path: 'dashboard', component: DashboardComponent } */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
