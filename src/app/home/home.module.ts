import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatistiquesComponent } from './statistiques/statistiques.component';
import {HomeRouting} from "./home.routing";
import { AccueilComponent } from './accueil/accueil.component';
import { CodifierComponent } from './codifier/codifier.component';
import { ReserverComponent } from './reserver/reserver.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRouting
  ],
  declarations: [AccueilComponent, CodifierComponent, ReserverComponent,StatistiquesComponent]
})
export class HomeModule { }
