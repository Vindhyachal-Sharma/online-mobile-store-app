import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AlertService } from '../alertService/alert.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private alert: AlertService
  ) {}

  public isAdmin(): boolean {
    if (localStorage.getItem('role') === 'Admin') {
      return true;
    } else {
      return false;
    }
  }
  public isLogin(): Boolean {
    if (localStorage.getItem('userName') != null) {
      return true;
    } else {
      return false;
    }
  }

  public logout() {
    localStorage.clear();
    this.alert.apiSuccessMsg('Logout Successfull', 2000);
    this.router.navigate(['home']).then(() => {
      window.location.reload();
    });
  }
  checkForLogin() {
    if (this.isLogin()) {
      return true;
    } else {
      Swal.fire({
        title: 'Login Required',
        text: 'Sorry you need to login to view this page',
        icon: 'warning',
      });
      this.router.navigate(['login']);
      return false;
    }
  }

  public login(request: any) {
    return this.http.post('http://localhost:8092/login', request, {
      responseType: 'text' as 'json',
      observe: 'response',
    });
  }

  public tokenExpired(token: string) {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }
  public checkForToken() {
    let token = localStorage.getItem('TOKEN');
    if (token != null) {
      if (this.tokenExpired(token)) {
        sessionStorage.clear();
        this.alert.apiSuccessMsgReload(
          'Session Expired need to login again',
          4000
        );
        this.router.navigate(['home']).then(() => {
          window.location.reload();
        });
      }
    }
  }
}
