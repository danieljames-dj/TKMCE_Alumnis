import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Global } from '../../services/global/global';

/*
  Generated class for the ViewProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-view-profile',
  templateUrl: 'view-profile.html'
})
export class ViewProfilePage {

	values: {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public global: Global) {
  	this.values = this.global.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewProfilePage');
    this.values = this.global.data;
  }

}
