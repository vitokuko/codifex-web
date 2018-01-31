import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./login/login.component";
import { RegisterComponent } from './register/register.component';
import {routing} from "./auth.routing";

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [LoginComponent, RegisterComponent]
})
export class AuthModule { }
