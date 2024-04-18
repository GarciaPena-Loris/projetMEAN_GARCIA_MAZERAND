import {Component, Injectable, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Bien} from '../model/bien.interface';
import { PageService } from './page.service';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageComponent implements OnInit{
  logementsALouer: Bien[] = [];
  constructor(private pageService: PageService) { }

  private apiUrl = 'http://localhost:4200';

  ngOnInit() {
    this.pageService.getAllBiens().subscribe((biens: Bien[]) => {
      this.logementsALouer = biens;
    }, (error: any) => {
      console.error('Erreur lors de la requête:', error);

    });
  }


}
