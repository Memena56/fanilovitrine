import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { EventsService, Event } from './events.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventResolver implements Resolve<Event> {
    constructor(private eventsService: EventsService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Event> {
        const slug = route.paramMap.get('slug')!;
        return this.eventsService.getEvent(slug); // 🔹 utilisation directe
    }
}
