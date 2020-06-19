import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  selectedCategory = null;
  categoryId;
  allCategoriesData;
  cart=[]
  constructor(public restService: RestService, public route: ActivatedRoute) {

  }

  ngOnInit() {
    this.categoryId = this.route.snapshot.paramMap.get('id')
    this.allCategoriesData = this.restService.getData();
    if (!this.allCategoriesData) {
      this.restService.navCtrl.navigateBack('/home')
    }
    for (let i = 0; i < this.allCategoriesData.length; i++) {
      if (this.categoryId == this.allCategoriesData[i].category_id) {
        console.log(this.allCategoriesData[i])
        this.selectedCategory = this.allCategoriesData[i];
      }

    }

    if (!this.selectedCategory) {
      this.restService.navCtrl.navigateBack('/home')
    }
  }

  onCategorySelect(data) {
    for (let i = 0; i < this.allCategoriesData.length; i++) {
      if (this.allCategoriesData[i].category_id == this.categoryId) {
        for (let j = 0; j < this.allCategoriesData[i].services.length; j++) {
          if (this.allCategoriesData[i].services[j].service_id == data.service_id && data.selected==false) {

            this.allCategoriesData[i].services[j].selected = true;
            this.selectedCategory = this.allCategoriesData[i];
            
          }
          else 
          if (this.allCategoriesData[i].services[j].service_id == data.service_id && data.selected==true) {

            this.allCategoriesData[i].services[j].selected = false;
            this.selectedCategory = this.allCategoriesData[i];
            
          }
          
        }
      }
    }

    console.log(this.selectedCategory)

  }

  checkCart(data) {
      if (data.selected == true) {
        return "item-custom ion-padding-horizontal selected";
      }
      else {
        return "item-custom ion-padding-horizontal unselected";
      }

  }

  onSelectSchedules(){
    for (let i = 0; i < this.allCategoriesData.length; i++) {
      for (let j = 0; j < this.allCategoriesData[i].services.length; j++) {
        if(this.allCategoriesData[i].services[j].selected==true){
          this.cart.push(this.allCategoriesData[i].services[j])
        }
      }
    }
    if (this.cart.length<1) {
      this.restService.toastMessage("Please select atleast one service.")
    }
    else{
      localStorage.setItem('cart',JSON.stringify(this.cart))
      this.restService.navCtrl.navigateForward('/schedule')
    }
  }
  onMoreServices(){
    this.restService.navCtrl.navigateForward('/home')
  }

}
