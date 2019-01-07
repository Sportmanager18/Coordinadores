import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {JugadoresProvider} from '../../providers/jugadores/jugadores';
import firebase from 'firebase';
/**
 * Generated class for the AsistenciaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-asistencias',
  templateUrl: 'asistencias.html',
})
export class AsistenciasPage {
  public jugadores: Array<object>;
  public id:number;
  private equipos: Array<any> = [];
  private ptipo:number;
  private entrenadores: Array<any> = [];
  public asistencias:Array<boolean> =new Array(20);
  constructor(private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
  }
  cargarentrenadores(){
    var tipo="fut11";
    for(let cont=0;cont<this.equipos.length;cont++){
      if(this.equipos[cont].nombre=="AlevinA"){
        this.ptipo=cont;
        tipo="fut7";

      }
      firebase.database().ref('/Entrenadores/'+tipo+'/'+this.equipos[cont].nombre+'/entrenador').on('value', (snapshot) => {
        console.log(snapshot.val());
        this.entrenadores[cont]=snapshot.val();
        console.log(this.entrenadores);
      });
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AsistenciasPage');
    firebase.database().ref('/Equipos/').on('value', (snapshot) => {
      this.equipos = [];
      console.log(snapshot.val());
      snapshot.forEach((snap) => {
        this.equipos.push(snap.val());
        return false;
      });
      console.log(this.equipos);
    });
    console.log(this.jugadores);
    this.cargarentrenadores();
}
  crearasistencia(entrenador){
      this.id=this.entrenadores.indexOf(entrenador);
      console.log(entrenador);
      this.asistencias[this.id]=entrenador.value;
  }
  subirasistencia(){
    let alert = this.alertCtrl.create({
      title: 'Subir faltas',
      message: '¿Estas seguro de subir las faltas?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Subir faltas',
          role: 'destructive', // color rojo en iOS
          handler: () => {
            let fjugador=0;
    for(let cont=0;fjugador==0;cont++){
      console.log(this.asistencias[cont]);
      if(this.asistencias[cont] == true ){
        if(cont<this.ptipo){
          let tipo="fut11";
          let date=new Date();
          let dd = date.getDate();
          let mm = (date.getMonth()+1);
          let yyyy = date.getFullYear();
          let fecha : string;
          fecha = yyyy + '-' + mm + '-' + dd;
          firebase.database().ref('/Entrenadores/'+tipo+'/'+this.equipos[cont].nombre+'/entrenador/Asistencias/'+fecha).set({
              "fecha":fecha
          }); 
        }else{
          let tipo="fut7";
          let date=new Date();
          let dd = date.getDate();
          let mm = (date.getMonth()+1);
          let yyyy = date.getFullYear();
          let fecha : string;
          fecha = yyyy + '-' + mm + '-' + dd;
          firebase.database().ref('/Entrenadores/'+tipo+'/'+this.equipos[cont].nombre+'/entrenador/Asistencias/'+fecha).set({
              "fecha":fecha
          }); 
        }
      } 
      if(this.entrenadores[cont+1]==null){
        fjugador=1;
      }
    }

    let alert = this.alertCtrl.create({
      title: 'Se han enviado las faltas de asistencia',
      message: 'Las faltas de asistencia se han enviado exitosamente!',
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
      ]
    });
    alert.present();
  }
}
