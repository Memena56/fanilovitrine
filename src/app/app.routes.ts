import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadChildren: () => import('./features/home/home.routes').then(m => m.homeRoutes) },
    { path: 'tantara', loadChildren: () => import('./features/about/about.routes').then(m => m.aboutRoutes) },
    { path: 'ivotoerana', loadChildren: () => import('./features/contact/contact.routes').then(m => m.contactRoutes) },
    { path: 'hetsika', loadChildren: () => import('./features/events/events.routes').then(m => m.eventsRoutes) },
    { path: 'shop', loadChildren: () => import('./features/articles/articles.routes').then(m => m.articlesRoutes) }
];
