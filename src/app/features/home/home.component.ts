import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsService, Event } from '../events/events.service';
import { NewsService, News } from '../news/news.service';

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

  newsItems: News[] = [];
  private readonly NEWS_LIMIT = 4;

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    console.log('Home Component initialized. Attempting to fetch news...');
    this.fetchAndDisplayLatestNews();
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
}
