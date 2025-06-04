import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService, News } from '../news.service';

@Component({
  selector: 'app-news-detail',
  imports: [],
  templateUrl: './news-detail.component.html',
  styleUrl: './news-detail.component.css'
})
export class NewsDetailComponent implements OnInit {
  newsItem!: News;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if(id) {
      this.newsService.getNew(id).subscribe((data) => {
        this.newsItem = data;
      });
    }
  }
}
