import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Platform } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';

/**
 * Generated class for the AplicacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aplicacion',
  templateUrl: 'aplicacion.html',
})
export class AplicacionPage {

  usuario: string;
  email: string;

  cosas: string = "lindas";
  isAndroid: boolean = false;

  base64Image:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public alertCtrl: AlertController, platform: Platform, private camera: Camera) {

    this.isAndroid = platform.is('android');

    this.usuario = this.navParams.get('usuario');
    this.email = this.navParams.get('email');

    let loader = this.loadingCtrl.create({
      content: "Cargando...",
      duration: 1500
    });
    loader.present();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AplicacionPage');
  }

  sacarFoto() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }


  upload() {
    let storageRef = firebase.storage().ref();

    const filename = Math.floor(Date.now() / 1000);

    // Create a reference to 'images/todays-date.jpg'
    const imageRef = storageRef.child(`images/${filename}.jpg`);

    imageRef.putString(this.base64Image, firebase.storage.StringFormat.DATA_URL).then((snapshot)=> {
      this.showSuccesfulUploadAlert();
    });

  }

  showSuccesfulUploadAlert() {
    let alert = this.alertCtrl.create({
      title: 'Uploaded!',
      subTitle: 'Picture is uploaded to Firebase',
      buttons: ['OK']
    });
    alert.present();

    // clear the previous photo data in the variable
    this.base64Image = "";
  }

}
