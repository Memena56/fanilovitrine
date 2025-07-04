import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService, Article } from '../articles.service';

@Component({
  standalone: true,
  selector: 'app-article-detail',
  imports: [CommonModule],
  templateUrl: './article-detail.component.html',
})
export class ArticleDetailComponent implements OnInit {
  article: Article | null = null;
  selectedImage: string | null = null;
  zoomOrigin = 'center center';
  isZooming = false;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private articleService: ArticlesService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) this.loadArticle(slug);
    });
  }

  loadArticle(slug: string) {
    this.articleService.getArticleBySlug(slug).subscribe({
      next: data => {
        this.article = data;
      },
      error: () => this.router.navigate(['/404'])
    });
  }

  zoom(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    this.zoomOrigin = `${x}% ${y}%`;
    this.isZooming = true;
  }

  resetZoom(): void {
    this.isZooming = false;
  }
}
