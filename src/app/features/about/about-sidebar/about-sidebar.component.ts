import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-about-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-sidebar.component.html',
  styleUrls: ['./about-sidebar.component.css']
})
export class AboutSidebarComponent {
  currentPath: string = '';
  isOpen = false;

  links = [
    { path: 'mombamomba/tantara', label: "Tantaran'ny Fikambanana" },
    { path: 'mombamomba/mpitondra', label: "Aomonie sy Filoha Iombonana nifandimby" },
    { path: 'mombamomba/aim-panahy', label: "Lovam-panahin'ny Fikambanana" },
    { path: 'mombamomba/rafitra', label: "Rafitra sy Mpikambana" },
    { path: 'mombamomba/diosezy', label: "Diosezy misy Fanilon'i Madagasikara" },
    { path: 'lahasa', label: "Lahasan'ny Fikambanana" }
  ];

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentPath = event.urlAfterRedirects.replace(/^\//, '');
      });

    this.currentPath = this.router.url.replace(/^\//, '');
  }

  navigateTo(path: string) {
    this.isOpen = false;
    this.router.navigateByUrl(path);
  }
}
