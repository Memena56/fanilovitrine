import { Component, OnInit } from '@angular/core';
import { NewsService, News } from '../news/news.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-news',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit{

  categories: string[] = ['Fiofanana', 'Fifandraisana', 'Fanabeazana', 'Fitantanana', 'Iombonana', 'Fampivoarana'];
  newsList: News[] | null = null;

  selectedCategory: string | null = null;

  currentPage: number = 1;
  totalPages: number = 1;
  itemsPerPage: number = 6;

  constructor(
    private newsService: NewsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadNews();
  }

  loadNews() {
    this.newsService.getPaginatedNews(this.currentPage, this.itemsPerPage, this.selectedCategory || undefined)
    .subscribe(res =>{
      this.newsList = res.data;
      this.totalPages = res.lastPage;
    });
  }

  filterByCategory(category: string): void {
    if (this.selectedCategory === category) {
      this.selectedCategory = null;
    } else {
      this.selectedCategory = category;
    }
    this.currentPage = 1;
    this.loadNews();
  }

  clearFilters() {
    this.selectedCategory = null;
    this.currentPage = 1;
    this.loadNews();
  }

  nextPage() {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
    this.loadNews();
  }
}

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadNews();
    }
  }

  goToNewsDetail(id: string) {
    this.router.navigate(['/vaovao', id]);
  }

  trackByNewsId(index: number, item: any): string | number {
  return item.id || item._id || index;
  }

}
