import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {routing} from './auth.routing';
import {FormsModule} from '@angular/forms';
import {HttpModule} from "@angular/http";
import {SpinnerModule} from "angular2-spinner/dist";
import {ImageUploadModule} from "angular2-image-upload";
import {ToasterModule} from "angular2-toaster";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  imports: [
    CommonModule,
    routing,
    FormsModule,
    ToasterModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    HttpModule,
    SpinnerModule,
    ImageUploadModule.forRoot(),
  ],
  declarations: [LoginComponent, RegisterComponent]
})
export class AuthModule { }
