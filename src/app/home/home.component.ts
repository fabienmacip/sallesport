import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'firebase/auth';
import { ApiService } from '../services/api.service';
import { Structure } from '../interfaces/structure';
import { RecettesService } from '../services/recettes.service';
import { AuthService } from '../services/auth.service';
import { Partenaire } from '../interfaces/partenaire';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  recettesSubscription!: Subscription;
  //recettes: Recette[] = [];
  currentUserSubscription!: Subscription;
  currentUser!: User;
  currentPartenaireEmail!: string;
  partenairesSubscription!: Subscription;
  partenaires: Partenaire[] = [];
  currentPartenaire: Partenaire[] = [];

  role: string = '';
  userId: number = 0;

  constructor(
    private router: Router,
    private recettesService: RecettesService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    if(this.authService.getRole() != ''){
      this.role = <string>this.authService.getRole();
    }

    if(this.authService.getId() != ''){
      this.userId = Number(this.authService.getId());
    }


     this.currentUserSubscription = this.authService.currentUserSubject.subscribe({
      next: user => this.currentUser = <User>user,
      error: console.error
    });


    this.currentPartenaireEmail = <string>this.authService.currentUserSubject.value?.email ?? '';

    if(this.currentPartenaireEmail !== '' && this.currentPartenaireEmail !== 'fabien.macip@gmail.com'){
      this.currentPartenaire = this.partenaires.filter(e => e.mail === this.currentPartenaireEmail);
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
    //this.recettesSubscription = this.recettesService.recettesSubject.subscribe({
    //  next: recettes => {
        //this.recettes = recettes.filter(el => el.partenairesOnlyCheck == false).concat(recettes.filter(el => el.partenairesOnlyCheck == true));
    //  },
    //  error: console.error
    //});

    if(connecte){
      /* this.recettesService.getRecettesPatient(
        this.currentPatient[0]?.allergenCacahuete,
        this.currentPatient[0]?.allergenCacao,
        this.currentPatient[0]?.allergenGluten,
        this.currentPatient[0]?.allergenLait,
        this.currentPatient[0]?.dietNormal,
        this.currentPatient[0]?.dietDiabete,
        this.currentPatient[0]?.dietPaleo,
        this.currentPatient[0]?.dietProteine,
        this.currentPatient[0]?.dietVegan,
        this.currentPatient[0]?.dietVegetarien
        ); */
    } else {
      this.recettesService.getRecettes();
    }
  }

  ngOnDestroy(): void {
      //this.recettesSubscription.unsubscribe();
      //this.partenairesSubscription.unsubscribe();
  }

}
