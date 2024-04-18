
import {Component, Injectable, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Bien} from '../model/bien.interface';
import { HousingService } from './housing.service';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-housing',
  templateUrl: './housing.component.html',
  styleUrl: './housing.component.css'
})
export class HousingComponent implements OnInit{
  logementsALouer: Bien[] = [];
  constructor(private housingService: HousingService) { }

  ngOnInit() {
    this.housingService.getAllBiens().subscribe((biens: Bien[]) => {
      this.logementsALouer = biens;
    }, (error: any) => {
      console.error('Erreur lors de la requête:', error);

    });
  }


}
