import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'firebase/auth';
import { Recette } from '../interfaces/recette';
import { RecettesService } from '../services/recettes.service';
import { AuthService } from '../services/auth.service';
import { Patient } from '../interfaces/patient';
import { PatientsService } from '../services/patients.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  recettesSubscription!: Subscription;
  recettes: Recette[] = [];
  //recettesForThisPatient: Recette[] = [];
  currentUserSubscription!: Subscription;
  currentUser!: User;
  currentPatientEmail!: string;
  patientsSubscription!: Subscription;
  patients: Patient[] = [];
  currentPatient: Patient[] = [];

  constructor(
    private router: Router,
    private recettesService: RecettesService,
    private patientsService: PatientsService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
     this.currentUserSubscription = this.authService.currentUserSubject.subscribe({
      next: user => this.currentUser = <User>user,
      error: console.error
    });


    this.patientsSubscription = this.patientsService.patientsSubject.subscribe({
      next: (patients: Patient[]) => {
        this.patients = patients;
      },
      error: (error) => {
        console.error(error);
      }
    });


    this.patientsService.getPatients();
    this.currentPatientEmail = <string>this.authService.currentUserSubject.value?.email ?? '';

    if(this.currentPatientEmail !== '' && this.currentPatientEmail !== 'fabien.macip@gmail.com'){
      this.currentPatient = this.patients.filter(e => e.email === this.currentPatientEmail);
      this.initRecettes(true);
    }
    else{
      this.initRecettes();
    }
  }

  // FONCTION POUR DEBUG --------------------------------------------------------------------------------------------------
  showSomething(): void{
  }
  // FONCTION POUR DEBUG --------------------------------------------------------------------------------------------------

  initRecettes(connecte: boolean = false): void {
    //let isVisiteur = true;
    this.recettesSubscription = this.recettesService.recettesSubject.subscribe({
      next: recettes => {
        this.recettes = recettes.filter(el => el.patientsOnlyCheck == false).concat(recettes.filter(el => el.patientsOnlyCheck == true));
      },
      error: console.error
    });

    if(connecte){
      this.recettesService.getRecettesPatient(
        this.currentPatient[0].allergenCacahuete,
        this.currentPatient[0].allergenCacao,
        this.currentPatient[0].allergenGluten,
        this.currentPatient[0].allergenLait,
        this.currentPatient[0].dietNormal,
        this.currentPatient[0].dietDiabete,
        this.currentPatient[0].dietPaleo,
        this.currentPatient[0].dietProteine,
        this.currentPatient[0].dietVegan,
        this.currentPatient[0].dietVegetarien
        );
    } else {
      this.recettesService.getRecettes();
    }
  }

  ngOnDestroy(): void {
      this.recettesSubscription.unsubscribe();
      this.patientsSubscription.unsubscribe();
  }

}
