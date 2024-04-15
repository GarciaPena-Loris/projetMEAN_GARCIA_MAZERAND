import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SearchFormComponent} from "./search-form/search-form.component";
import {HeaderComponent} from "./header/header.component";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {PageComponent} from "./page/page.component";
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SearchFormComponent, HeaderComponent, MatFormField, MatFormFieldModule, MatLabel, PageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend_projetmean_garcia_mazerand';
}
