import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../interfaces/user';
/* import { ApiService } from '../services/api.service';
import { Structure } from '../interfaces/structure'; */
import { AuthService } from '../services/auth.service';
import { Partenaire } from '../interfaces/partenaire';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

/*   recettesSubscription!: Subscription; */
  currentUserSubscription!: Subscription;
  currentUser!: User;
  currentPartenaireEmail!: string;
  partenairesSubscription!: Subscription;
  partenaires: Partenaire[] = [];
  currentPartenaire: Partenaire[] = [];

  role: string = '';
  userId: number = 0;

  constructor(
  /*   private router: Router, */
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
  }

  // FONCTION POUR DEBUG --------------------------------------------------------------------------------------------------
  showSomething(): void{
  }
  // FONCTION POUR DEBUG --------------------------------------------------------------------------------------------------

  ngOnDestroy(): void {
      //this.recettesSubscription.unsubscribe();
      //this.partenairesSubscription.unsubscribe();
  }

}
