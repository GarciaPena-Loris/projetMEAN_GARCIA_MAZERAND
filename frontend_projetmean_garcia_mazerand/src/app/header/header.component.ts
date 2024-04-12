import { Component } from '@angular/core';
import {SearchFormComponent} from "../search-form/search-form.component";
import {MatButton} from "@angular/material/button";
import {MatDialogActions} from "@angular/material/dialog";
import {MatIcon} from "@angular/material/icon";


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    SearchFormComponent,
    MatButton,
    MatDialogActions,
    MatIcon
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
