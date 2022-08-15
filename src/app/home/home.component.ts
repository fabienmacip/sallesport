import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'firebase/auth';
import { Recette } from '../interfaces/recette';
import { RecettesService } from '../services/recettes.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  recettesSubscription!: Subscription;
  recettes: Recette[] = [];
  currentUserSubscription!: Subscription;
  currentUser!: User;

  constructor(
    private router: Router,
    private recettesService: RecettesService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
     this.currentUserSubscription = this.authService.currentUserSubject.subscribe({
      next: user => this.currentUser = <User>user,
      error: console.error
    });

    this.initRecettes();

  }

  initRecettes(): void {
    //let isVisiteur = true;
    this.recettesSubscription = this.recettesService.recettesSubject.subscribe({
      next: recettes => {
        this.recettes = recettes.filter(el => el.patientsOnlyCheck == false).concat(recettes.filter(el => el.patientsOnlyCheck == true));
      },
      error: console.error
    });
    this.recettesService.getRecettes();
  }

  ngOnDestroy(): void {
      this.recettesSubscription.unsubscribe();
  }

}
