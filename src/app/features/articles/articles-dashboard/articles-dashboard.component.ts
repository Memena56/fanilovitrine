import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ArticlesService, Article } from '../articles.service';
import { AuthService } from '../../../core/auth.service';
import { CategoryService } from '../../categories/category.service';
import { CategoryNode } from '../../categories/category-node.model';

@Component({
  standalone: true,
  selector: 'app-articles-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './articles-dashboard.component.html',
  styleUrls: ['./articles-dashboard.component.css']
})
export class ArticlesDashboardComponent implements OnInit {
  articles: Article[] = [];

  title = '';
  slug = '';
  description = '';
  price = 0;
  currency = 'Ar';
  stock = 0;
  sizesInput = '';
  tagsInput = '';
  sizes: string[] = [];
  tags: string[] = [];

  imageFiles: File[] = [];
  previewImages: string[] = [];
  editingImages: string[] = [];

  isEditing = false;
  editingId: string | null = null;
  isFormOpen = false;

  categories: CategoryNode[] = [];
  selectedCategoryId: string = '';

  constructor(
    private articlesService: ArticlesService,
    private authService: AuthService,
    private categoryService: CategoryService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadArticles();
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getTree().subscribe({
      next: res => this.categories  = res,
      error: err => console.error('Erreur chargement catégories:', err)
    });
  }

  loadArticles() {
    this.articlesService.getPaginatedArticles(1, 100).subscribe({
      next: res => {
        this.articles = res.data;
      },
      error: err => {
        console.error('Erreur chargement articles:', err);
      }
    });
  }

  openForm() {
    this.isFormOpen = true;
  }

  closeForm() {
    this.resetForm();
    this.isFormOpen = false;
  }

  editArticle(article: Article) {
    this.title = article.title;
    this.slug = article.slug;
    this.description = article.description;
    this.price = article.price;
    this.currency = article.currency;
    this.stock = article.stock;
    this.sizes = article.sizes;
    this.tags = article.tags;
    this.sizesInput = article.sizes.join(', ');
    this.tagsInput = article.tags.join(', ');
    this.selectedCategoryId = article.category?._id || '';
    this.editingImages = [...article.images];

    this.editingId = article._id;
    this.isEditing = true;
    this.isFormOpen = true;

    this.imageFiles = [];
    this.previewImages = [];
    console.log('ID à modifier:', this.editingId);
  }

  resetForm() {
    this.title = '';
    this.slug = '';
    this.description = '';
    this.price = 0;
    this.currency = 'Ar';
    this.stock = 0;
    this.sizesInput = '';
    this.tagsInput = '';
    this.sizes = [];
    this.tags = [];
    this.imageFiles = [];
    this.previewImages = [];
    this.editingImages = [];
    this.isEditing = false;
    this.editingId = null;
    this.isFormOpen = false;
  }

  onSizesInputChange(value: string) {
    this.sizesInput = value;
    this.sizes = value.split(',').map(s => s.trim()).filter(Boolean);
  }

  onTagsInputChange(value: string) {
    this.tagsInput = value;
    this.tags = value.split(',').map(t => t.trim()).filter(Boolean);
  }

  onImageFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    this.imageFiles = Array.from(input.files);
    this.previewImages = this.imageFiles.map(file => URL.createObjectURL(file));
  }

  removeSelectedImage(index: number) {
    this.imageFiles.splice(index, 1);
    this.previewImages.splice(index, 1);
  }

  removeExistingImage(index: number) {
    this.editingImages.splice(index, 1);
  }

  async uploadImages(): Promise<string[]> {
    if (this.imageFiles.length === 0) return [];

    const formData = new FormData();
    this.imageFiles.forEach(file => formData.append('files', file));

    const token = localStorage.getItem('access_token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    try {
      const res: any = await this.http.post(`${environment.apiUrl}/upload`, formData, { headers }).toPromise();
      return res.urls || [];
    } catch (err) {
      console.error('Erreur upload images:', err);
      throw err;
    }
  }

  async submitArticle() {
    const token = localStorage.getItem('access_token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    try {
      const newUrls = await this.uploadImages();
      const images = [...this.editingImages, ...newUrls];

      const payload = {
        title: this.title,
        slug: this.slug,
        description: this.description,
        price: this.price,
        currency: this.currency,
        stock: this.stock,
        sizes: this.sizes,
        tags: this.tags,
        category: this.selectedCategoryId,
        images
      };

      if (this.isEditing && this.editingId) {
        await this.http.patch(`${environment.apiUrl}/shops/${this.editingId}`, payload, { headers }).toPromise();
        alert('Article mis à jour');
      } else {
        if (images.length === 0) {
          alert('Veuillez importer au moins une image.');
          return;
        }
        await this.http.post(`${environment.apiUrl}/shops`, payload, { headers }).toPromise();
        alert('Article ajouté');
      }

      this.loadArticles();
      this.resetForm();

    } catch (err) {
      console.error('Erreur enregistrement:', err);
      alert('Erreur lors de l\'enregistrement de l\'article.');
    }
  }

  deleteArticle(id: string) {
    if (!confirm('Voulez-vous vraiment supprimer cet article ?')) return;

    const token = localStorage.getItem('access_token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.delete(`${environment.apiUrl}/shops/${id}`, { headers }).subscribe({
      next: () => {
        alert('Article supprimé');
        this.loadArticles();
      },
      error: err => {
        console.error('Erreur suppression:', err);
        alert('Erreur lors de la suppression');
      }
    });
  }

  getCategoryOptions(categories: CategoryNode[], level: number = 0): { _id: string, name: string }[] {
    const options: { _id: string, name: string }[] = [];
    for (const category of categories) {
      options.push({ _id: category._id, name: `${'— '.repeat(level)}${category.name}` });
      if (category.children && category.children.length > 0) {
        options.push(...this.getCategoryOptions(category.children, level + 1));
      }
    }
    return options;
  }

  logout() {
    this.authService.logout();
  }
}
