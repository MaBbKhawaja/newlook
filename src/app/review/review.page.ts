import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {
  review;
  rate = 0;
  constructor(public restService: RestService) { }

  @Input() orderId: string;
  @Input() userId: string;
  ngOnInit() {
  }
  onSubmit() {
    console.log(this.review)
    if (!this.review || this.rate==0) {
      this.restService.toastMessage("Add review and comment")
      return;
    }
    this.restService.postReview(this.userId, this.orderId, this.review, this.rate).subscribe((res: any) => {
      if (res.status==200) {
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
  onRate(rate) {
    console.log(rate)
    this.rate = rate;
  }

}
