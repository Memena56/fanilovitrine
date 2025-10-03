import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Contact {
  _id?: string;
  genre: 'vavy' | 'lahy' | 'tsy-ambara';
  age: number;
  fivondronana?: string;
  faritra?: string;
  diosezy?: string;
  fait: 'fampahafantarana' | 'fitorohana' | 'fitoriana';
  message: string;
  status?: 'traite' | 'non-traite';
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private baseApiUrl = environment.apiUrl;
  private contactsUrl = `${this.baseApiUrl}/contacts`;

  constructor(private http: HttpClient) {}

  createContact(contactData: Partial<Contact>): Observable<Contact> {
    return this.http.post<Contact>(this.contactsUrl, contactData);
  }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.contactsUrl);
  }

  getContact(id: string): Observable<Contact> {
    return this.http.get<Contact>(`${this.contactsUrl}/${id}`);
  }

  updateContact(id: string, updateData: Partial<Contact>): Observable<Contact> {
    return this.http.patch<Contact>(`${this.contactsUrl}/${id}`, updateData);
  }

  deleteContact(id: string): Observable<any> {
    return this.http.delete<any>(`${this.contactsUrl}/${id}`);
  }
}
