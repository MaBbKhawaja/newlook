import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {
  review;
  constructor(public restService: RestService) { }

  ngOnInit() {
  }
  onSubmit() {
    console.log(this.review)
    this.dismiss();
  }
  dismiss() {
    this.restService.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
