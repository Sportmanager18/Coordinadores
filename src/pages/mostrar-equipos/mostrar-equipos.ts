import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { JugadoresProvider } from '../../providers/jugadores/jugadores';
import firebase from 'firebase';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginPage } from '../login/login';
/**
 * Generated class for the MostrarEquiposPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mostrar-equipos',
  templateUrl: 'mostrar-equipos.html',
})
export class MostrarEquiposPage {
  public jugadores: Array<any>;
  public informacion: Array<any> =[];
  public partidos: Array<any>;
  public infor: FormGroup;
  public datos: Array<number>; 
  private equipos: Array<any> = [];
  public player: Array<any>; 
  public id: number;
  public nminutos:number=0;
  constructor(private alertCtrl: AlertController, public navCtrl: NavController, private builder:FormBuilder, public navParams: NavParams) {
    this.infor = builder.group({
      Equipo: ['', Validators.required],
      Tipo: ['', Validators.required]
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad VerDatosPage');
    firebase.database().ref('/Equipos/').on('value', (snapshot) => {
      this.equipos = [];
      console.log(snapshot.val());
      snapshot.forEach((snap) => {
        this.equipos.push(snap.val());
        return false;
      });
    });
  }  
  buscarinformacion(form){
    let cont2,cont;
    console.log(form.value.Equipo);
    firebase.database().ref('/' + form.value.Equipo).on('value', (snapshot) => {
      this.datos=[];
      snapshot.forEach((snap) => {
        this.datos.push(snap.val());
        return false;
      });
    });
    firebase.database().ref('/' + form.value.Equipo + '/Jugadores').on('value', (snapshot) => {
      this.jugadores = [];
      snapshot.forEach((snap) => {
        this.jugadores.push(snap.val());
        return false;
      });
    });
    console.log(this.jugadores);
    let index=0;
    this.jugadores.forEach(id => {
      firebase.database().ref('/' + form.value.Equipo + '/Jugadores/' + index + '/' +form.value.Tipo).on('value', (snapshot) => {
        snapshot.forEach((snap) => {
          this.informacion.push(snap.val());
          return false;
        });
      });
      index++;
    });
    console.log(this.informacion);
    if(this.informacion[0] != null && this.informacion[0] != undefined){
    document.getElementById("informacion").style.display="block";
    if(form.value.Tipo=="Asistencia"){

    }
    }else{
      let alert = this.alertCtrl.create({
        title: 'No hay datos que mostrar',
        message: 'Los datos solicitados no existen!',
        buttons: [
          {
            text: 'Aceptar',
            role: 'OK'
          }
        ]
      });
      alert.present();
    }
  }
}
