import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email;
  password;
  subscribe: any;
  constructor(public menu: MenuController, public restService: RestService) {
    this.menu.swipeGesture(false)
    this.subscribe = this.restService.platform.backButton.subscribeWithPriority(66666, () => {
      if (this.constructor.name == "LoginPage") {
        if (window.confirm("You want to exit ?")) {
          navigator["app"].exitApp();
        }
      }
    })
  }

  ngOnInit() {
  }
  
  onSignIn() {
    if (!this.email) {
      this.restService.toastMessage('Enter Email')
      return;
    }
    if (!this.password) {
      this.restService.toastMessage('Enter Password')
      return;
    }
    this.restService.signIn(this.email, this.password).subscribe((res: any) => {
      if (res.data.user_id) {
        localStorage.setItem("user", JSON.stringify(res.data))
        this.restService.navCtrl.navigateForward('/home');
      } else {
        this.restService.toastMessage('Internal server error.')
      }
    })
    // .catch(err => {
    //   console.log(err)
    //   this.restService.toastMessage('Internal server error.')
    // })
  }

  onSignUp(){
    this.restService.navCtrl.navigateForward('/signup');
  }

}
