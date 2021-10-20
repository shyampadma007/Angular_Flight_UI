import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const FLIGHT_AUTH_API = 'http://localhost:8112/admin';


@Injectable({
  providedIn: 'root'
})
export class UserbookingserviceService {
  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
        })
    };
   public loginCheck: any;

  constructor(private http:HttpClient) { }

  getFlightList() : Observable<any>{
    return this.http.get<any>(FLIGHT_AUTH_API + "/listFlight", this.httpOptions);
  }

  getSpecificList(source:any,destination:any) : Observable<any>{
    return this.http.get<any>(FLIGHT_AUTH_API + "/flightsearch/list/source/"+source+"/destination/"+destination, this.httpOptions);    
  }

  getSingleList(flightid:any) : Observable<any>{
    return this.http.get<any>(FLIGHT_AUTH_API+"/flightsearch/flightid/"+flightid,this.httpOptions);
  }
 }
