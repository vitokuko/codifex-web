import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {Router} from "@angular/router";
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DataService]
})
export class HomeComponent implements OnInit, AfterViewInit {

  urlEtudiant= 'etudiants';
  infoCompteEtudiant = {
    prenom: '',
    nom: ''
  };
  constructor(public dataService: DataService, public router: Router) { }

  ngOnInit() {
    console.log(this.getUser(this.dataService.getUser().userId));
  }

  ngAfterViewInit() {
  }

  logout(){
    this.dataService.logout();
    this.router.navigate(['/auth/login']);
  }

  parametres(){
    this.router.navigate(['/home/parametres']);
  }

  //TODO desactiver le token dans l'api et ajouter l'attribut tel dans la table etudiant
  getUser(id){
    this.dataService.getDataWithId(this.urlEtudiant,id)
      .subscribe(
        data => {
          console.log(data);
          this.infoCompteEtudiant = data;
        },
        error => {
          console.log(error);
        }
      )
  }

}
