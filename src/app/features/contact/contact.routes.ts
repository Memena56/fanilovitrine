import { Routes } from "@angular/router";
import { ContactComponent } from "./contact.component";
import { authGuard } from "../../core/auth.guard";

export const contactRoutes: Routes = [
    { path: '', component: ContactComponent },
    { path: 'dashboard', canActivate: [authGuard], loadComponent: () => import ('./contact-dashboard/contact-dashboard.component').then(m => m.ContactDashboardComponent)}
]
