import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ContactService, Contact } from './contact.service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, HttpClientModule, CommonModule],
  standalone: true,
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  contactData: Contact = {
    genre: 'tsy-ambara',
    age: 0,
    fivondronana: '',
    faritra: '',
    diosezy: '',
    fait: 'fampahafantarana',
    message: ''
  };

  notificationMessage = '';
  notificationType: 'success' | 'error' | '' = '';

  constructor(
    private contactService: ContactService,
    private auth: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.contactService.createContact(this.contactData).subscribe({
      next: () => {
        this.notificationMessage = "Misaotra! Nalefa soa aman-tsara ny hafatrao.";
        this.notificationType = 'success';
        this.resetForm();
        this.autoCloseNotification();
      },
      error: (err) => {
        console.error(err);
        this.notificationMessage = "Nisy olana tamin'ny fandefasana ny hafatra.";
        this.notificationType = 'error';
        this.autoCloseNotification();
      }
    });
  }

  resetForm() {
    this.contactData = {
      genre: 'tsy-ambara',
      age: 0,
      fivondronana: '',
      faritra: '',
      diosezy: '',
      fait: 'fampahafantarana',
      message: ''
    };
  }

  autoCloseNotification() {
    setTimeout(() => {
      this.notificationMessage = '';
      this.notificationType = '';
    }, 3000);
  }

  goToDashboardOrLogin() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/ivotoerana/dashboard']);
    } else {
      this.router.navigate(['/login'], {
        queryParams: { redirectTo: '/ivotoerana/dashboard'}
      });
    }
  }
}
