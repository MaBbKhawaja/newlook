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
    if (!this.reason) {
      this.restService.toastMessage("Add a reason to cancel appointment")
      return;
    }
    this.restService.cancelAppointment(this.userId, this.orderId, this.reason).subscribe((res: any) => {
      if (res.status == 200) {
        this.dismiss();
      }
      this.restService.toastMessage(res.message)
    })
  }
  dismiss() {
    this.restService.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
