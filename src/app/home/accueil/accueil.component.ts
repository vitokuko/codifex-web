import { Component, OnInit } from '@angular/core';
import {DataService} from "../../data.service";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
  providers: [DataService]
})
export class AccueilComponent implements OnInit {

  urlEtudiant= 'etudiants';
  constructor(public dataService: DataService) { }

  ngOnInit() {

  }



}
