import { Component, OnInit } from '@angular/core';
import { NewsService, News } from '../news/news.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

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

  categories: string[] = ['Fanabeazana', 'Fampivoarana', 'Fifandraisana', 'Fiofanana', 'Fitantanana', 'Iombonana'];
  newsList: News[] | null = null;

  selectedCategory: string[] = [];

  currentPage: number = 1;
  totalPages: number = 1;
  itemsPerPage: number = 6;

  constructor(
    private newsService: NewsService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadNews();
  }

  loadNews() {
    this.newsService.getPaginatedNews(
      this.currentPage,
      this.itemsPerPage,
      this.selectedCategory
    )    .subscribe(res =>{
      this.newsList = res.data;
      this.totalPages = res.lastPage;
    });
  }

  filterByCategory(category: string): void {
    const index = this.selectedCategory.indexOf(category);
    if (index > -1) {
      this.selectedCategory.splice(index, 1);
    } else {
      this.selectedCategory.push(category);
    }
    this.currentPage = 1;
    this.loadNews();
  }

  clearFilters() {
    this.selectedCategory = [];
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

  goToNewsDetail(slug: string) {
    this.router.navigate(['/vaovao', slug]);
  }

  trackByNewsId(index: number, item: any): string | number {
  return item.id || item._id || index;
  }

  goToDashboardOrLogin() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/vaovao/dashboard']);
    } else {
      this.router.navigate(['/login']);
    }
  }


}
