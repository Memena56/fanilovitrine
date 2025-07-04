import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticlesService, Article } from '../articles/articles.service';
import { CategoryService } from '../categories/category.service';
import { CategoryAccordeonComponent } from '../categories/category-accordeon/category-accordeon.component';
import { CategoryNode } from '../categories/category-node.model';
import { AuthService } from '../../core/auth.service';

@Component({
  standalone: true,
  selector: 'app-articles',
  imports: [CommonModule, FormsModule, CategoryAccordeonComponent],
  templateUrl: './articles.component.html',
})
export class ArticlesComponent implements OnInit {
  articles: Article[] = [];
  filteredArticles: Article[] = [];
  categories: { _id: string; name: string }[] = [];
  selectedCategoryIds: string[] = [];
  categoriesTrees: CategoryNode[] = [];

  currentPage = 1;
  totalPages = 1;
  currentSlideIndex = 0;
  searchTerm = '';

  showCategoryMenu = true;
  isMobile = false;

  isMenuOpen = false;

  constructor(
    private articleService: ArticlesService,
    private categoryService: CategoryService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.updateScreenSize();
    this.fetchCategories();
    this.fetchArticles();
  }

  @HostListener('window:resize')
  updateScreenSize() {
    this.isMobile = window.innerWidth < 768;
    this.showCategoryMenu = !this.isMobile;
  }

  toggleCategoryMenu() {
    this.showCategoryMenu = !this.showCategoryMenu;
  }

  fetchCategories() {
    this.categoryService.getTree().subscribe(tree => {(this.categoriesTrees = tree)});
  }

  fetchArticles() {
    this.articleService
      .getPaginatedArticles(this.currentPage, 9, this.selectedCategoryIds)
      .subscribe(res => {
        this.articles = res.data;
        this.filteredArticles = [...res.data];
        this.totalPages = res.lastPage;
        this.onSearchChange();
      });
  }

  toggleCategory(id: string, checked: boolean) {
    this.selectedCategoryIds = checked
      ? [...this.selectedCategoryIds, id]
      : this.selectedCategoryIds.filter(x => x !== id);
    this.currentPage = 1;
    this.fetchArticles();
  }

  onSearchChange() {
    const term = this.searchTerm.toLowerCase();
    this.filteredArticles = this.articles.filter(a =>
      a.title.toLowerCase().includes(term)
    );
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.fetchArticles();
  }

  prevSlide() {
    this.currentSlideIndex =
      this.currentSlideIndex === 0
        ? Math.max(this.articles.length - 1, 0)
        : this.currentSlideIndex - 1;
  }

  nextSlide() {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.articles.length;
  }

  goToDetail(slug: string) {
    this.router.navigate(['/shop', slug]);
  }

  goToArticlesDashboardOrLogin(){
    if(this.auth.isLoggedIn()) {
      this.router.navigate(['/shop/articles-dashboard']);
    } else {
      this.router.navigate(['/login'], {
        queryParams: { redirectTo: '/shop/articles-dashboard'}
      });
    }
  }

  onCategoryFilterChange(newIds: string[]) {
    this.selectedCategoryIds = newIds;
    this.currentPage = 1;
    this.fetchArticles();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

}
