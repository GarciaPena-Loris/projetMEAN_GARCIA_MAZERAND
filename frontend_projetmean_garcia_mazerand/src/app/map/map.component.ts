import {Component, OnInit, Input, ViewChild, SimpleChanges} from '@angular/core';
import {Bien} from "../model/bien.interface";
import {MapInfoWindow, MapMarker} from "@angular/google-maps";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() logements: any;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow?: MapInfoWindow;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['logements'] && changes['logements'].currentValue) {
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
  infoContent: string = '';
  markers: Set<google.maps.Marker> = new Set();

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = (event.latLng.toJSON())
  }

  loadMarker(logement: Bien): google.maps.Marker {
    return new google.maps.Marker({
      position: {
        lat: logement.latitude ?? 0,
        lng: logement.longitude ?? 0
      },
      title: logement.rue + ' ' + logement.commune,
      animation: google.maps.Animation.DROP,
      draggable: false,
    });
  }

  addMarker(logement: Bien): void {
    const marker = this.loadMarker(logement);
    this.markers.add(marker);
  }

  openMapInfo(content: string, marker: MapMarker): void {
    this.infoContent = content;
    this.infoWindow?.open(marker);
  }


}
