import { Component, ElementRef, HostListener, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements AfterViewInit { // Implement AfterViewInit

  isMobileMenuOpen = false;
  isAboutFlyoutOpen = false;
  isMobileAboutSubMenuOpen = false;
  currentRoute = '';

  // Get direct references to template elements using @ViewChild
  @ViewChild('mobileMenuButton') mobileMenuButton!: ElementRef;
  @ViewChild('mobileMenuContent') mobileMenuContent!: ElementRef;

  @ViewChild('aboutFlyoutButton') aboutFlyoutButton!: ElementRef;
  @ViewChild('aboutFlyoutContent') aboutFlyoutContent!: ElementRef;

  @ViewChild('mobileAboutSubMenuButton') mobileAboutSubMenuButton!: ElementRef;
  @ViewChild('mobileAboutSubMenuContent') mobileAboutSubMenuContent!: ElementRef;

  constructor(private elementRef: ElementRef, private router: Router) {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  ngAfterViewInit() { }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // Check for mobile menu
    if (
      this.isMobileMenuOpen &&
      (!this.mobileMenuButton || !this.mobileMenuButton.nativeElement.contains(event.target as Node)) &&
      (!this.mobileMenuContent || !this.mobileMenuContent.nativeElement.contains(event.target as Node))
    ) {
      this.closeMobileMenu();
    }

    // Check for desktop "About" flyout
    if (
      this.isAboutFlyoutOpen &&
      (!this.aboutFlyoutButton || !this.aboutFlyoutButton.nativeElement.contains(event.target as Node)) &&
      (!this.aboutFlyoutContent || !this.aboutFlyoutContent.nativeElement.contains(event.target as Node))
    ) {
      this.isAboutFlyoutOpen = false;
    }

    // Check for mobile "About" sub-menu
    if (
      this.isMobileAboutSubMenuOpen &&
      (!this.mobileAboutSubMenuButton || !this.mobileAboutSubMenuButton.nativeElement.contains(event.target as Node)) &&
      (!this.mobileAboutSubMenuContent || !this.mobileAboutSubMenuContent.nativeElement.contains(event.target as Node))
    ) {
      this.isMobileAboutSubMenuOpen = false;
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isMobileMenuOpen) {
      this.isAboutFlyoutOpen = false;
      this.isMobileAboutSubMenuOpen = false;
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
