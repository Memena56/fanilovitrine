import { Routes } from "@angular/router";
import { NewsComponent } from "./news.component";
import { NewsDetailComponent } from "./news-detail/news-detail.component";

export const newsRoutes: Routes = [
    { path: '', component: NewsComponent},
    // { path: ':id', component: NewsDetailComponent},
    { path: ':slug', component: NewsDetailComponent }
]
