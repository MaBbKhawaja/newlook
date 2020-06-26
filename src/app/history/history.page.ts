import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ReviewPage } from '../review/review.page';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  completed;
  user;

  constructor(public restService: RestService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user')).user_id;

    this.restService.getOrders(this.user).subscribe((res: any) => {
      console.log(res.data)
      for (let i = 0; i < res.data.length; i++) {

        if (res.data[i].orders_title == "completed") {
          this.completed = res.data[i]
        }
      }
      this.restService.toastMessage(res.message)
    })
  }
  async addReviewModal(orderId) {
    const modal = await this.restService.modalCtrl.create({
      component: ReviewPage,
      componentProps: {
        'userId': this.user,
        'orderId': orderId
      }
    });

    modal.onDidDismiss()
      .then(() => {
        this.completed=null;
        this.ngOnInit();
      });

    return await modal.present();
  }

  services(services){
    return services.split(',');
  }

}
