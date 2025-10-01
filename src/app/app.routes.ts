import { Routes } from '@angular/router';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { RedirectIfLoggedInGuard } from './core/redirect-if-logged-in.guard';

export const routes: Routes = [
    { path: '', loadChildren: () => import('./features/home/home.routes').then(m => m.homeRoutes),
        data: { title: 'Tongasoa'}
    },
    { path: 'mombamomba', loadChildren: () => import('./features/about/about.routes').then(m => m.aboutRoutes),
        data: { title: 'Momba anay'}
    },
    { path: 'ivotoerana', loadChildren: () => import('./features/contact/contact.routes').then(m => m.contactRoutes),
        data: { title: 'Ivotoeran\'ny Mahery fo'}
    },
    { path: 'lahasa', loadChildren: () => import('./features/events/events.routes').then(m => m.eventsRoutes),
        data: { title: 'Lahasa'}
    },
    { path: 'shop', loadChildren: () => import('./features/articles/articles.routes').then(m => m.articlesRoutes),
        data: { title: 'My Fanilo Shop'}
    },
    { path: 'vaovao', loadChildren: () => import('./features/news/news.routes').then(m=> m.newsRoutes),
        data: { title: 'Vaovao'}
    },
    { path: 'login', loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent), canActivate: [RedirectIfLoggedInGuard],
        data: { title: 'Login'}
    },
    { path: '**', component: NotFoundComponent,
        data: { title: 'Pejy tsy hita'}
    }
];
