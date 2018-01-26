/**
 * Created by souaibou on 13/01/2018.
 */
import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./home.component";
import {AccueilComponent} from "./accueil/accueil.component";
import {CodifierComponent} from "./codifier/codifier.component";
import {ReserverComponent} from "./reserver/reserver.component";
/**
 * Created by souaibou on 5/9/17.
 */
const HOME_ROUTES : Routes =[
  {
    path: 'home',
    component : HomeComponent,
    children : [
      {
        path: 'accueil',
        component: AccueilComponent
      },
      {
        path: 'codifier',
        component: CodifierComponent
      },
      {
        path: 'reserver',
        component: ReserverComponent
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
export class HomeRouting {}
