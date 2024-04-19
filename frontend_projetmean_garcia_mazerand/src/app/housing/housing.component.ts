import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-housing',
  templateUrl: './housing.component.html',
  styleUrl: './housing.component.css'
})
export class HousingComponent {
  @Input() logements: any;

}
