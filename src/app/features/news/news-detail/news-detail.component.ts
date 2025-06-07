import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
  newsItem!: News;
  safeContent!: SafeHtml;
  album: Array<{ src: string; thumb: string; caption?: string }> = [];

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private sanitizer: DomSanitizer,
    private lightbox: Lightbox,
    private router: Router
  ) {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if(slug) {
      this.newsService.getNew(slug).subscribe({
      next: (data) => {
        if (data) {
          this.newsItem = data;
          this.safeContent = this.sanitizer.bypassSecurityTrustHtml(data.content || '');
          this.prepareAlbum(data.othersPhotos || []);
        } else {
          this.router.navigate(['/404']);
        }
      },
      error: () => {
        this.router.navigate(['/404']);
      }
    });
    }
  }

  prepareAlbum(photos: string[]) {
    this.album = photos.map((url) => ({
      src: url,
      thumb: url,
    }));
  }

  openLightbox(index: number): void {
    this.lightbox.open(this.album, index);
  }

  closeLightbox(): void {
    this.lightbox.close();
  }
}
