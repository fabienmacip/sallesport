import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { RecetteListComponent } from './recette-list/recette-list.component';
import { RegimeListComponent } from './regime-list/regime-list.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { AllergeneListComponent } from './allergene-list/allergene-list.component';
import { RecetteComponent } from './admin/recette/recette.component';
import { RegimeComponent } from './admin/regime/regime.component';
import { AllergeneComponent } from './admin/allergene/allergene.component';
import { PatientComponent } from './admin/patient/patient.component';
import { RecettesComponent } from './recettes/recettes.component';
import { ContactComponent } from './contact/contact.component';
import { MentionsLegalesComponent } from './mentions-legales/mentions-legales.component';
import { PolitiqueConfidentialiteComponent } from './politique-confidentialite/politique-confidentialite.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecetteListComponent,
    RegimeListComponent,
    PatientListComponent,
    AllergeneListComponent,
    RecetteComponent,
    RegimeComponent,
    AllergeneComponent,
    PatientComponent,
    RecettesComponent,
    ContactComponent,
    MentionsLegalesComponent,
    PolitiqueConfidentialiteComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
