import { Routes } from "@angular/router";
import { EventsComponent } from "./events.component";
import { EventsDetailComponent } from "./events-detail.component";

export const eventsRoutes: Routes = [
    { path: '', component: EventsComponent },
    { path: ':id', component: EventsDetailComponent }
]
