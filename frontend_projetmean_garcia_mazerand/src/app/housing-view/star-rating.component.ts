import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  template: `
    <div class="star-rating">
      <span [ngClass]="getStarCss(1)"></span>
      <span [ngClass]="getStarCss(2)"></span>
      <span [ngClass]="getStarCss(3)"></span>
      <span [ngClass]="getStarCss(4)"></span>
      <span [ngClass]="getStarCss(5)"></span>
    </div>
  `,
  styles: [`
    .star {
      font-size: x-large;
      display: inline-block;
      color: lightgray;
    }

    .star:last-child {
      margin-right: 0;
    }

    .star:before {
      content: '\\2605';
    }

    .star.on {
      color: gold;
    }

    .star.half:after {
      content: '\\2605';
      color: gold;
      position: absolute;
      margin-left: -20px;
      width: 10px;
      overflow: hidden;
    }
  `]
})
export class StarRatingComponent {
  @Input() rating!: number;

  getStarCss(index: number): string {
    if (this.rating >= index) {
      // Étoile pleine si la note est égale ou supérieure à l'index
      return 'star on';
    } else if (this.rating + 0.5 >= index) {
      // Demi-étoile si la note est à mi-chemin entre deux index
      return 'star half';
    } else {
      // Étoile vide sinon
      return 'star';
    }
  }

}
