import {Component, Injectable, Input, SimpleChanges, ViewChild} from '@angular/core';
import {Bien} from '../model/bien.interface';
import {MatPaginator, PageEvent} from "@angular/material/paginator";

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-housing',
  templateUrl: './housing.component.html',
  styleUrl: './housing.component.css'
})
export class HousingComponent {
  @Input() logements: any;
  displayedLogements: Bien[] = [];

  constructor() {  }

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['logements'] && changes['logements'].currentValue) {
      this.displayedLogements = this.logements.slice(0, 14);
    }
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.displayedLogements = this.logements.slice(startIndex, endIndex);
  }


}
