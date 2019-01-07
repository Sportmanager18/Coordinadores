import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';
import { JugadoresProvider } from '../providers/jugadores/jugadores';
import { VerDatosPage } from '../pages/ver-datos/ver-datos';
import { EquiposProvider } from '../providers/equipos/equipos';
import { AsistenciasPage } from '../pages/asistencias/asistencias';
import { MostrarEquiposPage } from '../pages/mostrar-equipos/mostrar-equipos';
@NgModule({
  declarations: [
    MyApp,
 //   IncidenciasPage,
    LoginPage,
    AsistenciasPage,
    MostrarEquiposPage,
//ListajugadoresPage,
//PartidosPage,
//SubirpartidoPage,
//MinutosPage,
//AsistenciaPage,
    VerDatosPage,
//JugadoresPage,
//ConvocadoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
//IncidenciasPage,
    LoginPage,
    AsistenciasPage,
    MostrarEquiposPage,
//ListajugadoresPage,
//PartidosPage,
//SubirpartidoPage,
//MinutosPage,
//AsistenciaPage,
    VerDatosPage,
//JugadoresPage,
//ConvocadoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    JugadoresProvider,
    EquiposProvider
  ]
})
export class AppModule {}
