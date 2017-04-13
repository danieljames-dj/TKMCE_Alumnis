import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Global } from '../../services/global/global';
import { ProfileGuestPage } from '../../pages/profile-guest/profile-guest';

/*
  Generated class for the People page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-people',
  templateUrl: 'people.html'
})
export class PeoplePage {

	values: [{}];
	profilePage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public global: Global) {
  	this.values = [{}];
  	this.profilePage = ProfileGuestPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PeoplePage');
    var valuesCache = this.values;
  	// console.log(this.values);
  	console.log(valuesCache);
  	var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://127.0.0.1:8080/getApproved", true);
    xhttp.onload = function() {
    	var json = JSON.parse(xhttp.responseText);
    	valuesCache.pop();
    	for (var i = 0; i < json.rows.length; i++) {
    		valuesCache.push(json.rows[i]);
    	}
    	console.log(valuesCache);
    }
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send();
  }

  viewProfile(gEmail) {
  	console.log("View Profile");
  	console.log(gEmail);
  	var global = this.global;
  	var nav = this.navCtrl;
  	var profilePage = this.profilePage;
  	var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://127.0.0.1:8080/getUser", true);
    xhttp.onload = function() {
    	var json = JSON.parse(xhttp.responseText);
    	if (json.success == true) {
    		global.guest = json.details;
    		console.log(global.guest);
    		nav.push(profilePage);
    	}
    }
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send("{\"gEmail\":\""+gEmail+"\"}");
  }

}
