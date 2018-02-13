import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {DataService} from "../../data.service";
import {NgForm} from "@angular/forms";
import {FileHolder} from "angular2-image-upload";
import {Toast, ToasterConfig, ToasterService} from "angular2-toaster";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [DataService]
})
export class RegisterComponent implements OnInit {

  @ViewChild('ngForm')
  myFormRegister: NgForm;
  urlEtudiantCodifexe= 'etudiants';
  listDepartements = [];
  listOptionsOfDepart = [];
  listCycles = [];
  listNivOfCycle = [];


  // configuration du toaster
  public toasterconfig: ToasterConfig = new ToasterConfig({positionClass: 'toast-top-right'});

  constructor(public router: Router, public dataService: DataService,private toasterService: ToasterService) {
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
    this.getDepartement();
    this.getCycle();
  }

  login(){
    this.router.navigate(['/auth/login']);
  }

  inscription(value: NgForm){
    console.log(value.value);
    this.dataService.addData(this.urlEtudiantCodifexe,value.value)
      .subscribe(
        data => {
          value.onReset();
          this.popToast('success','Inscription','Successful!!');
          console.log(data);
          this.router.navigate(['/auth/login']);
        },
        error => {
          console.log(error);
          this.popToast('error','Inscription',error+'!!');
        }
      );
  }

  imageFinishedUploading(file: FileHolder) {
    console.log(JSON.stringify(file.serverResponse));
  }

  onRemoved(file: FileHolder) {
    // do some stuff with the removed file.
  }

  onUploadStateChanged(state: boolean) {
    console.log(JSON.stringify(state));
  }

  getDepartement(){
    this.listDepartements =[];
    this.dataService.getData('departements')
      .subscribe(
        data => {
          this.listDepartements = data;
          console.log(data);
        },
        error => console.log(error)
      )
  }

  getOptionsOfDepart(id){
    this.listOptionsOfDepart = [];
    this.dataService.getDataWithId('departements',id + '/options')
      .subscribe(
        data => {
          this.listOptionsOfDepart = data;
          console.log(data);
        },
        error => console.log(error)
      )
  }

  getCycle(){
    this.listCycles =[];
    this.dataService.getData('cycles')
      .subscribe(
        data => {
          this.listCycles = data;
          console.log(data);
        },
        error => console.log(error)
      )
  }

  getNiveauOfCycle(id){
    this.listNivOfCycle = [];
    this.dataService.getDataWithId('cycles',id + '/niveaus')
      .subscribe(
        data => {
          this.listNivOfCycle = data;
          console.log(data);
        },
        error => console.log(error)
      )
  }

}
