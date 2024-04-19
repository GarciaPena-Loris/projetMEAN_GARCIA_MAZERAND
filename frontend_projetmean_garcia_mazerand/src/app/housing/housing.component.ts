
import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Bien} from '../model/bien.interface';
import { HousingService } from './housing.service';
import {MatPaginator, PageEvent} from "@angular/material/paginator";

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
  displayedLogements: Bien[] = [];


  constructor(private housingService: HousingService) { }
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngOnInit() {
    this.housingService.getAllBiens().subscribe((biens: Bien[]) => {
      this.logementsALouer = biens;
      this.displayedLogements = this.logementsALouer.slice(0, 16); // Pour afficher les 16 premiers éléments au début

    }, (error: any) => {
      console.error('Erreur lors de la requête:', error);

    });
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.displayedLogements = this.logementsALouer.slice(startIndex, endIndex);
  }


}
