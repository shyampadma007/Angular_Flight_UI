import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-modifyflight',
  templateUrl: './modifyflight.component.html',
  styleUrls: ['./modifyflight.component.css']
})
export class ModifyflightComponent implements OnInit {

  headers=["Flight Number","Flight Name","Source","Destination","Departure Time","Arrival Time","Total No of Seats","Price"];
  flightList: any[] = [];
  hideFlightTable = false;
  hideManageTable = false;
  update = false;
  flightid:any; 
  flightname:any; 
  source:any;
  destination : any;
  departuretime : any;
  arrivaltime : any; 
  seat :any;
  price : any; 
  mealtype:any;
  status:any;
  constructor(private adminService : AdminService,private router:Router) { }

  ngOnInit(): void {
    this.manageFlight();
  }

  manageFlight(){
    this.hideFlightTable = false;
    var temp: any[]; 
    this.adminService.getFlightList().subscribe(listdata => {
      console.log(listdata);
      /*listdata.forEach((ele: any) => {         
            temp.push(ele);        
        });*/
        this.flightList=listdata;
      });
    console.log("Display Add Flight Table = ",this.flightList);
    this.hideManageTable=true;
    console.log("manageFlight Method");
  }

  updateFlight(row: { flightid: any; flightname: any; source: any; destination: any; departuretime: any; arrivaltime: any; seat: any; price: any; mealtype: any; status: any; }){
    this.adminService.updatedata = row;
    this.adminService.updateFlag = true;
    this.router.navigate(['/admin/addflight']);
  }

  deleteFlight(deleteflightid : any){
    console.log(deleteflightid)
    this.adminService.deleteFlight(deleteflightid).subscribe(data => {
      console.log("Success");
      this.manageFlight();
    });

  }
}
