import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecettesRoutingModule } from './recettes-routing.module';
import { SingleRecetteComponent } from './single-recette/single-recette.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SingleRecetteComponent,
  ],
  imports: [
    CommonModule,
    RecettesRoutingModule,
    ReactiveFormsModule
  ]
})
export class RecettesModule { }
