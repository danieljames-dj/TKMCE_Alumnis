import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { ViewProfilePage } from '../pages/view-profile/view-profile';
import { PeoplePage } from '../pages/people/people';
import { AdminPage } from '../pages/admin/admin';
import { LoginPage } from '../pages/login/login';
import { Global } from '../services/global/global';
import { ProfileGuestPage } from '../pages/profile-guest/profile-guest';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    EditProfilePage,
    ViewProfilePage,
    PeoplePage,
    AdminPage,
    LoginPage,
    ProfileGuestPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EditProfilePage,
    ViewProfilePage,
    PeoplePage,
    AdminPage,
    LoginPage,
    ProfileGuestPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Global,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
