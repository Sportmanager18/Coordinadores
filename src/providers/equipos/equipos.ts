import { Injectable } from '@angular/core';
import { JugadoresProvider } from '../../providers/jugadores/jugadores';
import firebase from 'firebase';
/*
  Generated class for the EquiposProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EquiposProvider {

  private static equipos: Array<{nombre: string}>;
  public static cargado: boolean = false;

  public static fetch() {
    firebase.database().ref('/' + JugadoresProvider.categoria + '/Equipos').on('value', (snapshot) => {
      this.equipos = snapshot.val();
      this.cargado = true;
      console.log(this.equipos);
    });
  }

  public static getEquipos() {
    return this.equipos;
  }

}
