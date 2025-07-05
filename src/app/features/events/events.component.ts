import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsService, Event } from '../events/events.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {

  events: Event[] = [];


  constructor(
    private eventsService: EventsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchEvents();
  }


  fetchEvents(): void {
    this.eventsService.getEvents().subscribe({
      next: (data) => {
        console.log('Successfully fetched events:', data);
        this.events = data.sort((a,b) => a.title.localeCompare(b.title));
      },
      error: (error) => {
        console.error('Error fetching events:', error);
      },
      complete: () => {
        console.log('Events fetching complete.');
      }
    });
  }

  goToEventDetail(slug: string){
    this.router.navigate(['/lahasa', slug]);
  }
}
