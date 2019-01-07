import { Injectable } from '@angular/core';
import firebase from 'firebase';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  public static currentUser: firebase.User;
  public static isLogged: boolean = false;
  public static error: any;

  public static login(email: string, password: string, onError?: Function) {
    this.error = null; // ponemos a null para evitar guardar errores anteriores

    if (!this.isLogged) {
      // la sesion persistira hasta que se cierre sesion en el dispositivo
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
          return firebase.auth().signInWithEmailAndPassword(email, password);
        })
        .catch((error) => {
          // Handle Errors here.
          console.log(error);
          this.error = error;

          if(typeof onError !== 'undefined') {
            onError();
          }
        });
    }
  }

  public static logout() {
    if (this.isLogged) {
      firebase.auth().signOut();
    }
  }

  public static onAuthChanged(callback?: Function) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.isLogged = true;
        this.currentUser = user;
      } else {
        this.isLogged = false;
        this.currentUser = null;
      }

      if(typeof callback !== 'undefined') {
        callback();
      }
    });
  }

}
