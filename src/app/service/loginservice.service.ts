import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  public loginData : any;
  constructor(private router: Router) { }


  logOut() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('authToken');
    this.router.navigate([""]).then(() => {
      window.location.reload();
    });
  }
}
