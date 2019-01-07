import { Injectable } from '@angular/core';
import firebase from 'firebase';

/*
  Generated class for the JugadoresProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class JugadoresProvider {
  
  private static jugadores: Array<object> = [];
  public static seleccionado: object;
  public static categoria: string;
  public static error: Error = null;
  public static fetch() {
    console.log(this.categoria);
    this.fetchJugadores();
  }

  private static fetchJugadores() {
    firebase.database().ref('/' + this.categoria + '/Jugadores').on('value', (snapshot) => {
      this.jugadores = snapshot.val();
      console.log(this.jugadores);
    });
  }
  public static getJugadores(): Array<object> {
    return this.jugadores;
  }
  public static guardarIncidencia(id: number, _asunto: string, _descripcion: string, callback?: Function) {

    let date = new Date();
    let dd = date.getDate();
    let mm = (date.getMonth() + 1);
    let yyyy = date.getFullYear();
    let fecha: string;
    fecha = yyyy + '-' + mm + '-' + dd;

    firebase.database().ref('/' + this.categoria + '/Jugadores/' + id + '/Incidencias/' + fecha).set({
      Asunto: _asunto,
      Incidencia: _descripcion,
      Fecha:fecha
    })
    .then(() => {
      console.log("Incidencia enviada");
      if (typeof callback !== 'undefined') {
        console.log("Ejecutando instruciones opcionales...");
        callback();
      }
    });
  }
}
/**
 * asignaiones: {
 *  infantilA@pbvallirana.com: InfantilA
 * }
 */