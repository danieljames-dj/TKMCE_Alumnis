import { Injectable } from '@angular/core';
import { LoginPage } from '../pages/login/login';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Global } from '../../services/global/global';

@Injectable()
export class LogOut {

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public global: Global) {}

  public signOut() {
  	firebase.auth().signOut();
  	this.navCtrl.setRoot(LoginPage);
  	console.log("HI");
  }
}