import { Routes } from "@angular/router";
import { ArticlesComponent } from "./articles.component";
import { ArticleDetailComponent } from "./article-detail/article-detail.component";
import { authGuard } from "../../core/auth.guard";

export const articlesRoutes: Routes = [
    { path: '', component: ArticlesComponent },
    { path: 'articles-dashboard', canActivate: [authGuard], loadComponent: () => import('./articles-dashboard/articles-dashboard.component').then(m => m.ArticlesDashboardComponent)},
    { path: ':slug', component: ArticleDetailComponent },
]
