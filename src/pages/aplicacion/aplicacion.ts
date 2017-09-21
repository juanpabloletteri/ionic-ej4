import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {

    this.usuario = this.navParams.get('usuario');
    this.email = this.navParams.get('email');

    let loader = this.loadingCtrl.create({
      content: "Cargando...",
      duration: 2500
    });
    loader.present();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AplicacionPage');
  }

}
