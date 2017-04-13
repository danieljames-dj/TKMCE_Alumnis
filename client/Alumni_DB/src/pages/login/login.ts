import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { Global } from '../../services/global/global';
import firebase from 'firebase';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public global: Global) {}

  createLoading() {
  	let loading = this.loadingCtrl.create({
  		content: 'Please wait...'
  	});
  	loading.present();
  	return loading;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    let loading = this.createLoading();
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        loading.dismiss();
      } else {
        var glob = this.global;
        var nav = this.navCtrl;
        glob.user = user;
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "http://127.0.0.1:8080/getUser", true);
        xhttp.onload = function() {
            var json = JSON.parse(xhttp.responseText);
            if (json.success == true) {
              glob.data = json;
            } else {
              console.log(glob);
              glob.data.details.gEmail = glob.user.email;
              glob.data.details.gName = glob.user.displayName;
            }
            nav.setRoot(EditProfilePage);
            loading.dismiss();
        }
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send("{\"gEmail\":\""+user.email+"\"}");
      }
    });
  }

  signIn() {
  	let loading = this.createLoading();
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }

}