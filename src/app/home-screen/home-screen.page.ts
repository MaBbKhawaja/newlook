import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.page.html',
  styleUrls: ['./home-screen.page.scss'],
})
export class HomeScreenPage implements OnInit {
  user;
  loyaltyPoints;
  subscribe: any;
  constructor(public restService: RestService, public route: ActivatedRoute) {
    // console.log(this.route)
  }

  ionViewWillEnter() {
    this.subscribe = this.restService.platform.backButton.
    subscribeWithPriority(66666, () => {
      if (this.constructor.name == "HomeScreenPage" && this.restService) {
        if (window.confirm("You want to exit ?")) {
          navigator["app"].exitApp();
        }
      }
    })

  }
  ionViewWillLeave() {
    this.subscribe.unsubscribe();
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user)
    if (!this.user) {
      this.restService.navCtrl.navigateRoot('/login')
    }
    this.restService.getLoyaltyPoints(this.user.user_id).subscribe((res: any) => {
      this.loyaltyPoints = res.data.points
      // this.restService.toastMessage(res.message)
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
