import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AplicacionPage } from '../aplicacion/aplicacion';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  usuario: string = "";
  email: string = "";
  pass: string;

  pass1: string = "";
  pass2: string = "";

  esUsuario: boolean = true;

  usuarios: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, db: AngularFireDatabase, ) {
    this.usuarios = db.list('/usuarios');
    console.log(this.usuarios);
  }
  login() {
    this.usuarios.forEach(element => {
      for (var i = 0; i < 5; i++) {
        if (element[i].nombre == this.usuario && element[i].clave == this.pass) {
          //SE ENCONTRO USUARIO

          //Redirijo a la pagina correspondiente
          this.navCtrl.push(AplicacionPage, { "usuario": this.usuario, "email": this.email });
          return;
        }
      }
      //NO SE ENCONTRO USUARIO
      let alert = this.alertCtrl.create({
        title: 'No se encontro el usuario',
        subTitle: 'Usuario o contraseña incorrectos, por favor verifique!',
        buttons: ['OK']
      });
      alert.present();
    })
    /*VERIFICACION FICTICIA
    if (this.usuario == "admin" && this.pass == "admin") {
      let alert = this.alertCtrl.create({
        title: 'Usuario valido!' + this.usuario,
        subTitle: 'Bienvenido a la aplicacion!',
        buttons: ['OK']
      });
      alert.present();
      this.navCtrl.push(AplicacionPage, { "usuario": this.usuario, "pass": this.pass });

    }
    else {
      let alert = this.alertCtrl.create({
        title: 'Usuario no valido!',
        subTitle: 'Por favor registrese',
        buttons: ['NO']
      });
      alert.present();
      this.usuario = "";
      this.email = "";
      this.pass = "";
    }*/
  }

  registrar() {
    console.log(this.usuario, this.email, this.pass1, this.pass2);

    this.usuarios.forEach(element => {
      for (var i = 0; i < 5; i++) {
        if (element[i].nombre == this.usuario) {
          //USUARIO REPETIDO
          let alert = this.alertCtrl.create({
            title: 'Usuario Repetido',
            subTitle: 'Por favor seleccione otro nombre de usuario para ingresar al sistema',
            buttons: ['OK']
          });
          alert.present();
          this.usuario = "";
          return;
        }
      }
      //CONTRASEÑAS NO IDENTICAS
      if (this.pass1 != this.pass2) {
        let alert = this.alertCtrl.create({
          title: 'Error en la contraseña',
          subTitle: 'Las contraseñas ingresadas no son iguales, por favor vuelva a ingresarlas',
          buttons: ['OK']
        });
        alert.present();
        this.pass1 = "";
        this.pass2 = "";
        return;
      }
      //CAMPOS VACIOS
      if (this.usuario == "" || this.email == "" || this.pass1 == "" || this.pass2 == "") {
        let alert = this.alertCtrl.create({
          title: 'Campos vacios',
          subTitle: 'Por favor complete la totalidad de los campos a fin de poder registrarse',
          buttons: ['OK']
        });
        alert.present();
        return;
      }
      //VERIFICACIONES CUMPLIDAS
      this.usuarios.push({
        $key: this.usuario,
        clave: this.pass1,
      })

    })
  }
}
