import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StructureComponent } from './structure/structure.component';
import { PartenaireComponent } from './partenaire/partenaire.component';
import { MailsComponent } from './mails/mails.component';

const routes: Routes = [

  {path: '', redirectTo: 'partenaires', pathMatch: 'full'},
  { path: 'partenaires', component: PartenaireComponent},
  { path: 'structures', component: StructureComponent},
  { path: 'structures/:partenaireId/:partenaireNomFranchise', component: StructureComponent},
  { path: 'mails', component: MailsComponent },
  { path: '', redirectTo: 'partenaires', pathMatch: 'full' },
  { path: '**', redirectTo: 'partenaires' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
