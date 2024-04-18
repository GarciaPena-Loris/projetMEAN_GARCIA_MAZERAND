import { Component, Input } from '@angular/core';
import { Bien } from '../model/bien.interface';

@Component({
  selector: 'app-housing-card',
  templateUrl: './housing-card.component.html',
  styleUrl: './housing-card.component.css',

})
export class HousingCardComponent {
  @Input() logement?: Bien;
}
