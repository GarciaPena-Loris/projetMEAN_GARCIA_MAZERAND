import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [ CommonModule, HttpClient],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageComponent {
  logementsALouer: any[] = [];
  constructor(private http: HttpClient) {}
  postData() {
    // Effectuez la requête POST
    this.http.post('http://localhost:4200', {}).subscribe((response: any) => {
      console.log('Réponse du backend:', response);
      this.logementsALouer = response as any[]; // Stockez les logements à louer dans la propriété

      console.log('Logements à louer:', this.logementsALouer); // Afficher les données dans la console
    }, (error: any) => {
      console.error('Erreur lors de la requête:', error);
      // Traitez l'erreur ici
    });
  }


// postData() {
//     const data = { /* Données à envoyer */ };
//     this.http.post('http://localhost:4200', data).subscribe((response: any) => {
//       console.log('Réponse du backend:', response);
//       this.logmentsALouer = response as any[];
//     }, (error: any) => {
//       console.error('Erreur lors de la requête:', error);
//       // Traitez l'erreur ici
//     });
// }
}

// ngOnInit()
// {
//   this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe((data) => {
//     console.log(data);
//   });
// }
// const url = 'http://example.com/api/data'; // URL de votre backend
// const data = { /* Données à envoyer */ };
//
// this.http.post(url, data).subscribe(response => {
//   console.log('Réponse du backend:', response);
//   // Traitez la réponse JSON ici
// });

