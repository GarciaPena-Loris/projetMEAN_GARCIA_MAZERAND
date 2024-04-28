import {Component, OnInit, Input, ViewChild, SimpleChanges, QueryList} from '@angular/core';
import {Bien} from "../model/bien.interface";
import {MapInfoWindow, MapMarker} from "@angular/google-maps";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() logements: any;
  @ViewChild(MapInfoWindow, {static: false}) housingInfoWindow?: MapInfoWindow;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['logements'] && changes['logements'].currentValue) {
      this.markers.clear();
      this.addMarkersToMap();
    }
  }

  addMarkersToMap() {
    this.logements?.forEach((logement: Bien) => {
      this.addMarker(logement);
    });
  }

  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 46.56933106435086,
    lng: 2.6653996434831795
  };
  zoom = 6;
  markers: Set<google.maps.Marker> = new Set();

  showPrice = false;
  infoLogement: string = '';
  selectedLogement: Bien | undefined;

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = (event.latLng.toJSON())
  }

  loadMarker(logement: Bien): google.maps.Marker | undefined {
    if (typeof google === 'undefined') {
      return undefined;
    }

    return new google.maps.Marker({
      position: {
        lat: logement.latitude ?? 0,
        lng: logement.longitude ?? 0
      },
      title: logement.idBien.toString(),
      animation: google.maps.Animation.DROP,
      draggable: false,
      label: logement.prix.toString() ?? 0
    });
  }

  addMarker(logement: Bien): void {
    const marker = this.loadMarker(logement);
    if (marker) {
      this.markers.add(marker);
    }
  }

  openMapInfo(content: string, marker: MapMarker): void {
    const selectedId = parseInt(content, 10);
    this.selectedLogement = this.logements.find((logement: { idBien: number; }) => logement.idBien === selectedId);
    this.showPrice = false;
    this.housingInfoWindow?.open(marker);
  }

  showMapPrice(content: string, marker: MapMarker): void {
    const selectedId = parseInt(content, 10);
    this.selectedLogement = this.logements.find((logement: { idBien: number; }) => logement.idBien === selectedId);
    if (this.selectedLogement) {
      const log = this.selectedLogement;
      this.infoLogement = log.commune + ": " + log.typeLogement.toString().charAt(0).toUpperCase() + log.typeLogement.toString().slice(1)
        + " de " + log.surface.toString() + " m², à " + log.prix.toString() + "€/nuits";
    }
    this.showPrice = true;
    this.housingInfoWindow?.open(marker);
  }

  hideMapPrice(): void {
    if (this.showPrice) {
      this.showPrice = false;
      this.housingInfoWindow?.close()
    }
  }


}
