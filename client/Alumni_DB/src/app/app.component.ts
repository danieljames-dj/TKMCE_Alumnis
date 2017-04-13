import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { ViewProfilePage } from '../pages/view-profile/view-profile';
import { PeoplePage } from '../pages/people/people';
import { AdminPage } from '../pages/admin/admin';
import { LoginPage } from '../pages/login/login';
import { Global } from '../services/global/global';
import firebase from 'firebase';

export const firebaseConfig = {
  apiKey: "AIzaSyCRKxj34MiRQi7e9FScfihBSad5UtZJUSI",
  authDomain: "alumni-db-6e39d.firebaseapp.com",
  databaseURL: "https://alumni-db-6e39d.firebaseio.com",
  storageBucket: "alumni-db-6e39d.appspot.com",
  messagingSenderId: "137713721954"
};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public global: Global) {
    firebase.initializeApp(firebaseConfig);
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Edit Profile', component: EditProfilePage },
      { title: 'View Profile', component: ViewProfilePage },
      { title: 'People', component: PeoplePage },
      { title: 'Admin', component: AdminPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // firebase.initializeApp(firebaseConfig);
      // this.global.firebase = firebase;
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    console.log("AAAAAA");
    console.log(page);
    switch (page.title) {
      case 'Edit Profile':
      case 'View Profile':
        this.nav.setRoot(page.component);
        break;
      case 'People':
        if (this.global.data.details.status == 0) {
          alert("Access Denied");
        } else {
          this.nav.setRoot(page.component);
        }
        break;
      case 'Admin':
        if (this.global.data.details.gEmail == 'djdany444@gmail.com' || this.global.data.details.gEmail == 'jameskuttythomas@gmail.com') {
          this.nav.setRoot(page.component);
        } else {
          alert("Access Denied");
        }
        break;
    }
  }

  logOut() {
    var navCache = this.nav;
    firebase.auth().signOut().then(function() {
      navCache.setRoot(LoginPage);
    });
  }
}
