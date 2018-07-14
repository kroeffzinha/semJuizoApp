import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
import { ForgotPage } from '../forgot/forgot';

import { Users } from './users';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tabBarElement: any;
  users: Users = new Users();

  @ViewChild('usuario') email;
  @ViewChild('senha') password;

  constructor(public navCtrl: NavController, 
              public toastCtrl: ToastController, 
              public fire: AngularFireAuth) {

    this.tabBarElement = document.querySelector('.show-tabbar');
  }

  //ocultando o nav tabs antes de iniciar
  ngAfterViewInit() {
    let tabs = document.querySelectorAll('.show-tabbar');
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.display = "none";
      });
    }
  }

  //ocultando o nav tabs depois de sair
  ionViewWillLeave() {
    let tabs = document.querySelectorAll('.show-tabbar');
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.display = "none";
      });
    }
  }

  entrar() {
    let toast = this.toastCtrl.create({ duration: 2000, position: 'bottom' });

    this.fire.auth.signInWithEmailAndPassword(this.email.value, this.password.value)
    .then(data => {
      //casos de sucesso
      this.users.email = this.email.value;
      this.users.senha = this.password.value;
      this.navCtrl.setRoot(TabsPage);
    })
    .catch((error: any) => {
      //casos de erro
      if (error.code == "auth/invalid-email") {
        toast.setMessage("E-mail inválido.");
      } else
        if (error.code == "auth/user-disabled") {
        toast.setMessage("Esse usuário foi desabilitado.");
      } else
        if  (error.code == "auth/user-not-found") {
        toast.setMessage("Usuário não encontrado.");
      } else
        if  (error.code == "auth/wrong-password") {
        toast.setMessage("Senha errada.");
      }
      toast.present();
    });
  }

  entrarVisitante() {
    let toast = this.toastCtrl.create({ duration: 2000, position: 'bottom' });

    this.fire.auth.signInAnonymously()
    .then(data => {
      //casos de sucesso
      console.log(data);
      this.navCtrl.setRoot(TabsPage);
    })
    .catch((error: any) => {
      if(error.code == "auth/operation-not-allowed") {
        toast.setMessage("O modo visitante está desabilitado.");
      } else {
        console.log(error);
      }
      toast.present();
    });
  }

  cadastrar () {
    this.navCtrl.push(RegisterPage);
  }

  recuperar () {
    this.navCtrl.push(ForgotPage);
  }

}
