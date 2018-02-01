import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {routing} from "./app.routing";
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import {HomeModule} from "./home/home.module";
import {AuthModule} from "./auth/auth.module";
import { SpinnerModule } from 'angular2-spinner/dist';
import {ImageUploadModule} from "angular2-image-upload";
import {ToasterModule} from "angular2-toaster";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HomeModule,
    ToasterModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    AuthModule,
    SpinnerModule,
    ImageUploadModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
