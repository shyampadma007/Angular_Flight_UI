import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PassengerserviceService } from 'src/app/service/passengerservice.service';
import { UserbookingserviceService } from 'src/app/service/userbookingservice.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  flightidList : any;
  passengerList : any;

  firstName : any;
  lastName : any;
  seat : any;
  phone : any;
  email : any;
  flightid : any;
  price:any;
  travellerList: Array<any> = [];
  customerCheck = false;
  username: any;
  storageFlightList : any;
  totalamount : any;
  travellerDetails : any;

  constructor(private router:Router, private activatedRoute : ActivatedRoute,private userService: UserbookingserviceService,private passengerservice:PassengerserviceService) { }

  ngOnInit(): void {

    this.username = sessionStorage.getItem('username');
    console.log(this.username);
    this.activatedRoute.paramMap.subscribe(params => {
      var id1 = params.get('id1');
      this.onLoad(id1);
      this.price = this.flightidList.price;
      console.log(this.price);
      console.log(this.flightidList);
      //localStorage.setItem('flightid',id1);
    });

  
  }

  onLoad(id1 : any){

    this.storageFlightList = sessionStorage.getItem('username');
    this.userService.getSingleList(id1).subscribe(flightidList => {
      console.log("TEST");
      this.flightidList = flightidList;
      
    });
  }

  addPassenger(bookingForm : any){
    /*console.log(bookingForm.value.email);
    console.log(bookingForm.value);
    var flightid = localStorage.getItem(this.flightid);
    console.log(flightid);
    this.passengerservice.addPassenger(bookingForm.value.firstName,bookingForm.value.lastName,bookingForm.value.email,bookingForm.value.flightId,bookingForm.value.seat,bookingForm.value.phone).subscribe(passengerList => {
      this.passengerList = passengerList;
    });*/
    this.price = sessionStorage.getItem('cost');
    this.username = sessionStorage.getItem('username');
    this.flightid = sessionStorage.getItem('flightid');
    this.totalamount = (this.price) * (bookingForm.value.seat);
    bookingForm.value.flightid = this.flightid;
    bookingForm.value.username = this.username;
    bookingForm.value.totalamount = this.totalamount;
    this.travellerList.push(bookingForm.value);
    console.log(this.travellerList);
    localStorage.setItem('travellerDetails', JSON.stringify(this.travellerList));
    this.customerCheck = true;
  }


  confirmBooking(){
    this.username = sessionStorage.getItem('username');
    this.flightid = sessionStorage.getItem('flightid');
    console.log(this.username + "ONE");
    console.log(this.flightid + "two");
    console.log(this.travellerList);
    this.travellerDetails = localStorage.getItem('travellerDetails');
    console.log(this.travellerList[0]['firstName']);
    console.log(this.travellerDetails.seat);
    console.log(this.travellerDetails);
    this.passengerservice.addPassenger(this.travellerList[0]['firstName'],this.travellerList[0]['lastName'],this.travellerList[0]['seat'],this.travellerList[0]['phone'],this.travellerList[0]['email'],this.travellerList[0]['flightid'],this.travellerList[0]['username'],this.travellerList[0]['totalamount']).subscribe(passengerList => {
      this.passengerList = passengerList;
      console.log("1");
      console.log(passengerList);
      if(this.passengerList=='Success'){
        this.router.navigate(['/history']);
      }
    },
      error => {
        console.log("2");
        console.log(error.error.text);
        if(error.error.text == 'Success'){
          this.router.navigate(['/history']);
        }
    });
  }
}
