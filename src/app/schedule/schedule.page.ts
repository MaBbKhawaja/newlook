import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  schedules;
  time;
  selectedTimeIndex = 0;
  selectedDateIndex = 0;
  selectedDate;
  selectedTime;
  constructor(public restService: RestService) {
  }

  ngOnInit() {
    this.restService.getSchedules().subscribe((res: any) => {
      this.schedules = res.data;
      this.onSelectDate(this.schedules[0]);
    })
  }
  onSelectDate(item) {
    this.time = item.time.split(',');
    this.selectedDate = item.date;
    this.selectedTime = this.time[0];
  }
  selectedTimeProperties(time) {
    this.selectedTime = time;
  }
  onBookAppointment() {
    localStorage.setItem('date', this.selectedDate);
    localStorage.setItem('time', this.selectedTime);
    this.restService.navCtrl.navigateForward('/cart');
  }

}
