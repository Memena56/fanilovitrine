import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NewsService, News } from '../../news/news.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxEditorModule } from 'ngx-editor';
import type { NgxEditorConfig } from 'ngx-editor';
import { Editor, Toolbar } from 'ngx-editor';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../core/auth.service';

@Component({
  standalone: true,
  selector: 'app-news-dashboard',
  imports: [CommonModule, FormsModule, NgxEditorModule],
  templateUrl: './news-dashboard.component.html',
  styleUrls: ['./news-dashboard.component.css']
})
export class NewsDashboardComponent implements OnInit {
  allNews: News[] = [];

  title = '';
  introduction = '';
  content = '';
  date = new Date().toISOString().split('T')[0];
  categoryInput: string[] = [];
  photoFile?: File;
  othersPhotoFiles: File[] = [];
  othersPhotosPreview: string[] = [];
  mainPhotoPreview: string | null = null;

  isEditing = false;
  editingId: string | null = null;
  editingPhoto: string | null = null;
  editingOtherPhotos: string[] = [];
  isFormOpen = false;

  categories: string[] = ['Fanabeazana', 'Fampivoarana', 'Fifandraisana', 'Fiofanana', 'Fitantanana', 'Iombonana'];

  editor = new Editor();

  constructor(
    private newsService: NewsService,
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllNews();
  }

  getAllNews() {
    this.newsService.getNews().subscribe(news => {
      this.allNews = news.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
    });
  }

  openForm() {
    this.isFormOpen = true;
  }

  closeForm() {
    this.resetForm();
    this.isFormOpen = false;
  }

  editNews(news: News) {
    this.title = news.title;
    this.introduction = news.introduction;
    this.content = news.content;
    this.date = news.date?.split('T')[0] || new Date().toISOString().split('T')[0];
    this.categoryInput = news.category || [];

    this.editingId = news._id;
    this.isEditing = true;
    this.isFormOpen = true;

    this.editingPhoto = news.photo || null;
    this.editingOtherPhotos = [...(news.othersPhotos || [])];

    this.photoFile = undefined;
    this.othersPhotoFiles = [];
  }

  cancelEdit() {
    this.resetForm();
  }

  resetForm() {
    this.title = '';
    this.introduction = '';
    this.content = '';
    this.date = new Date().toISOString().split('T')[0];
    this.categoryInput = [];
    this.photoFile = undefined;
    this.mainPhotoPreview = null;
    this.othersPhotoFiles = [];
    this.othersPhotosPreview = [];
    this.isEditing = false;
    this.editingId = null;
    this.editingPhoto = null;
    this.editingOtherPhotos = [];
    this.isFormOpen = false;
  }

  onPhotoSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      this.photoFile = target.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.mainPhotoPreview = reader.result as string;
      };
      reader.readAsDataURL(this.photoFile);
    }
  }

  removeSelectedMainPhoto() {
    this.photoFile = undefined;
    this.mainPhotoPreview = null;
  }

  onOtherPhotosSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      this.othersPhotoFiles = Array.from(target.files);
      this.othersPhotosPreview = this.othersPhotoFiles.map(file => URL.createObjectURL(file));
    }
  }

  removeSelectedOtherPhoto(index: number) {
    this.othersPhotoFiles.splice(index, 1);
    this.othersPhotosPreview.splice(index, 1);
  }

  removeExistingOtherPhoto(index: number) {
    this.editingOtherPhotos.splice(index, 1);
  }

  async submitNews() {
    const token = localStorage.getItem('access_token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    try {
      let urls: string[] = [];

      if (this.photoFile || this.othersPhotoFiles.length > 0) {
        const formData = new FormData();
        if (this.photoFile) formData.append('files', this.photoFile);
        this.othersPhotoFiles.forEach(file => formData.append('files', file));

        const res: any = await this.http.post(`${environment.apiUrl}/upload`, formData, { headers }).toPromise();
        urls = res.urls;
      }

      const newsData: Partial<News> = {
        title: this.title,
        introduction: this.introduction,
        content: this.content,
        date: this.date,
        category: this.categoryInput,
        photo: urls[0] ?? (this.editingPhoto ? this.editingPhoto : undefined),
        othersPhotos: [...this.editingOtherPhotos, ...urls.slice(1)]
      };

      if (this.isEditing && this.editingId) {
        await this.newsService.updateNews(this.editingId, newsData).toPromise();
        alert('Vaovao nohavaozina!');
      } else {
        if (!this.photoFile) {
          alert('Sary lehibe ilaina.');
          return;
        }
        await this.newsService.createNews(newsData).toPromise();
        alert('Vaovao nampidirina!');
      }

      this.getAllNews();
      this.resetForm();
    } catch (err) {
      console.error('Erreur:', err);
      alert('Nisy olana!');
    }
  }

  deleteNews(id: string) {
    if (confirm('Hofafana tokoa ve ity vaovao ity?')) {
      this.newsService.deleteNews(id).subscribe({
        next: () => this.getAllNews(),
        error: (err) => {
          console.error('Erreur suppression:', err);
          alert('Tsy voafafa.');
        }
      });
    }
  }

  onCategoryChange(event: Event, cat: string) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      if (!this.categoryInput.includes(cat)) {
        this.categoryInput.push(cat);
      }
    } else {
      this.categoryInput = this.categoryInput.filter(c => c !== cat);
    }
  }

  logout() {
  this.authService.logout();
  }

}
