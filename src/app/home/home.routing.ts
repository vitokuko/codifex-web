/**
 * Created by souaibou on 13/01/2018.
 */
import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./home.component";
import {Component} from "@angular/core/src/metadata/directives";
import {ParametresComponent} from "./parametres/parametres.component";
import {StatistiquesComponent} from "./statistiques/statistiques.component";
import {AccueilComponent} from "./accueil/accueil.component";
import {ReserverComponent} from "./codification/reserver.component";
import {CodifierComponent} from "./codifier/codifier.component";
import {AidesComponent} from "./aides/aides.component";
import {ModifierComponent} from "./modifier/modifier.component";
/**
 * Created by souaibou on 5/9/17.
 */
const HOME_ROUTES: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'parametres',
        component: ParametresComponent,
      },
      {
        path: 'statistiques',
        component: StatistiquesComponent
      },
      {
        path: 'accueil',
        component: AccueilComponent
      },
      {
        path: 'codification',
        component: ReserverComponent
      },
      {
        path: 'codifier',
        component: CodifierComponent
      }
      {
        path: 'aides',
        component: AidesComponent
      },
      {
        path: 'modifier',
        component: ModifierComponent
      }

    ]
  }

];
@NgModule({
  imports: [
    RouterModule.forChild(HOME_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRouting {
}
