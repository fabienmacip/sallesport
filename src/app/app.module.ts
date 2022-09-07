import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

/* import { RecetteListComponent } from './recette-list/recette-list.component'; */
/* import { RegimeListComponent } from './regime-list/regime-list.component'; */
import { PatientListComponent } from './patient-list/patient-list.component';
/* import { AllergeneListComponent } from './allergene-list/allergene-list.component'; */
import { RecetteComponent } from './admin/recette/recette.component';
import { RegimeComponent } from './admin/regime/regime.component';
import { AllergeneComponent } from './admin/allergene/allergene.component';
import { PatientComponent } from './admin/patient/patient.component';
import { RecettesComponent } from './recettes/recettes.component';
import { ContactComponent } from './contact/contact.component';
import { MentionsLegalesComponent } from './mentions-legales/mentions-legales.component';
import { PolitiqueConfidentialiteComponent } from './politique-confidentialite/politique-confidentialite.component';
import { HomeComponent } from './home/home.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { HttpClientModule } from '@angular/common/http';
import { GrantsComponent } from './grants/grants.component';

/* import { StepsPipe } from './pipes/steps.pipe'; */
/* import { SafeUrlPipe } from './pipes/safe-url.pipe'; */



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    /* RecetteListComponent, */
    /* RegimeListComponent, */
    PatientListComponent,
    /* AllergeneListComponent, */
    /* RecetteComponent, */
    RegimeComponent,
    AllergeneComponent,
    PatientComponent,
    RecettesComponent,
    ContactComponent,
    MentionsLegalesComponent,
    PolitiqueConfidentialiteComponent,
    HomeComponent,
    GrantsComponent,

    /* StepsPipe */
    /* SafeUrlPipe */
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    /* provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()) */
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
