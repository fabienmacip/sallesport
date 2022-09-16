import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../directives/directives.module';
import { PipesModule } from '../pipes/pipes.module';
import { MailsComponent } from './mails/mails.component';
//import { StructureComponent } from './structure/structure.component';



@NgModule({
  declarations: [
    DashboardComponent,
    MailsComponent,
    //StructureComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    PipesModule
  ]
})
export class AdminModule {
/* Dans les imports :
  PipesModule,
  DirectivesModule
 */

}
