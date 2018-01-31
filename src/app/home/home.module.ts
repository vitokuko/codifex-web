import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParametresComponent } from './parametres/parametres.component';
import { StatistiquesComponent } from './statistiques/statistiques.component';
import {HomeRouting} from "./home.routing";
import { AccueilComponent } from './accueil/accueil.component';
import { CodifierComponent } from './codifier/codifier.component';
import { ReserverComponent } from './reserver/reserver.component';
import { AidesComponent } from './aides/aides.component';
import { ModifierComponent } from './modifier/modifier.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRouting
  ],
  declarations: [AccueilComponent, CodifierComponent, ReserverComponent,ParametresComponent, AidesComponent, ModifierComponent, StatistiquesComponent]
})
export class HomeModule { }
