import {Component, OnInit} from '@angular/core';
import {DataService} from "../../data.service";
declare var $:any;

@Component({
  selector: 'app-reserver',
  templateUrl: './reserver.component.html',
  styleUrls: ['./reserver.component.css'],
  providers: [DataService]
})
export class ReserverComponent implements OnInit {

  urlPav = 'pavillons';
  urlPavEtage= 'pavillon-etages';
  listPavillon=[];
  listEtageOfPav=[];
  listChambreOfPav=[];
  listChambreOfEtage=[];
  etudiantConnected;
  listEtudiantResChambre= [];
  posChambreReserver= [];
  pavillonId;
  etageId;
  list = {
    etudiant : {
      prenom :"",
      nom:"",
      username:""
    }
  };

  constructor(public dataService: DataService) {
   var eventSource = new window['EventSource']("http://codifex-api.herokuapp.com/api/positions/change-stream? format=change-stream");
    eventSource.addEventListener('data', function(msg) {
      var raw = msg.data;
      var data = JSON.parse(raw);
      console.log(data); // => change obj
      document.getElementById('myObject').click();
    });
  }

  ngOnInit() {
    this.getAllPavillons();
    this.getEtudiantConnected();
    this.getPosChambreReserver();
    this.getPavEtageDemeurant();
  }


  executeScript(id,label){
    $(document).on("click", ".open-AddBookDialog", function () {
      var myBookId =id;
      console.log(myBookId);
      document.getElementById('myModalLabel2').innerHTML = 'Chambre '+label;
      //$(".modal-header #myModalLabel2").innerHTML = myBookId;
    });
    this.listEtudiantResChambre = [];
    this.dataService.getData('positions'+'?filter='+'{"include":["etudiant"],"where":{"chambreId":"'+id+'"}}')
      .subscribe(
        data => {
          console.log(data);
          this.listEtudiantResChambre = data;
        },
        error => console.log(error)
      )
  }

  getEtudiantConnected(){
    console.log(this.dataService.getUser().userId);
    this.dataService.getDataWithId('etudiants',this.dataService.getUser().userId + '?filter='+'{"include":["departement","cycle","option","niveau"]}')
      .subscribe(
        data => {
          console.log(data);
          this.etudiantConnected = data;
        },
        error => console.log(error)
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
    this.getAllChambreOfPav(id);
    this.dataService.getDataWithId(this.urlPav, id + '/etages' + '?filter={"order":"label"}')
      .subscribe(
        data => {
          console.log(data);
          this.listEtageOfPav = data;
          this.getAllChambreOfEtage(this.listEtageOfPav[0]['id']);
          console.log(this.listEtageOfPav);
        },
        error => {
          console.log(error);
        }
      );
  }

  getAllChambreOfPav(id){
    this.listChambreOfPav = [];
    this.dataService.getDataWithId(this.urlPav, id + '/chambres' + '?filter={"order":"label"}')
      .subscribe(
        data => {
          console.log(data);
          this.listChambreOfPav = data;
          console.log(this.listChambreOfPav);
        },
        error => {
          console.log(error);
        }
      );
  }

  getAllChambreOfEtage(etageId){
    console.log("pavId",this.pavillonId, "etageId", etageId);
    this.dataService.getData('pavillon-etages?filter=' + encodeURIComponent('{"where":{"etageId":"'+ etageId +'", "pavillonId":"'+ this.pavillonId +'"},"include":{"chambres":{"positions":{"etudiant":["departement","option","cycle","niveau"]}}}}'))
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

  handleAffinite(chambres){
    let etudiant = this.etudiantConnected;
    chambres.forEach(function(chambre){
      chambre.affinite = 0;
      if (chambre.positions.length == 0){
        chambre.affinite = 5;
      }else{
        chambre.affinite = 0;
        chambre.positions.forEach(function (position) {
          if(position.etudiant.option.label == etudiant.option.label){
            chambre.affinite += 50;
          }
          if(position.etudiant.departement.label == etudiant.departement.label){
            chambre.affinite += 25;
          }
          if(position.etudiant.niveau.label == etudiant.niveau.label){
            chambre.affinite += 15;
          }
          if(position.etudiant.cycle.label == etudiant.cycle.label){
            chambre.affinite += 10;
          }

        });
        chambre.affinite = chambre.affinite / 4;
      }
    })
  }

  getPosChambreReserver(){
    this.dataService.getData('positions'+'?filter='+'{"include":["etudiant"]}')
      .subscribe(
        data => {console.log(data);this.posChambreReserver = data;},
        error => console.log(error)
      )
  }

  getPavEtageDemeurant(){
    this.dataService.getData(this.urlPavEtage + '?filter='+'{"include":["etage","pavillon"]}')
      .subscribe(
        data => {
          console.log(data);
        },
        error => console.log(error)
      )
  }

}
