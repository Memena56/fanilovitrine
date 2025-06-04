import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsService, Event } from '../events/events.service';
import { NewsService, News } from '../news/news.service';
import { Router } from '@angular/router';

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

  counters = [
  { label: 'totalMembers', value: 0, target: 40000 },
  { label: 'dioceses', value: 0, target: 22 }
  ];
  animationDuration = 2000;

  newsItems: News[] = [];
  events: Event[] = [];
  private readonly NEWS_LIMIT = 4;

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
    this.newsService.getNews().subscribe({
      next: (data) => {
        console.log('Successfully fetched data from backend:', data);

        // Sort the news by date in descending order
        const sortedNews = data.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB.getTime() - dateA.getTime();
        });

        this.newsItems = sortedNews.slice(0, this.NEWS_LIMIT);

        console.log(`Displaying ${this.newsItems.length} latest news items.`);
        console.log('Connection to NestJS backend appears to be working.');
      },
      error: (error) => {
        console.error('Error fetching data from backend:', error);
        console.error('Connection test failed. Check backend server, CORS, and URL.');
      },
      complete: () => {
        console.log('News data fetching observable complete.');
      }
    });
  }

  fetchEvents(): void {
    this.eventsService.getEvents().subscribe({
      next: (data) => {
        console.log('Successfully fetched events:', data);
        this.events = data;
      },
      error: (error) => {
        console.error('Error fetching events:', error);
      },
      complete: () => {
        console.log('Events fetching complete.');
      }
    });
  }

  goToNewsDetail(id: string) {
    this.router.navigate(['/vaovao', id]);
  }
}
