import { Routes } from "@angular/router";
import { NewsComponent } from "./news.component";
import { NewsDetailComponent } from "./news-detail/news-detail.component";
import { authGuard } from "../../core/auth.guard";

export const newsRoutes: Routes = [
    { path: '', component: NewsComponent},
    { path: 'dashboard', canActivate: [authGuard], loadComponent: () => import('./news-dashboard/news-dashboard.component').then(m => m.NewsDashboardComponent)},
    { path: ':slug', component: NewsDetailComponent },
]
