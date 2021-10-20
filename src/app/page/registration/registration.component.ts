import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../service/auth-service.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  form: any = {
    username : null,
    email : null,
    password : null,
    phone : null
  };

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  responseString = '';

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() : void{
   const {username,email,password,phone} = this.form;
    
    this.authService.register(username,email,password,phone).subscribe(
      
      data => {
        console.log(data);        
        this.isSuccessful = true;
        this.responseString = data;
        this.isSignUpFailed = false;
      },
      err => {
        console.log(err);        
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;  
      }
    )
  }

}
