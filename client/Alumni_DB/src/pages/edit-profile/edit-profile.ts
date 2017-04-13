import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Global } from '../../services/global/global';
import firebase from 'firebase';

/*
  Generated class for the EditProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html'
})

export class EditProfilePage {

  values: {};
  branchList: {}[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public global: Global) {
    console.log("PLACE 1.5");
    this.values = this.global.data;
    this.branchList = [];
    // this.namesList = ["abc", "def", "ghi"];
  }

  createLoading() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    return loading;
  }

  ionViewDidLoad() {
    console.log("Place 2");
    console.log('ionViewDidLoad EditProfilePage');
    this.values = this.global.data;
    console.log(this.values);
    var branchList = this.branchList;
    // var det = this.values.details;
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://127.0.0.1:8080/getBranchName", true);
    xhttp.onload = function() {
        var json = JSON.parse(xhttp.responseText);
        var names = [], branch = "";
        console.log(json);
        // rows = json.rows;
        if (json.rows.length > 0) {
          branch = json.rows[0].branch;
          names.push(json.rows[0].name);
        } else {
          if (json.curUser)
            branchList.push({branch: json.curUser.branch, names: [json.curUser.name]});
        }
        for (var i = 1; i < json.rows.length; i++) {
          if (json.rows[i-1].branch != json.rows[i].branch) {
            branchList.push({branch: branch, names: names});
            branch = json.rows[i].branch;
            names = [json.rows[i].name];
          } else {
            names.push(json.rows[i].name);
          }
        }
        branchList.push({branch: branch, names: names});
        console.log(branchList);
        // if (branch == "") {
        //     document.getElementById("branch").innerHTML += '<option selected disabled>Select Branch</option>';
        // }
        // if (json.rows.length > 0)
        //     document.getElementById("branch").innerHTML += '<option>' + json.rows[0].branch + '</option>';
        // for (var i = 1; i < json.rows.length; i++) {
        //     if (json.rows[i].branch != json.rows[i-1].branch) {
        //         if (branch == json.rows[i].branch)
        //             document.getElementById("branch").innerHTML += '<option selected>' + json.rows[i].branch + '</option>';
        //         else
        //             document.getElementById("branch").innerHTML += '<option>' + json.rows[i].branch + '</option>';
        //     }
        // }
    }
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send("{\"gEmail\":\""+this.global.data.details.gEmail+"\"}");
    if (this.global.data.details.old_face != '0') {
      var key = 'img0';
      document.getElementById(key).innerHTML = `<img src="` + this.global.data.details.old_face + `" id="` + key + `">`;
      this.global.data.details.file1 = this.global.data.details.old_face;
      document.getElementById(key + 'ip').style.visibility = 'hidden';
      document.getElementById(key + 'but').style.visibility = 'visible';
    }
    if (this.global.data.details.new_face != '0') {
      var key = 'img1';
      document.getElementById(key).innerHTML = `<img src="` + this.global.data.details.new_face + `" id="` + key + `">`;
      this.global.data.details.file2 = this.global.data.details.new_face;
      document.getElementById(key + 'ip').style.visibility = 'hidden';
      document.getElementById(key + 'but').style.visibility = 'visible';
    }
    if (this.global.data.details.familyPic1 != '0') {
      var key = 'img2';
      document.getElementById(key).innerHTML = `<img src="` + this.global.data.details.familyPic1 + `" id="` + key + `">`;
      this.global.data.details.file3 = this.global.data.details.familyPic1;
      document.getElementById(key + 'ip').style.visibility = 'hidden';
      document.getElementById(key + 'but').style.visibility = 'visible';
    }
    if (this.global.data.details.familyPic2 != '0') {
      var key = 'img3';
      document.getElementById(key).innerHTML = `<img src="` + this.global.data.details.familyPic2 + `" id="` + key + `">`;
      this.global.data.details.file4 = this.global.data.details.familyPic2;
      document.getElementById(key + 'ip').style.visibility = 'hidden';
      document.getElementById(key + 'but').style.visibility = 'visible';
    }
  }

  updateData() {
    console.log("HIHIHI");
    console.log(this.global.data);
    let loading = this.createLoading();
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://127.0.0.1:8080/register", true);
    xhttp.onload = function() {
      loading.dismiss();
    }
    xhttp.setRequestHeader('Content-Type', 'application/json');
    console.log("HIII");
    xhttp.send(JSON.stringify(this.global.data.details));
    // xhttp.send(this.global.data.details);
  }

  readFile(input, key) {
    var fileReader = new FileReader();
    var details = this.global.data.details;
    fileReader.onload = function(fileLoadedEvent) {
      switch(key) {
        case 'img0': details.file1 = this.result; break;
        case 'img1': details.file2 = this.result; break;
        case 'img2': details.file3 = this.result; break;
        case 'img3': details.file4 = this.result; break;
      }
      document.getElementById(key).innerHTML = `<img src="` + this.result + `" id="` + key + `">`;
    };
    var inputFile = (<HTMLInputElement>document.getElementById(key + 'ip')).files[0];
    if (inputFile) {
      document.getElementById(key + 'ip').style.visibility = 'hidden';
      document.getElementById(key + 'but').style.visibility = 'visible';
      fileReader.readAsDataURL(inputFile);
    }
  }

  removeFile(key) {
    switch(key) {
      case 'img0': this.global.data.details.file1 = undefined; break;
      case 'img1': this.global.data.details.file2 = undefined; break;
      case 'img2': this.global.data.details.file3 = undefined; break;
      case 'img3': this.global.data.details.file4 = undefined; break;
    }
    document.getElementById(key + 'but').style.visibility = 'hidden';
    document.getElementById(key + 'ip').style.visibility = 'visible';
    document.getElementById(key).innerHTML = "";
    (<HTMLInputElement>document.getElementById(key + 'ip')).value = "";
  }

}
