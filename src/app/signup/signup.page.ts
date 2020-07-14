import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  name;
  email;
  password;
  age;
  address;
  mobile;
  gender = "female";
  constructor(public menu: MenuController, public restService: RestService) {
    this.menu.swipeGesture(false)
  }
  ngOnInit() {
  }

  onSignUp() {
    console.log(this.age)

    if (!this.name) {
      this.restService.toastMessage('Enter Name')
      return;
    }
    if (!this.email) {
      this.restService.toastMessage('Enter Email')
      return;
    }
    if (!this.password) {
      this.restService.toastMessage('Enter Password')
      return;
    }
    if (!this.age) {
      this.restService.toastMessage('Enter Age')
      return;
    }
    if (!this.address) {
      this.restService.toastMessage('Enter Address')
      return;
    }
    if (!this.mobile) {
      this.restService.toastMessage('Enter Mobile')
      return;
    }
    if (this.age) {
      this.age=this.age.split('T',1)[0]
    }
    this.restService.signUp(this.name, this.email, this.password, this.age, this.address, this.mobile, this.gender).subscribe((res: any) => {
      if (res.status == 200 && res.data.user_id) {
        this.restService.toastMessage('Sign up successful.')
        this.restService.navCtrl.navigateForward('/login');
        this.restService.toastMessage(res.message)
      } else {
        this.restService.toastMessage(res.message)
      }
    })
    // .catch(err => {
    //   console.log(err)
    //   this.restService.toastMessage('Internal server error.')
    // })
  }

  onSignIn() {
    this.restService.navCtrl.navigateForward('/login');
  }

}
