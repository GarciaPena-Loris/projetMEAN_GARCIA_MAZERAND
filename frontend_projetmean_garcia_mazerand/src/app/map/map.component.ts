import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {

  map: any;

  constructor() { }

  ngOnInit(): void {
    // Initialisez la carte
    this.map = L.map('map').setView([51.505, -0.09], 13);

    // Ajoutez une couche de tuiles OpenStreetMap à la carte
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Ajoutez des marqueurs pour chaque offre de location (remplacez avec vos données)
    const offresLocations = [
      { latitude: 51.5, longitude: -0.09, titre: 'Offre 1' },
      { latitude: 51.51, longitude: -0.1, titre: 'Offre 2' },
      // Ajoutez d'autres offres de location ici
    ];

    offresLocations.forEach(offre => {
      L.marker([offre.latitude, offre.longitude]).addTo(this.map)
        .bindPopup(offre.titre); // Affichez le titre de l'offre lors du clic sur le marqueur
    });
  }

}
