import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, MenuController/*, Alert */} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import firebase from 'firebase';

import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';
import { JugadoresProvider } from '../providers/jugadores/jugadores';
import { EquiposProvider } from '../providers/equipos/equipos';
import { VerDatosPage } from '../pages/ver-datos/ver-datos';
import { AsistenciasPage } from '../pages/asistencias/asistencias';
import { MostrarEquiposPage } from '../pages/mostrar-equipos/mostrar-equipos';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage; // pagina principal
  public categoria:string;
  public clasi:Array<any>;
  pages: Array<{icon:string, title: string, component: any}>;

  config: any; // almacena la confifuracion de firebase

  constructor(private alertCtrl: AlertController, 
              public menuCtrl: MenuController, 
              public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen) 
  {
    this.initializeApp();
    
    this.config = {
      apiKey: "AIzaSyCwjSI9ul72AIrxnA5qeGWEqZWivpMuAJs",
      authDomain: "pbvallirana-bf270.firebaseapp.com",
      databaseURL: "https://pbvallirana-bf270.firebaseio.com",
      projectId: "pbvallirana-bf270",
      storageBucket: "pbvallirana-bf270.appspot.com",
      messagingSenderId: "278474058990"
    };
    // used for an example of ngFor and navigation
    this.pages = [
      {icon: "contact", title: 'Asistencias', component: AsistenciasPage },
      { icon: "eye", title: 'Ver Asistencias', component: VerDatosPage }
     // { icon: "eye", title: 'Ver Equipos', component: MostrarEquiposPage }
      

      
    ];
    /*console.log('ionViewDidLoad ListajugadoresPage');
    firebase.database().ref('/InfantilA/Jugadores').on('value', (snapshot) => {
      console.log(snapshot.val());
      this.jugadores = snapshot.val();
    });
    this.ComprobacionAlert = this.alertCtrl.create({
      title: 'Comprobando sesion',
      subTitle: 'Estamos comprobando si hay alguna sesion iniciada en este dispositivo. Por favor espere.'
    });
    */
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // inicializamos el firebase con su configuracion
      firebase.initializeApp(this.config);
      // llamamos al listener de la autenticacion
      // para comprobar si el usuario esta logueado o no
      //this.ComprobacionAlert.present();
      AuthProvider.onAuthChanged(() => {
        if (AuthProvider.isLogged) {
          // cargamos equipos
          EquiposProvider.fetch();
          // cargamos los jugadores de la cuenta que ha iniciado sesion
          JugadoresProvider.fetch();
          // si se ha logueado cambiamos la pagina a la pagina principal
          this.nav.setRoot(VerDatosPage);
        }
      });
    });
    
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  signOut() {
    let alert = this.alertCtrl.create({
      title: 'Cerrar sesion',
      message: '¿Estas seguro de cerrar sesion?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Cerrar sesion',
          role: 'destructive', // color rojo en iOS
          handler: () => {
            AuthProvider.logout();
            this.menuCtrl.close();
            this.nav.setRoot(this.rootPage);
          }
        }
      ]
    });
    alert.present();
  }
}
