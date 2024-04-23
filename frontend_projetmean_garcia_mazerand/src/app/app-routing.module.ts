import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SelectorComponent} from "./selector/selector.component";
import {AuthCardComponent} from "./auth-card/auth-card.component";
import {HousingViewComponent} from "./housing-view/housing-view.component";

const routes: Routes = [
  { path: '', component: SelectorComponent },
  { path: 'auth', component: AuthCardComponent },
  { path: 'housingView', component: HousingViewComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
