import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MostrarEquiposPage } from './mostrar-equipos';

@NgModule({
  declarations: [
    MostrarEquiposPage,
  ],
  imports: [
    IonicPageModule.forChild(MostrarEquiposPage),
  ],
})
export class MostrarEquiposPageModule {}
