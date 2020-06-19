import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-cancel-appointment',
  templateUrl: './cancel-appointment.page.html',
  styleUrls: ['./cancel-appointment.page.scss'],
})
export class CancelAppointmentPage implements OnInit {
  reason = "";
  @Input() orderId: string;
  @Input() userId: string;
  constructor(public restService: RestService) { }

  ngOnInit() {
  }
  onSubmit() {
    console.log(this.reason)
    this.dismiss();
  }
  dismiss() {
    this.restService.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
