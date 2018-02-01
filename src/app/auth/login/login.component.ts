import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {DataService} from '../../data.service';
import {Router} from "@angular/router";
import {Toast, ToasterConfig, ToasterService} from "angular2-toaster";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [DataService,ToasterService]
})
export class LoginComponent implements OnInit {

  @ViewChild('ngForm')
  myFormAuth: NgForm;
  urlEtudiantCodifexe= 'etudiants/login';
  working: Boolean=true;

  // configuration du toaster
  public toasterconfig: ToasterConfig = new ToasterConfig({positionClass: 'toast-top-right'});

  constructor(public dataService: DataService, public router: Router,private toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  popToast(type,titre,message) {
    const toast: Toast = {
      type: type,
      title: titre,
      body: message
    };
    this.toasterService.pop(toast);
  }

  ngOnInit() {

  }

  authentifier(value: NgForm) {
    this.working = false;
    console.log(this.urlEtudiantCodifexe);
    this.dataService.addData(this.urlEtudiantCodifexe, value)
      .subscribe(
        data => {
          this.dataService.setToken(data.id);
          this.popToast('success','Successful','authentification reussit');
          this.dataService.setUser(data);
          document.getElementById('home').click();
          console.log(data);
        },
        error => {
          this.working = true;
          this.handleError(error);
        }
      );
  }

  handleError(error) {
    this.popToast('error','Error','authentification failed');
    console.log(error);
  }

  register(){
    this.router.navigate(['/auth/register']);
  }

}
