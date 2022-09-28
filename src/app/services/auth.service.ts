import { Injectable, EventEmitter, Output } from '@angular/core';
/* import { AngularFireAuth } from '@angular/fire/compat/auth'; */
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user';
import { ApiService } from './api.service';
import { Subscription } from 'rxjs';
/* import { Admin } from '../interfaces/admin'; */
import { Router } from '@angular/router';
/* import { CurrentUser } from '../interfaces/current-user'; */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUserSubject = new BehaviorSubject<User | null>(null);
  //currentUserSubject = new BehaviorSubject<CurrentUser | null>(null);
  user!: User;

  subscription! : Subscription;

  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  private logged: boolean = false;

  constructor(
    /* private auth: AngularFireAuth, */
    private apiService: ApiService,
    private router: Router
  ) {
/*     this.auth.onAuthStateChanged(user => {
      this.currentUserSubject.next(user);
    }, console.error); */
  }

/*   signupUser(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.auth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        resolve(user);
      }).catch(reject);
    });
  }
 */

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  setEmail(email: string) {
    localStorage.setItem('email', email);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getEmail() {
    return localStorage.getItem('email');
  }

  getRole() {
    return localStorage.getItem('role');
  }

  getId() {
    return localStorage.getItem('id');
  }

  deleteId() {
    localStorage.removeItem('id');
  }

  deleteRole() {
    localStorage.removeItem('role');
  }

  deleteName() {
    localStorage.removeItem('name');
  }

  deleteEmail() {
    localStorage.removeItem('email');
  }

  deleteToken() {
    localStorage.removeItem('token');
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
              let id = result2[0].id ?? 0;
              let role = result2[0].role ?? '';
              let name = result2[0].name ?? result2[0].nomfranchise;
              let email = result2[0].mail ?? result2[0].email ?? '';
              let token = result2[0].token ?? '';
              this.apiService.setId(id);
              this.apiService.setRole(role);
              this.apiService.setName(name);
              this.apiService.setEmail(email);
              this.apiService.setToken(token);
              this.getLoggedInName.emit(true);
              this.user = {
                id: id,
                role: role,
                name: name,
                email: email,
                token: token
              }

              this.currentUserSubject.next(this.user);
              if(role == 'admin'){
                this.router.navigate(['home']);
              } else {
                this.router.navigate(['admin','partenaires']);
              }
          }
        },
        error: error => {
          console.error('Erreur de Login !', error);
        }
      });

    })
    .then()
    .catch(console.error);

  }


/*   firebaseSigninUser(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.auth.signInWithEmailAndPassword(email, password)
      .then(resolve)
      .catch(reject);
    });
  }
 */
  signoutUser(): Promise<void> {
    {
      this.deleteToken();
      this.deleteRole();
      this.deleteId();
      this.currentUserSubject.next(null);
      this.router.navigate(['auth','signin']);
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


/*   firebaseSignoutUser(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.auth.signOut()
      .then(() => {
        this.currentUserSubject.next(null);
        resolve();
      })
      .catch(reject);
    });
  }
 */
/*   sendPasswordResetEmail(email: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.auth.sendPasswordResetEmail(email).then(resolve).catch(reject);
    })
  }
 */

}
