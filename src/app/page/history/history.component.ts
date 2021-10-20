import { Component, OnInit } from '@angular/core';
import { PassengerserviceService } from 'src/app/service/passengerservice.service';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  bookingHistory:any;
  username:any;
  constructor(private passengerservice:PassengerserviceService) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
    this.passengerservice.getBookingHistory().subscribe(data => {
      this.bookingHistory = data;
      console.log(this.bookingHistory);
    })
  }

  openPDF(){
    //window.print();
    let DATA = document.getElementById('historyList') as HTMLElement;
    //let DATA1 = document.getElementById('historyList') as HTMLElement;
    html2canvas(DATA).then(canvas => {
      let fileWidth = 208;
      let fileHeight = canvas.height * fileWidth / canvas.width;

      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
      PDF.save('Booking-details.pdf');
    })
  }

}
