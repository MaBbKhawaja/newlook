import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  constructor(public restService: RestService) { }

  ngOnInit() {
  }

  onCategorySelect(value) {

    localStorage.setItem('orderType', value)
    this.restService.navCtrl.navigateForward('/home');
  }

}
