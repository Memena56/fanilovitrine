import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService, Contact } from '../contact.service';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-contact-dashboard',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './contact-dashboard.component.html',
  styleUrl: './contact-dashboard.component.css'
})
export class ContactDashboardComponent implements OnInit {
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];

  selectedFait: string = 'all';
  selectedStatus: string = 'all';
  sortOrder: 'asc' | 'desc' = 'desc';

  constructor(
    private contactService: ContactService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts() {
    this.contactService.getContacts().subscribe({
      next: (data) => {
        this.contacts = data;
        this.applyFilters();
      },
      error: (err) => {
        console.error('Erreur lors du chargement des contacts:', err);
      },
    });
  }

  applyFilters() {
    let filtered = [...this.contacts];

    if (this.selectedFait !== 'all') {
      filtered = filtered.filter(c => c.fait === this.selectedFait);
    }

    if (this.selectedStatus !== 'all') {
      filtered = filtered.filter(c => c.status === this.selectedStatus);
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt || '').getTime();
      const dateB = new Date(b.createdAt || '').getTime();
      return this.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    this.filteredContacts = filtered;
  }

  toggleStatus(contact: Contact) {
    const newStatus = contact.status === 'traite' ? 'non-traite' : 'traite';
    this.contactService.updateContact(contact._id!, { status: newStatus }).subscribe({
      next: (updated) => {
        contact.status = updated.status;
        this.applyFilters();
      },
      error: (err) => console.error('Erreur mise à jour:', err),
    });
  }

  deleteContact(contact: Contact) {
    if (confirm('Voulez-vous vraiment supprimer ce message ?')) {
      this.contactService.deleteContact(contact._id!).subscribe({
        next: () => {
          this.contacts = this.contacts.filter(c => c._id !== contact._id);
          this.applyFilters();
        },
        error: (err) => console.error('Erreur suppression:', err),
      });
    }
  }

  logout() {
    this.authService.logout();
  }
}
