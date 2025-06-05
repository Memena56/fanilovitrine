import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService, Event } from '../events.service';

@Component({
  selector: 'app-event-detail',
  imports: [],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css'
})
export class EventDetailComponent implements OnInit{
  eventsItem!: Event;

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService
  ){}

  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      if(id) {
        this.eventsService.getEvent(id).subscribe((data) => {
          this.eventsItem = data;
        });
      }
  }
}
