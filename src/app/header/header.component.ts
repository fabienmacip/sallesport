import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  currentUserSubscription!: Subscription;
  currentUser!: User;

  title = 'FITME';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentUserSubscription = this.authService.currentUserSubject.subscribe({
      next: user => this.currentUser = <User>user,
      error: console.error
    });
  }

  getTitle(): string {
    return this.title;
  }

  onSignOut(): void {
    this.authService.signoutUser()
    .then(() => {
      this.router.navigate(['/home']);
    }).catch(console.error);
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }

}
