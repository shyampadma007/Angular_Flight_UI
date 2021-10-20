import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const AUTH_API = 'http://localhost:8111/auth/userapi/';

const httpOptions = {
  headers : new HttpHeaders({'Content-Type' : 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
        })
    };
  constructor(private http:HttpClient) { }

    loginCheck = true;

  register(username: string,email:string,password:string,phone: number) : Observable<any>{
    return this.http.post(AUTH_API + 'signup',{
      username,
      email,
      password,
      phone
    },{responseType : 'text'})
  }

  login(loginCheck : any): Observable<any> {
    /*return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);*/
   
    return this.http.post<any>(AUTH_API + 'signin', JSON.stringify(loginCheck), this.httpOptions);
    
  }
}
