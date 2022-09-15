import { Injectable, EventEmitter, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, empty } from 'rxjs';
import { User } from '../interfaces/user';
import { ApiService } from './api.service';
import { Subscription } from 'rxjs';
import { Admin } from '../interfaces/admin';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUserSubject = new BehaviorSubject<User | null>(null);

  subscription! : Subscription;

  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  private logged: boolean = false;

  constructor(
    private auth: AngularFireAuth,
    private apiService: ApiService,
    private router: Router
  ) {
    this.auth.onAuthStateChanged(user => {
      this.currentUserSubject.next(user);
    }, console.error);
  }

  signupUser(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.auth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        resolve(user);
      }).catch(reject);
    });
  }


  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  deleteRole() {
    localStorage.removeItem('role');
  }

  isLoggedIn() {
    const usertoken = this.getToken();
    if (usertoken != null) {
      return true
    }
      return false;
    }


  signinUser(email: string, password: string): Promise<any> {

    return new Promise((res, rej) => {

      this.subscription = this.apiService.userLogin(email, password).subscribe({
        next: data => {
          if(typeof(data) == 'object' && Object.keys(data).length > 0){
              let result2 = Object.values(data);
              this.logged = true;

              let name = result2[0].name ?? result2[0].nomfranchise;
              let role = result2[0].name ? 'admin' : 'partenaire';
              this.apiService.setToken(name);
              this.apiService.setRole(role);
              this.getLoggedInName.emit(true);
              this.router.navigate(['home']);
          }
        },
        error: error => {
          console.error('Erreur de Login !', error);
        }
      });

    })
    .then()
    .catch(console.error);


      /* return this.logged; */

/*        return new Promise((res, rej) => {
        if(this.logged){
          return res;
        }else {
          return rej;
        }
      });
 */  }


  firebaseSigninUser(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.auth.signInWithEmailAndPassword(email, password)
      .then(resolve)
      .catch(reject);
    });
  }

  signoutUser(): Promise<void> {
    {
      this.deleteToken();
      this.deleteRole();
      this.router.navigate(['home']);
    }
    return new Promise((resolve, reject) => {
/*       this.auth.signOut()
      .then(() => {
        this.currentUserSubject.next(null);
        resolve();
      })
      .catch(reject);
 */    });
  }


  firebaseSignoutUser(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.auth.signOut()
      .then(() => {
        this.currentUserSubject.next(null);
        resolve();
      })
      .catch(reject);
    });
  }

  sendPasswordResetEmail(email: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.auth.sendPasswordResetEmail(email).then(resolve).catch(reject);
    })
  }


}
