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
  constructor(public restService: RestService) { }

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('user')).user_id;

    this.restService.getOrders(user).subscribe((res: any) => {
      console.log(res.data)
      for (let i = 0; i < res.data.length; i++) {

        if (res.data[i].orders_title == "completed") {
          this.completed = res.data[i]
        }
      }
    })
  }
  async addReviewModal() {
    const modal = await this.restService.modalCtrl.create({
      component: ReviewPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
