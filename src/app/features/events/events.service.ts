import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Event {
  _id: string;
  title: string;
  introduction: string;
  content?: string;
  dateStart: string;
  dateEnd?: string;
  location?: string;
  photo?: string;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private baseApiUrl = environment.apiUrl;
  private eventsUrl = `${this.baseApiUrl}/events`;

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]>{
    return this.http.get<Event[]>(this.eventsUrl);
  }

  getEvent(id: string): Observable<Event> {
    return this.http.get<Event>(`${this.eventsUrl}/${id}`);
  }

  createEvent(eventData: Partial<Event>): Observable<Event> {
    return this.http.post<Event>(this.eventsUrl, eventData);
  }

  updateEvent(id: string, updateData: Partial<Event>): Observable<Event> {
    return this.http.patch<Event>(`${this.eventsUrl}/${id}`, updateData);
  }

  deleteEvent(id: string): Observable<any> {
    return this.http.delete<any>(`${this.eventsUrl}/${id}`);
  }

}
