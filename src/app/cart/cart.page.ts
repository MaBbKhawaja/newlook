import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  date;
  time;
  cartItems = [];
  allCategoriesData;
  totalPrice = 0;
  orderType;
  constructor(public restService: RestService) { }

  ngOnInit() {
    this.time = localStorage.getItem('time')
    this.date = localStorage.getItem('date')
    if (localStorage.getItem('orderType') == 'salon') {
      this.orderType = "Salon Services"
    }
    else {
      this.orderType = "Home Services"
    }
    this.cartItems = JSON.parse(localStorage.getItem('cart'))
    this.allCategoriesData = this.restService.getData()
    this.getTotalPrice();
  }
  onDeleteCartItem(item, index) {
    console.log(item)
    this.cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cartItems))

    for (let i = 0; i < this.allCategoriesData.length; i++) {
      for (let j = 0; j < this.allCategoriesData[i].services.length; j++) {
        if (this.allCategoriesData[i].services[j].service_id == item.service_id) {
          this.allCategoriesData[i].services[j].selected = false
        }
      }
    }
    this.getTotalPrice();

  }

  onMoreServices() {
    this.restService.navCtrl.navigateForward('/home')
  }

  onPlaceBooking() {

    if (this.cartItems.length < 1) {
      this.restService.toastMessage("Please select atleast one service.")
      return;
    }

    let services = "";
    for (let i = 0; i < this.cartItems.length; i++) {
      services = this.cartItems[i].service_id + ',' + services
    }

    let user = JSON.parse(localStorage.getItem('user')).user_id;
    let orderType = localStorage.getItem('orderType')

    console.log(services)
    let object = {
      user_id: user,
      services_id: services,
      date: this.date,
      time: this.time,
      order_type: orderType
    }

    this.restService.bookAppointment(object).subscribe((res: any) => {
      console.log(res)
      if (res.status == 200) {
        this.restService.toastMessage(res.message);
        localStorage.removeItem('cart')
        localStorage.removeItem('date')
        localStorage.removeItem('time')
        this.restService.setData(null)
        this.restService.navCtrl.navigateRoot('/home-screen')
      }
      else {
        this.restService.toastMessage(res.message)
      }
    })
  }
  getTotalPrice() {
    this.totalPrice = 0;
    if (this.cartItems.length < 0) {
      return
    }
    for (let i = 0; i < this.cartItems.length; i++) {

      this.totalPrice = parseInt(this.cartItems[i].price) + this.totalPrice
      console.log(this.cartItems[i].price)
    }
  }

  onDateEdit() {
    this.restService.navCtrl.navigateForward('/schedule');
  }

}
