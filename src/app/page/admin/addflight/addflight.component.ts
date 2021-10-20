import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { AuthService } from 'src/app/service/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addflight',
  templateUrl: './addflight.component.html',
  styleUrls: ['./addflight.component.css']
})
export class AddflightComponent implements OnInit {

  public hideFlightTable = false;
  public hideManageTable = false;
  isSuccessful = false;
  private check = false;
  //flightList= any[];
  airlineList : any;
  cityList : any;
  mealList : any;
  headers=["Flight Number","Flight Name","Source","Destination","Departure Time","Arrival Time","Total No of Seats","Price","Meal Type","Flight Date","Status"];
  flightid: any;
  flightname : any;
  source : any;
  destination : any;
  departuretime: any;
  arrivaltime:any;
  seat:any;
  available:any;
  price:any;
  mealtype:any;
  flightdate:any;
  status:any;
  statusList:any;
  responseFlightString = '';
  date1: Date = new Date();
  constructor(private adminService : AdminService,private authser : AuthService,private router:Router) { 
    this.airlineList= ["Jet Airways", "Indigo", "Air India","King Fisher", "Spice Jet", "Air Asia"];
    this.cityList=["Coimbatore", "Chennai","Bangalore","Cochin","Hyderabad","Mumbai","Delhi"]; 
    this.mealList=['VEG', 'Non-VEG', 'BOTH'];
    this.statusList=["Available","Blocked"];
    this.authser.loginCheck = false;
  }

  ngOnInit(): void {
    if(this.adminService.updateFlag){
      this.flightid = this.adminService.updatedata.flightid;
      this.flightname = this.adminService.updatedata.flightname;
      this.source = this.adminService.updatedata.source;
      this.destination = this.adminService.updatedata.destination;
      this.arrivaltime = this.adminService.updatedata.arrivaltime;
      this.departuretime = this.adminService.updatedata.departuretime;
      this.seat = this.adminService.updatedata.seat;
      this.price = this.adminService.updatedata.price;
      this.mealtype = this.adminService.updatedata.mealtype;
      this.status = this.adminService.updatedata.status;
    }
  }

  addFlight(){
    this.hideFlightTable = true;
    this.hideManageTable=false;
  }

  saveFlight(flightForm : any){

    

    if(flightForm.value.source == flightForm.value.destination){
      alert("Both Source and Destination is Same. Please choose other option");
      return;
    }else if(new Date(flightForm.value.departuretime).getTime() < this.date1.getTime()){
      alert("Departure Time Should not be less than current Date");
      return;
    }else if(new Date(flightForm.value.arrivaltime).getTime() < this.date1.getTime()){
      alert("Arrival Time Should not be less than current Date");
      return;
    }else if((new Date(flightForm.value.departuretime).getTime()) >= (new Date(flightForm.value.arrivaltime).getTime())){
      alert("Arrival Time should be greater than Departure Time");
      return;
    }else{

      if(this.adminService.updateFlag){
        console.log(flightForm.value);
    if(this.check=true){
      flightForm.value.flightid=this.flightid;
    }   
    this.adminService.updateFlight(flightForm.value).subscribe(
      res =>{
        debugger;
      this.isSuccessful = true;
      this.router.navigate(['/admin/modifyflight']);
      console.log(res);      
     },err => {
      this.responseFlightString = err.error.text;
      this.isSuccessful = true;
      this.router.navigate(['/admin/modifyflight']);
      debugger;
      console.log(err.error.text);
     }); 
    this.hideFlightTable = false;
    this.check=false;
    flightForm.reset();
      }else{
    console.log(flightForm.value);
    if(this.check=true){
      flightForm.value.flightid=this.flightid;
    }   
    //var saveData = this.adminService.saveFlight(flightForm.value);
    this.adminService.saveFlight(flightForm.value).subscribe(
      res =>{
        debugger;
    /*alert(12345);
    forkJoin(saveData).subscribe(res=>{*/
      this.isSuccessful = true;
      console.log(res);      
     },err => {
      this.responseFlightString = err.error.text;
      this.isSuccessful = true;
      debugger;
      console.log(err.error.text);
     }); 
    this.hideFlightTable = false;
    this.check=false;
    flightForm.reset();
  }
}
}
}
