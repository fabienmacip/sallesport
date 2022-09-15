import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FitMe';

  loginbtn:boolean = true;
  logoutbtn:boolean = false;

  constructor(
    private authService: AuthService
  ) {
      authService.getLoggedInName.subscribe(name => this.changeName(name));
      if(this.authService.isLoggedIn())
      {
        console.log("logged in");
        this.loginbtn=false;
        this.logoutbtn=true
      }
      else{
        this.loginbtn=true;
        this.logoutbtn=false
      }
  }

  private changeName(name: boolean): void {
    this.logoutbtn = name;
    this.loginbtn = !name;
  }

  private logout()
  {
    this.authService.deleteToken();
    window.location.href = window.location.href;
  }
}
