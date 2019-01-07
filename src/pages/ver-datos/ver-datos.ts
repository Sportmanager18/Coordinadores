import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { JugadoresProvider } from '../../providers/jugadores/jugadores';
import firebase from 'firebase';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginPage } from '../login/login';

/**
 * Generated class for the VerDatosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ver-datos',
  templateUrl: 'ver-datos.html',
})
export class VerDatosPage {
  public jugadores: Array<any>;
  public informacion: Array<any>;
  public partidos: Array<any>;
  public info: FormGroup;
  private equipos: Array<any> = [];
  public datos: Array<number>; 
  public player: Array<any>; 
  public id: number;
  private nequipos:Array<any>=[];
  private tipo:String;
  public nminutos:number=0;
  constructor(private alertCtrl: AlertController, public navCtrl: NavController, private builder:FormBuilder, public navParams: NavParams) {
    this.info = builder.group({
      Equipo: ['', Validators.required],
      Jugador: ['', Validators.required],
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
    let cont=0;
    this.equipos.forEach(equipo => {
      this.nequipos[cont]=equipo.nombre;
      cont++;
  });
    for(let i=0;i<=this.nequipos.length;i++){
      if(this.nequipos[i]=="AlevinA"){
        let posicion=this.nequipos.indexOf(form.value.Equipo);
          if(posicion<i){
            this.tipo="fut11";
          }else{
            this.tipo="fut7";
          }
          
      }
    }
    firebase.database().ref('/Entrenadores/' + this.tipo + '/' +form.value.Equipo+'/entrenador/Asistencias').on('value', (snapshot) => {
      this.informacion=[];
      snapshot.forEach((snap) => {
        this.informacion.push(snap.val());
        console.log(this.informacion.length);
        return false;
      });
    }); 
    firebase.database().ref('/' + form.value.Equipo ).on('value', (snapshot) => {
      this.datos=[];
      snapshot.forEach((snap) => {
        this.datos.push(snap.val());
        return false;
      });
    });
      firebase.database().ref('/' + form.value.Equipo + '/Partidos').on('value', (snapshot) => {
        this.partidos=[];
        snapshot.forEach((snap) => {
          this.partidos.push(snap.val());
          return false;
        });
      });
      if(this.informacion.length==0){
        document.getElementById("informacion").innerHTML="No hay faltas de asistencia";
      }else{
      var asistencias=this.datos[4]*this.partidos.length;
      this.partidos.length ++;
      document.getElementById("informacion").innerHTML="<H4>Faltas de asistencia: " + this.informacion.length + " / "+ asistencias+"</H4>";
      var contenido=document.createElement("DIV");
      var a=document.createAttribute("class");
      a.value="asistencia";
      contenido.setAttributeNode(a);
      var node = document.createElement("H4");
      var textnode = document.createTextNode("Fechas de faltas:");
      node.appendChild(textnode);
      contenido.appendChild(node);
      for(let cont2 =0;cont2<this.informacion.length;cont2++){
        var node = document.createElement("H5");
        var textnode = document.createTextNode(this.informacion[cont2].fecha);
        node.appendChild(textnode);
        contenido.appendChild(node);
      }
      document.getElementById("informacion").appendChild(contenido);
    }
  }
} 
