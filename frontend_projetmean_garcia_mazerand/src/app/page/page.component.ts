import {Component, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageComponent {
  logementsALouer: any[] = [];
  constructor(private http: HttpClient) { }
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

  // getUsers(): Observable<Logement[]> {
  //   return this.http.get<Logement[]>('http://localhost:4200/');
  // }
}
