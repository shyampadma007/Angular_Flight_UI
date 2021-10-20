import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const CUSTOMER_AUTH_API = 'http://localhost:8111/passengerapi/ticket';
@Injectable({
  providedIn: 'root'
})
export class PassengerserviceService {
   
  
  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
        })
    };
  username: any;
  constructor(private http:HttpClient) { }

addPassenger(firstName: any, lastName: any,seat: any, phone: any,email: any,flightid:any,  username : any,totalamount : any) : Observable<any>{
    return this.http.post<any>(CUSTOMER_AUTH_API + "/add",{
      firstName,
      lastName,
      seat,
      phone,
      email,
      flightid,      
      username,
      totalamount}, this.httpOptions);
 }

 getBookingHistory(){
  this.username = sessionStorage.getItem('username');
  return this.http.get<any>(CUSTOMER_AUTH_API+"/checkHistory/username/"+this.username,this.httpOptions)
 }
  
}
