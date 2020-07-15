import { Component, OnInit } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { RestService } from './rest.service';
// import { FCM } from '@ionic-native/fcm/ngx';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';

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
      title: 'Book Appointment',
      url: '/category',
      icon: 'apps'
    },
    // {
    //   title: 'Cart',
    //   url: '/home',
    //   icon: 'cart'
    // },
    {
      title: 'Upcoming Appointments',
      url: '/upcoming',
      icon: 'calendar'
    },
    {
      title: 'History',
      url: '/history',
      icon: 'pricetag'
    },
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
    public menu: MenuController,
    private fcm: FCM
  ) {
    this.initializeApp();

    // PUSH NOTIFICATIONS START

    this.platform.ready()
      .then(() => {
        this.fcm.subscribeToTopic('all');

        this.fcm.getToken().then(token => {
          console.log(token)
          // alert(JSON.stringify(token))
          // backend.registerToken(token);
        });

        this.fcm.onNotification().subscribe(data => {
          if (data.wasTapped) {
            console.log("Received in background");
            // alert("MIRZA ANEES")

          } else {
            // alert("BAIG BARLAS")
            console.log("Received in foreground");
          };
        });

        this.fcm.onTokenRefresh().subscribe(token => {
          console.log(token)
          // backend.registerToken(token);
        });

        this.fcm.hasPermission().then(hasPermission => {
          if (hasPermission) {
            // alert("Has permission!");
          }
        })

        this.fcm.clearAllNotifications();

        this.fcm.unsubscribeFromTopic('all');

      })

    // PUSH NOTIFICATIONS ENDS

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
    this.restService.navCtrl.navigateRoot('/login');
    this.menu.close();
  }

  // push notifications
  subscribeToTopic() {
    this.fcm.subscribeToTopic('enappd');
  }
  getToken() {
    this.fcm.getToken().then(token => {
      // Register your new token in your back-end if you want
      // backend.registerToken(token);
    });
  }
  unsubscribeFromTopic() {
    this.fcm.unsubscribeFromTopic('enappd');
  }

}
