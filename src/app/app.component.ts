import { Component, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { BreadcrumbComponent } from './shared/components/breadcrum/breadcrum.component';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Event } from '../app/features/events/events.service';

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
export class AppComponent {
  title = 'fanilovitrine';
  showBreadCrumb = true;
  showHeaderFooter = true;

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private titleService = inject(Title);

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const hiddenRoutes = ['', 'ivotoerana', '404', 'login', 'vaovao/dashboard', 'shop/articles-dashboard'];
      const currentRoute = this.router.url.split('?')[0].replace(/^\/+/, '');

      this.showBreadCrumb = !hiddenRoutes.some(route => currentRoute === route || currentRoute.startsWith(route + '/'));

      this.showHeaderFooter = !(currentRoute.startsWith('vaovao/dashboard') || currentRoute.startsWith('shop/articles-dashboard'));

      let route = this.activatedRoute;
      while (route.firstChild) {
        route = route.firstChild;
      }

      const data = route.snapshot.data;
      console.log('Route data:', data);

      if (data['title']) {
        this.titleService.setTitle(data['title']);
      } else if (data['dynamicTitle']) {
        const event = data['event'] as Event;
        if (event && event.title) {
          this.titleService.setTitle(`${event.title} - Fanilon'I Madagasikara`);
        } else {
          this.titleService.setTitle('Fanilon\'I Madagasikara');
        }
      } else {
        this.titleService.setTitle('Fanilon\'I Madagasikara');
      }
    });
  }
}
