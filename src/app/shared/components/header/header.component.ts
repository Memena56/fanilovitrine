import { Component, ElementRef, HostListener } from '@angular/core';
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

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.isMobileMenuOpen && !this.elementRef.nativeElement.contains(event.target as Node)) {
      this.closeMobileMenu();
    }
    const aboutFlyoutButton = this.elementRef.nativeElement.querySelector('#aboutFlyoutButton');
    const aboutFlyoutContent = this.elementRef.nativeElement.querySelector('#aboutFlyoutContent');

    if (
      this.isAboutFlyoutOpen &&
      !aboutFlyoutButton?.contains(event.target as Node) &&
      !aboutFlyoutContent?.contains(event.target as Node)
    ) {
      this.isAboutFlyoutOpen = false;
    }

    const mobileAboutSubMenuButton = this.elementRef.nativeElement.querySelector('#mobileAboutSubMenuButton');
    const mobileAboutSubMenuContent = this.elementRef.nativeElement.querySelector('#mobileAboutSubMenuContent');

    if (
      this.isMobileAboutSubMenuOpen &&
      !mobileAboutSubMenuButton?.contains(event.target as Node) &&
      !mobileAboutSubMenuContent?.contains(event.target as Node)
    ) {
      this.isMobileAboutSubMenuOpen = false;
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isMobileMenuOpen) {
      this.isAboutFlyoutOpen = false;
    }
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    this.isMobileAboutSubMenuOpen = false;
  }

  toggleAboutFlyout() {
    this.isAboutFlyoutOpen = !this.isAboutFlyoutOpen;
    if (this.isAboutFlyoutOpen) {
      this.isMobileMenuOpen = false;
      this.isMobileAboutSubMenuOpen = false;
    }
  }

  toggleMobileAboutSubMenu() {
    this.isMobileAboutSubMenuOpen = !this.isMobileAboutSubMenuOpen;
  }
}
