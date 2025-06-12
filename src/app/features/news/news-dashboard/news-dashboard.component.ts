import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NewsService } from '../../news/news.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxEditorModule } from 'ngx-editor';
import { Editor } from 'ngx-editor';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-news-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxEditorModule],
  templateUrl: './news-dashboard.component.html',
  styleUrls: ['./news-dashboard.component.css']
})
export class NewsDashboardComponent {
  title = '';
  introduction = '';
  content = '';
  date = new Date().toISOString().split('T')[0];
  categoryInput: string[] = [];
  photoFile?: File;
  othersPhotoFiles: File[] = [];

  categories: string[] = [
    'Fiofanana', 'Fifandraisana', 'Fanabeazana', 'Fitantanana', 'Iombonana', 'Fampivoarana'
  ];

  editor = new Editor();

  constructor(
    private newsService: NewsService,
    private http: HttpClient,
    private router: Router
  ) {}

  onPhotoSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      this.photoFile = target.files[0];
    }
  }

  onOtherPhotosSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      this.othersPhotoFiles = Array.from(target.files);
    }
  }

  async submitNews() {
    if (!this.photoFile) {
      alert('Image principale obligatoire.');
      return;
    }

    const formData = new FormData();
    formData.append('files', this.photoFile);
    this.othersPhotoFiles.forEach(file => formData.append('files', file));

    const token = localStorage.getItem('access_token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    try {

      console.log('🔐 Token envoyé:', token);
      console.log('📤 Envoi vers:', `${environment.apiUrl}/upload`);
      console.log('📦 FormData contient:', formData.getAll('files'));

      const res: any = await this.http.post(`${environment.apiUrl}/upload`, formData, {headers}).toPromise();
      const urls: string[] = res.urls;

      const newsData = {
        title: this.title,
        introduction: this.introduction,
        content: this.content,
        date: this.date,
        category: this.categoryInput,
        photo: urls[0],
        othersPhotos: urls.slice(1)
      };

      await this.newsService.createNews(newsData).toPromise();
      alert('Vaovao nampidirina!');
      this.router.navigate(['/vaovao']);
    } catch (err) {
      console.error('Erreur lors de l\'upload ou création:', err);
      alert('Nisy olana!');
    }
  }

  onCategoryChange(event: Event, cat: string) {
  const checked = (event.target as HTMLInputElement).checked;
  if (checked) {
    this.categoryInput.push(cat);
  } else {
    const index = this.categoryInput.indexOf(cat);
    if (index > -1) {
      this.categoryInput.splice(index, 1);
    }
  }
  }

}
