import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginserviceService } from 'src/app/service/loginservice.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private logoutservice : LoginserviceService) { }

  ngOnInit(): void {
    this.logOut();
  }

  logOut(){
    this.logoutservice.logOut();
  }
}
