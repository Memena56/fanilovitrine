import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsService, Event } from '../events/events.service';
import { NewsService, News } from '../news/news.service';
import { Router } from '@angular/router';
// import { DiocesesMapComponent } from '../dioceses-map/dioceses-map.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    // DiocesesMapComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {

  counters = [
  { label: 'totalMembers', value: 0, target: 40000 },
  { label: 'dioceses', value: 0, target: 22 }
  ];
  animationDuration = 2000;

  newsItems: News[] = [];
  events: Event[] = [];

  constructor(
    private newsService: NewsService,
    private eventsService: EventsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log('Home Component initialized. Attempting to fetch news...');
    this.fetchAndDisplayLatestNews();
    this.fetchEvents();
    this.counters.forEach(counter => this.animateCounter(counter));
  }

  animateCounter(counter: { value: number; target: number }) {
  const startTime = performance.now();
  const duration = this.animationDuration;

  const update = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    counter.value = Math.floor(progress * counter.target);

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  };

  requestAnimationFrame(update);
  }

  fetchAndDisplayLatestNews(): void {
  this.newsService.getLatestNews().subscribe({
    next: (data) => {
      console.log('Successfully fetched latest news:', data);
      this.newsItems = data;
    },
    error: (error) => {
      console.error('Error fetching latest news:', error);
    },
    complete: () => {
      console.log('Latest news data fetching complete.');
    }
  });
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

  goToNewsDetail(slug: string) {
    this.router.navigate(['/vaovao', slug]);
  }

  goToEventDetail(slug: string){
    this.router.navigate(['/lahasa', slug]);
  }
}
