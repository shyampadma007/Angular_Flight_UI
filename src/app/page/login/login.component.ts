import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth-service.service';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /*form:any = {
    user_name : null,
    password : null
  };*/

 
  isLoggedin = false;
  isLoginFailed = false;
  errorMessage = '';
  roles : string[] = [];

  constructor(private authService : AuthService,private router: Router,private tokenStorage:TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedin = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  
  onSubmit(loginCheck : any ) : void {
    //const { user_name,password } = this.form;

    if(loginCheck.value.username=="admin" && loginCheck.value.password=="admin")
    {
      this.router.navigate(['/admin/addflight']);
    }
    else{
    const data = {
      "username" : loginCheck.value.username,
      "password" : loginCheck.value.password
    }
    sessionStorage.setItem('username',loginCheck.value.username);
    console.log(loginCheck.value.username);
    this.authService.login(data).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        console.log("Success");
        this.isLoginFailed = false;
        this.isLoggedin = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.router.navigate(['/userbooking']);
        
      },
      error => {
        console.log("ERROR");
        console.log(error.error.text);
        if(error.error.text=='Success'){
          this.router.navigate(['/userbooking']);
        } 
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
        
      }
    );
  }
}
 
}
