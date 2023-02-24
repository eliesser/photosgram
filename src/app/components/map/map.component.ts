import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

declare var mapboxgl: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapaComponent implements OnInit {
  @Input() coords: string = '';
  @ViewChild('map', { static: true }) map: ElementRef;

  constructor() {}

  ngOnInit() {
    const latLng = this.coords.split(',');
    const lat = Number(latLng[0]);
    const lng = Number(latLng[1]);

    mapboxgl.accessToken =
      'pk.eyJ1IjoiZWxpZXNzZXJmIiwiYSI6ImNranNxeGkwZjgxeXkyemxnMzl3azI1cDEifQ.wMkMzVCATgiJCmyzvBksEA';
    const map = new mapboxgl.Map({
      container: this.map.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 15,
    });

    const marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
  }
}
