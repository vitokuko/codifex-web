import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeRouting} from "./home.routing";
import { AccueilComponent } from './accueil/accueil.component';
import { ReserverComponent } from './codification/reserver.component';
import {HttpModule} from "@angular/http";
import {ToasterModule} from "angular2-toaster";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  imports: [
    CommonModule,
    HomeRouting,
    HttpModule,
    ToasterModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
  ],
  declarations: [AccueilComponent, ReserverComponent]
})
export class HomeModule { }
