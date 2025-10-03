import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService, News } from '../news.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Lightbox } from 'ngx-lightbox';
import { LightboxModule } from 'ngx-lightbox';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-detail',
  imports: [
    CommonModule,
    LightboxModule,
  ],
  templateUrl: './news-detail.component.html',
  styleUrl: './news-detail.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class NewsDetailComponent implements OnInit {
  @ViewChild('galleryContainer') galleryContainer!: ElementRef;
  newsItem!: News;
  safeContent!: SafeHtml;
  album: Array<{ src: string; thumb: string; caption?: string }> = [];
  relatedNews: News[] = [];

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private sanitizer: DomSanitizer,
    private lightbox: Lightbox,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
    if(slug) {
      this.loadNews(slug);
    }
    });
  }

  loadNews(slug: string) {
    this.newsService.getNew(slug).subscribe({
      next: (data) => {
        if(data) {
          this.newsItem = data;
          this.safeContent = this.sanitizer.bypassSecurityTrustHtml(data.content || '');
          this.prepareAlbum(data.othersPhotos || []);
          this.loadRelatedNews(data);
        } else {
          this.router.navigate(['/404']);
        }
      },
      error: () => {
        this.router.navigate(['/404']);
      }
    });
  }

  prepareAlbum(photos: string[]) {
    this.album = photos.map((url) => ({
      src: url,
      thumb: url,
    }));
  }

  loadRelatedNews(currentNews: News) {
    const category = currentNews.category?.[0];
    if(category) {
      this.newsService.getNewsByCategory(category).subscribe(newsList => {
        this.relatedNews = newsList
        .filter(news => news.slug !== currentNews.slug)
        .slice(0, 4);
      });
    }
  }

  openLightbox(index: number): void {
    this.lightbox.open(this.album, index);
  }

  closeLightbox(): void {
    this.lightbox.close();
  }

  goToNewsDetail(slug: string) {
    this.router.navigate(['/vaovao', slug]);
  }

  scrollGallery(direction: number) {
    const container = this.galleryContainer.nativeElement;
    const scrollAmount = 300; // largeur à scroller par clic
    container.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
  }
}
