import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { EditAuthInfosComponent } from './edit-auth-infos/edit-auth-infos.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AccountComponent,
    EditAuthInfosComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    NgbModalModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    EditAuthInfosComponent
  ]
})
export class AccountModule { }
