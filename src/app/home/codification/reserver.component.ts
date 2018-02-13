import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from "../../data.service";
import {NgForm} from "@angular/forms";
declare var $: any;

@Component({
  selector: 'app-reserver',
  templateUrl: './reserver.component.html',
  styleUrls: ['./reserver.component.css'],
  providers: [DataService]
})
export class ReserverComponent implements OnInit {

  @ViewChild('ngForm')
  myFormValidateChambre: NgForm;

  hidden: Boolean = true;
  urlPav = 'pavillons';
  urlPavEtage = 'pavillonEtages';
  listPavillon = [];
  listEtageOfPav = [];
  listChambreOfPav = [];
  listChambreOfEtage = [];
  etudiantConnected;
  listEtudiantResChambre = [];
  posChambreReserver = [];
  pavillonId;
  etageId;
  chambreSelected;
  chambreLabel;
  list = {
    etudiant: {
      prenom: "",
      nom: "",
      username: ""
    }
  };

  constructor(public dataService: DataService) {
    let eventSource = new window['EventSource']("http://codifex-api.herokuapp.com/api/positions/change-stream? format=change-stream");
    eventSource.addEventListener('data', function (msg) {
      let raw = msg.data;
      let data = JSON.parse(raw);
      console.log(data); // => change obj
      document.getElementById('myObject').click();
      document.getElementById('baseVerticalLeft-tab1').click();
    });
  }

  ngOnInit() {
    this.getEtudiantConnected();
    this.getAllPavillons();
    this.getPosChambreReserver();
    this.getPavEtageDemeurant();
    this.isReserve();
  }

  isInitialize() {
    this.getEtudiantConnected();
    this.getAllPavillons();
    this.getPosChambreReserver();
    this.getPavEtageDemeurant();
    this.isReserve();
    this.executeScript(this.chambreSelected, this.chambreLabel);
  }


  executeScript(id, label) {
    this.chambreSelected = id;
    this.chambreLabel = label;
    $(document).on("click", ".open-AddBookDialog", function () {
      document.getElementById('myModalLabel2').innerHTML = 'Chambre ' + label;
      //$(".modal-header #myModalLabel2").innerHTML = myBookId;
    });
    this.listEtudiantResChambre = [];
    this.dataService.getData('positions' + '?filter=' + '{"include":["etudiant"],"where":{"chambreId":"' + id + '"}}')
      .subscribe(
        data => {
          console.log(data);
          this.listEtudiantResChambre = data;
        },
        error => console.log(error)
      )
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

  isReserve() {
    let etudiantReserve = [];
    this.dataService.getData('positions')
      .subscribe(
        data => {
          console.log(data);
          etudiantReserve = data;
          this.verifiEtudiantReserve(etudiantReserve);
          console.log(this.hidden);
        },
        error => console.log(error)
      )
  }

  verifiEtudiantReserve(data) {
    let i = 0;
    while (i < data.length && this.hidden == true) {
      if (this.etudiantConnected.id == data[i].etudiantId) {
        this.hidden = false;
      }
      i++;
    }
  }

  reserver() {
    alert("chambre selectionner : " + this.chambreSelected);
    this.dataService.getData('chambres/' + this.chambreSelected + '/positions')
      .subscribe(
        data => {
          console.log(data);
          this.positionReserver(data.length);
        },
        error => {
          console.log(error);
        }
      );
  }

  positionReserver(value) {
    let etudiantConnectReserver = [];
    etudiantConnectReserver.push(
      {
        label: value + 1,
        dateCodification: new Date(),
        status: "reserver",
        etudiantId: this.etudiantConnected.id,
        chambreId: this.chambreSelected
      });
    this.dataService.getData('pavillonEtages?filter=' + encodeURIComponent('{"where":{"etageId":"' + this.etageId + '", "pavillonId":"' + this.pavillonId + '"},"include":"etage"}'))
      .subscribe(
        data => {
          console.log(data);
          if (data[0]['etage'].nombrePosition <= 4) {
            this.dataService.addData('positions', etudiantConnectReserver)
              .subscribe(
                data => console.log(data),
                error => console.log(error)
              )
          } else {
            console.log("chambre full");
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  getAllPavillons() {
    this.dataService.getData(this.urlPav)
      .subscribe(
        data => {
          console.log(data);
          this.listPavillon = data;
          this.getAllEtageOfPav(this.listPavillon[0]['id']);
        },
        error => {
          console.log(error);
        }
      );
  }

  getAllEtageOfPav(id) {
    this.pavillonId = id;
    this.listEtageOfPav = [];
    this.dataService.getDataWithId(this.urlPavEtage, '?filter={"where":{"pavillonId":"' + id + '","demeurant":"'+ this.etudiantConnected.sexe  +'"},"include":"etage"}')
      .subscribe(
        data => {
          console.log(data);
          this.listEtageOfPav = data;
          this.getAllChambreOfEtage(this.listEtageOfPav[0]['etage'].id);
          this.getListEtageOfPav(this.listEtageOfPav);
          console.log(this.listEtageOfPav);
        },
        error => {
          console.log(error);
        }
      );
  }

  getListEtageOfPav(data) {
    data.forEach(function (value) {
      value.label = value.etage.label;
      value.identifiant = value.etage.id;
    })
  }

  getAllChambreOfEtage(etageId) {
    this.etageId = etageId;
    console.log("pavId", this.pavillonId, "etageId", etageId);
    this.dataService.getData('pavillonEtages?filter=' + encodeURIComponent('{"where":{"etageId":"' + etageId + '", "pavillonId":"' + this.pavillonId + '"},"include":{"chambres":{"positions":{"etudiant":["departement","option","cycle","niveau"]}}}}'))
      .subscribe(
        data => {
          console.log(data);
          this.listChambreOfEtage = data[0].chambres;
          this.handleAffinite(this.listChambreOfEtage);
          console.log(this.listChambreOfEtage);
        },
        error => {
          console.log(error);
        }
      );
    /*this.listChambreOfEtage = [];
     for (let i=0; i < this.listChambreOfPav.length; i++){
     if (this.listChambreOfPav[i].etageId == id){
     this.listChambreOfEtage.push(this.listChambreOfPav[i]);
     }
     }*/
    console.log(this.listChambreOfEtage);
  }

  handleAffinite(chambres) {
    let etudiant = this.etudiantConnected;
    chambres.forEach(function (chambre) {
      chambre.affinite = 0;
      if (chambre.positions.length == 0) {
        chambre.affinite = 5;
      } else {
        chambre.affinite = 0;
        chambre.positions.forEach(function (position) {
          if (position.etudiant.option.label == etudiant.option.label) {
            chambre.affinite += 50;
          }
          if (position.etudiant.departement.label == etudiant.departement.label) {
            chambre.affinite += 25;
          }
          if (position.etudiant.niveau.label == etudiant.niveau.label) {
            chambre.affinite += 15;
          }
          if (position.etudiant.cycle.label == etudiant.cycle.label) {
            chambre.affinite += 10;
          }

        });
        chambre.affinite = chambre.affinite / 4;
      }
    })
  }

  getPosChambreReserver() {
    this.dataService.getData('positions' + '?filter=' + '{"include":["etudiant"]}')
      .subscribe(
        data => {
          console.log(data);
          this.posChambreReserver = data;
        },
        error => console.log(error)
      )
  }

  getPavEtageDemeurant() {
    this.dataService.getData(this.urlPavEtage + '?filter=' + '{"include":["etage","pavillon"]}')
      .subscribe(
        data => {
          console.log(data);
        },
        error => console.log(error)
      )
  }

}
