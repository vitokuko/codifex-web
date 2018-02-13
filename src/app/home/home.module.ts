import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParametresComponent } from './parametres/parametres.component';
import { StatistiquesComponent } from './statistiques/statistiques.component';
import {HomeRouting} from "./home.routing";
import { AccueilComponent } from './accueil/accueil.component';
import { ReserverComponent } from './codification/reserver.component';
import {HttpModule} from "@angular/http";
import {ToasterModule} from "angular2-toaster";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import { AidesComponent } from './aides/aides.component';
import { ModifierComponent } from './modifier/modifier.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    HomeRouting,
    HttpModule,
    ToasterModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    FormsModule
  ],
  declarations: [AccueilComponent, ReserverComponent,ParametresComponent, AidesComponent, ModifierComponent, StatistiquesComponent]
})
export class HomeModule { }
