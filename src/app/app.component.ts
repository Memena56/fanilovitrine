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
  showHeaderFooter = true;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const hiddenRoutes = ['', 'ivotoerana', '404', 'login', 'vaovao/dashboard', 'shop/articles-dashboard'];
      const currentRoute = event.urlAfterRedirects.split('?')[0].replace(/^\/+/, '');

      this.showBreadCrumb = !hiddenRoutes.some(route => currentRoute === route || currentRoute.startsWith(route + '/'));

      this.showHeaderFooter = ! (currentRoute.startsWith('vaovao/dashboard') || currentRoute.startsWith('shop/articles-dashboard'));

    });
  }
}
