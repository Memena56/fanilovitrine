import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { BreadcrumbComponent } from './shared/components/breadcrum/breadcrum.component';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    BreadcrumbComponent,
    CommonModule,
    RouterModule
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'fanilovitrine';
  showBreadCrumb = true;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const hiddenRoutes = ['', 'ivotoerana', '404', 'login'];
  const currentRoute = event.urlAfterRedirects.replace(/^\/+/, '');

  this.showBreadCrumb = !hiddenRoutes.some(route => currentRoute === route || currentRoute.startsWith(route + '/'));

  console.log('Route:', currentRoute, 'Show breadcrumb:', this.showBreadCrumb);
    });
  }
}
