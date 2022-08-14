import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recette } from '../interfaces/recette';
import { RecettesService } from '../services/recettes.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  recettesSubscription!: Subscription;
  recettes: Recette[] = [];

  constructor(
    private router: Router,
    private recettesService: RecettesService
  ) { }

  ngOnInit(): void {
    this.initRecettes();
  }

  initRecettes(): void {
    this.recettesSubscription = this.recettesService.recettesSubject.subscribe({
      next: recettes => this.recettes = recettes,
      error: console.error
    });
    this.recettesService.getRecettes();
    console.log(this.recettes);
  }

  ngOnDestroy(): void {
      this.recettesSubscription.unsubscribe();
  }

}
