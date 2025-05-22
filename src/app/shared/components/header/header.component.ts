import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isMobileMenuOpen = false;
  isAboutFlyoutOpen = false;
  isMobileAboutSubMenuOpen = false;

  constructor() {}

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isMobileMenuOpen && this.isAboutFlyoutOpen) {
      this.isAboutFlyoutOpen = false;
    }
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    this.isMobileAboutSubMenuOpen = false;
  }

  toggleAboutFlyout() {
    this.isAboutFlyoutOpen = !this.isAboutFlyoutOpen;
    if (this.isAboutFlyoutOpen && this.isMobileMenuOpen) {
      this.isMobileMenuOpen = false;
      this.isMobileAboutSubMenuOpen = false;
    }
  }

  toggleMobileAboutSubMenu() {
    this.isMobileAboutSubMenuOpen = !this.isMobileAboutSubMenuOpen;
  }
}
