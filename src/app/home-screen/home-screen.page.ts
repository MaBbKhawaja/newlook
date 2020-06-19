import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.page.html',
  styleUrls: ['./home-screen.page.scss'],
})
export class HomeScreenPage implements OnInit {
  user;
  loyaltyPoints;
  subscribe: any;
  constructor(public restService: RestService) {
    this.subscribe = this.restService.platform.backButton.subscribeWithPriority(66666, () => {
      if (this.constructor.name == "LoginPage") {
        if (window.confirm("You want to exit ?")) {
          navigator["app"].exitApp();
        }
      }
    })
    
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user)
    if (!this.user) {
      this.restService.navCtrl.navigateRoot('/login')
    }
    this.restService.getLoyaltyPoints(this.user.user_id).subscribe((res: any) => {
      this.loyaltyPoints = res.data.points
    })

  }
  onAppointmentSelect() {
    this.restService.navCtrl.navigateForward('/category');
  }
  onHistorySelect() {
    this.restService.navCtrl.navigateForward('/history');

  }
  onUpcomingSelect() {
    this.restService.navCtrl.navigateForward('/upcoming');

  }
}
