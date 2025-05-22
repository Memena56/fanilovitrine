import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsService, Event } from '../events/events.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private eventService: EventsService) { }

  ngOnInit(): void {
    console.log('Home Component initialized. Attempting to fetch events...');
    this.fetchAndLogEvents();
  }

  fetchAndLogEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (data) => {
        console.log('Successfully fetched data from backend:', data);
        console.log('Connection to NestJS backend appears to be working.');
      },
      error: (error) => {
        console.error('Error fetching data from backend:', error);
        console.error('Connection test failed. Check backend server, CORS, and URL.');
      },
      complete: () => {
        console.log('Event data fetching observable complete.');
      }
    });
  }
}
