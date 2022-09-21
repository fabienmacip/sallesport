import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnDestroy {

  currentUserSubscription!: Subscription;
  currentUser!: User;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.initCurrentUser();
  }

  initCurrentUser(): void {
    /* this.currentUserSubscription = this.authService.currentUserSubject.subscribe({
      next: user => this.currentUser = <User>user,
      error: console.error
    }) */
  }

  ngOnDestroy(): void {
    //this.currentUserSubscription.unsubscribe();
  }

}
