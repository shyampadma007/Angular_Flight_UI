import { Component, OnInit } from '@angular/core';
import { UserbookingserviceService } from 'src/app/service/userbookingservice.service';
import { AdminService } from 'src/app/service/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userbooking',
  templateUrl: './userbooking.component.html',
  styleUrls: ['./userbooking.component.css']
})
export class UserbookingComponent implements OnInit {

  user : any;
  source : any;
  destination : any;
  departuretime : any;
  noofseats : any;
  listRecords = false;
  bookingRecords = false;
  headers = [ "Flight Name", "Depature Time", "Arrival Time", "Price"];
  cityValue = ["Coimbatore", "Chennai","Bangalore","Cochin","Hyderabad","Mumbai","Delhi"];
  flightList : any;
  constructor(private bookingService: UserbookingserviceService,private router:Router) { }

  ngOnInit(): void {
    this.user = this.bookingService.loginCheck;
    this.onLoad();
  }

  onLoad(){
    this.bookingService.getFlightList().subscribe(listdata => {
      this.flightList = listdata;
    });
  }
  onSubmit(searchFlight : any) {    
    console.log(searchFlight.value['source']);
    console.log(searchFlight.value['destination']);
    alert(searchFlight.value.source);
    alert(searchFlight.value.destination);
    if(searchFlight.value.source == searchFlight.value.destination){
      alert("Both Source and Destination are same. Please choose differ");
      return;
    }
    this.source = searchFlight.value.source;
    this.destination = searchFlight.value.destination;
    this.bookingService.getSpecificList(searchFlight.value['source'],searchFlight.value['destination']).subscribe(listdata => {
       this.flightList = listdata;

       console.log(this.flightList);
    });

    /*this.bookingService.getFlightList(searchFlight).subscribe(listdata => {
      console.log(listdata);*/
      /*listdata.forEach((ele: any) => {         
            temp.push(ele);        
        });
        this.flightList=listdata;
      });
    console.log("Display Add Flight Table = ",this.flightList);
    this.hideManageTable=true;
    console.log("manageFlight Method");*/
    /*});*/
  }

  
  bookTicket(flightid : any,cost : any){
    console.log(flightid);
    sessionStorage.setItem('flightid',flightid);
    sessionStorage.setItem('cost',cost);
    this.router.navigate(['/booking/'+flightid]);
    

}

}
