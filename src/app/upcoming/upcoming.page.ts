import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { CancelAppointmentPage } from '../cancel-appointment/cancel-appointment.page';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.page.html',
  styleUrls: ['./upcoming.page.scss'],
})
export class UpcomingPage implements OnInit {
  upcoming;
  user;
  constructor(public restService: RestService) { }
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user')).user_id;

    this.restService.getOrders(this.user).subscribe((res: any) => {
      console.log(res.data)
      for (let i = 0; i < res.data.length; i++) {

        if (res.data[i].orders_title == "Upcoming") {
          this.upcoming = res.data[i]
        }
      }
    })
  }

  async onCancelAppointment(orderId) {
    const modal = await this.restService.modalCtrl.create({
      component: CancelAppointmentPage,
      componentProps: {
        'userId': this.user,
        'orderId': orderId
      }
    });

    modal.onDidDismiss()
      .then(() => {
        this.upcoming = null;
        this.ngOnInit();
      });
    return await modal.present();
  }

  services(services){
    return services.split(',');
  }

}
