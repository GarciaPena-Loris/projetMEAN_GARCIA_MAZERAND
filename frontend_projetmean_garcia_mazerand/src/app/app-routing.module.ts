import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SelectorComponent} from "./selector/selector.component";
import {AuthCardComponent} from "./auth-card/auth-card.component";

const routes: Routes = [
  { path: '', component: SelectorComponent },
  { path: 'auth', component: AuthCardComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
