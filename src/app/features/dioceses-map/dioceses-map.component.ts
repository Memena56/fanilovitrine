import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-dioceses-map',
  imports: [],
  templateUrl: './dioceses-map.component.html',
  styleUrl: './dioceses-map.component.css'
})
export class DiocesesMapComponent implements AfterViewInit{
  private map: L.Map | undefined;

  private dioceses = [
    {name: "Antsiranana", latlng: [-12.279, 49.299], arch: "Avaratra", color: "#1f77b4"},
    {name: "Ambanja", latlng: [-13.683, 48.433], arch: "Avaratra", color: "#1f77b4"},
    {name: "Mahajanga", latlng: [-15.716, 46.323], arch: "Avaratra", color: "#1f77b4"},
    {name: "Port-Bergé", latlng: [-14.900, 47.833], arch: "Avaratra", color: "#1f77b4"},
    {name: "Fenoarivo Atsinanana", latlng: [-17.051, 49.419], arch: "Atsinanana", color: "#ff7f0e"},
    {name: "Toamasina", latlng: [-18.149, 49.402], arch: "Atsinanana", color: "#ff7f0e"},
    {name: "Moramanga", latlng: [-18.920, 48.234], arch: "Atsinanana", color: "#ff7f0e"},
    {name: "Ambatondrazaka", latlng: [-17.833, 48.417], arch: "Atsinanana", color: "#ff7f0e"},
    {name: "Antananarivo", latlng: [-18.879, 47.507], arch: "Afovoany", color: "#2ca02c"},
    {name: "Miarinarivo", latlng: [-18.833, 46.516], arch: "Afovoany", color: "#2ca02c"},
    {name: "Tsiroanomandidy", latlng: [-18.766, 46.033], arch: "Afovoany", color: "#2ca02c"},
    {name: "Maintirano", latlng: [-18.066, 44.017], arch: "Afovoany", color: "#2ca02c"},
    {name: "Antsirabe", latlng: [-19.866, 47.033], arch: "Afovoany", color: "#2ca02c"},
    {name: "Ambositra", latlng: [-20.233, 47.083], arch: "Atsimo Atsinanana", color: "#d62728"},
    {name: "Fianarantsoa", latlng: [-21.433, 47.083], arch: "Atsimo Atsinanana", color: "#d62728"},
    {name: "Ihosy", latlng: [-22.400, 46.150], arch: "Atsimo Atsinanana", color: "#d62728"},
    {name: "Farafangana", latlng: [-22.833, 47.833], arch: "Atsimo Atsinanana", color: "#d62728"},
    {name: "Mananjary", latlng: [-21.213, 48.350], arch: "Atsimo Atsinanana", color: "#d62728"},
    {name: "Toliara", latlng: [-23.350, 43.666], arch: "Atsimo Andrefana", color: "#9467bd"},
    {name: "Morombe", latlng: [-21.716, 43.333], arch: "Atsimo Andrefana", color: "#9467bd"},
    {name: "Morondava", latlng: [-20.283, 44.283], arch: "Atsimo Andrefana", color: "#9467bd"},
    {name: "Tolagnaro", latlng: [-25.033, 46.983], arch: "Atsimo Andrefana", color: "#9467bd"},
  ];

  ngAfterViewInit(): void {
    this.map = L.map('map', {
      minZoom: 6,
      maxZoom: 10,
      zoomSnap: 0.25,
      zoomDelta: 0.25,
      maxBounds: L.latLngBounds([[-30, 40], [-8, 55]]),
      maxBoundsViscosity: 1.0
    }).setView([-19.0, 47.5], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    this.dioceses.forEach((d) => {
      const marker = L.circleMarker(d.latlng as [number, number], {
        radius: 8,
        color: d.color,
        fillColor: d.color,
        fillOpacity: 0.6,
        weight: 2
      }).addTo(this.map!);

      marker.bindPopup(`<strong>${d.name}</strong><br>Archidiocèse : ${d.arch}`);

      marker.on('mouseover', (e) => {
        (e.target as L.CircleMarker).setStyle({ fillOpacity: 1, radius: 10 });
      });
      marker.on('mouseout', (e) => {
        (e.target as L.CircleMarker).setStyle({ fillOpacity: 0.6, radius: 8 });
      });
    });
  }
}
