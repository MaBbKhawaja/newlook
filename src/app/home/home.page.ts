import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ListPage } from '../list/list.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  data;
  user;
  constructor(public restService: RestService, public router: Router) {
    this.restService.getAllData().subscribe((res: any) => {
      this.data = res.data;
      for (let i = 0; i < this.data.length; i++) {
        for (let j = 0; j < this.data[i].services.length; j++) {
          this.data[i].services[j].selected = false
        }
      }
      this.restService.setData(this.data);
    })
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user)
    if (!this.user) {
      this.restService.navCtrl.navigateRoot('/login')
    }

  }
  onCategorySelect(data) {
    console.log(data.category_id);
    this.restService.navCtrl.navigateForward(['/list', data.category_id]);
  }

}
