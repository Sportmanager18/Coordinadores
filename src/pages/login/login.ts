import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public todo: any = {};
  public static user:any;
  constructor(private menu: MenuController, public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
    
  }

  ionViewDidEnter() {
    // cuando estamos en esta pagina
    this.menu.swipeEnable(false); // desactiva el swipe del menu
  }

  ionViewWillLeave() {
    //cuando salimos de esta pagina
    this.menu.swipeEnable(true); // activamos de nuevo el swipe del menu
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginFormListener() {
    let email = this.todo.email;
    LoginPage.user=this.todo.email;
    email=email + '@pbvallirana.com';
    let password = this.todo.password;
    console.log(email);
    AuthProvider.login(email, password, () => {
      // si hay algun error durante el login se ejecutara esta funcion anonima
      if (AuthProvider.error != null) {
        this.showAlert(AuthProvider.error.code, AuthProvider.error.message);
      }
    });
  }

  private showAlert(title: string, msg: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: ['Aceptar']
    });

    alert.present();
  } 

}
