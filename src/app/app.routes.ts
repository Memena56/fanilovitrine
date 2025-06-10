import { Routes } from '@angular/router';
import { NotFoundComponent } from './features/not-found/not-found.component';

export const routes: Routes = [
    { path: '', loadChildren: () => import('./features/home/home.routes').then(m => m.homeRoutes) },
    { path: 'tantara', loadChildren: () => import('./features/about/about.routes').then(m => m.aboutRoutes) },
    { path: 'ivotoerana', loadChildren: () => import('./features/contact/contact.routes').then(m => m.contactRoutes) },
    { path: 'hetsika', loadChildren: () => import('./features/events/events.routes').then(m => m.eventsRoutes) },
    { path: 'shop', loadChildren: () => import('./features/articles/articles.routes').then(m => m.articlesRoutes) },
    { path: 'vaovao', loadChildren: () => import('./features/news/news.routes').then(m=> m.newsRoutes)},
    { path: 'login', loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent) },
    { path: '**', component: NotFoundComponent}
];
