import { Routes } from "@angular/router";
import { EventsComponent } from "./events.component";
import { EventsDetailComponent } from "./events-detail.component";
import { EventResolver } from "./event.resolver";

export const eventsRoutes: Routes = [
    { path: '', component: EventsComponent, data: { title: 'Lahasa - Fanilon\'I Madagasikara' } },
    {
        path: ':slug',
        component: EventsDetailComponent,
        resolve: { event: EventResolver },
        data: { dynamicTitle: true }
    }
];
