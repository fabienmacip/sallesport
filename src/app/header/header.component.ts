import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
//import { refFromURL } from 'firebase/database';
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

  role: string = '';
  userId: number = 0;

  title = 'FITME';

  @Input() loginbtn: boolean = true;
  @Input() logoutbtn: boolean = false;


  constructor(
    private authService: AuthService,
    private router: Router
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

  getTitle(): string {
    return this.title;
  }

  onSignOut(): void {
    this.loginbtn = true;
    this.logoutbtn = false;
    this.authService.signoutUser()
    .then(() => {
      this.router.navigate(['auth','signin']);
    }).catch(console.error);
  }

  loggedInToken() {
    return (localStorage.getItem('token') != null);
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }

}
