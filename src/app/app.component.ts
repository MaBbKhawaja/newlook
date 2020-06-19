import { Component, OnInit } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { RestService } from './rest.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: '/home-screen',
      icon: 'home'
    }, 
    {
      title: 'Categories',
      url: '/category',
      icon: 'apps'
    },
    // {
    //   title: 'Cart',
    //   url: '/home',
    //   icon: 'cart'
    // },
    // {
    //   title: 'Appointments',
    //   url: '/appointments',
    //   icon: 'calendar'
    // },
    {
      title: 'Profile',
      url: '/profile',
      icon: 'person'
    },

  ];
  public user;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private restService: RestService,
    public menu: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user)
    if (!this.user) {
      this.restService.navCtrl.navigateRoot('/login')
    }
  }
  onLogout() {
    // localStorage.removeItem('user');
    localStorage.clear();
    this.restService.setData(null)
    this.restService.navCtrl.navigateForward('/login');
    this.menu.close();
  }
}
