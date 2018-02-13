import { Component, OnInit } from '@angular/core';
import {DataService} from "../../data.service";

@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.component.html',
  styleUrls: ['./parametres.component.css'],
  providers: [DataService]
})
export class ParametresComponent implements OnInit {

  etudiantConnected = {
    nom: "",
    prenom: "",
    telephone: "",
    matricule: "",
    dateNaissance: "",
    lieuNaissance: "",
    email: "",
    username: "",
    id: "",
    departementId: "",
    optionId: "",
    cycleId: "",
    niveauId: "",
    departement: {
      label: "",
      id: ""
    },
    cycle: {
      label: "",
      nbNiveau: 0,
      id: ""
    },
    option: {
      label: "",
      id: "",
      departementId: ""
    },
    niveau: {
      label: "",
      id: "",
      cycleId: ""
    }
  };
  constructor(public dataService:DataService) { }

  ngOnInit() {
    this.getEtudiantConnected();
  }


  getEtudiantConnected() {
    console.log(this.dataService.getUser().userId);
    this.dataService.getDataWithId('etudiants', this.dataService.getUser().userId + '?filter=' + '{"include":["departement","cycle","option","niveau"]}')
      .subscribe(
        data => {
          console.log(data);
          this.etudiantConnected = data;
        },
        error => console.log(error)
      );
  }

}
