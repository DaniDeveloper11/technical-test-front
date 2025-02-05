import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private apiUrl = 'http://localhost:5000/clients';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return { headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` }) };
  }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl, this.getAuthHeaders());
  }

  getClientById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/${id}`, this.getAuthHeaders());
  }

  createClient(client: Omit<Client, 'id' | 'createdAt'>): Observable<any> {
    return this.http.post(this.apiUrl, client, this.getAuthHeaders());
  }

  updateClient(id: number, client: Partial<Client>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, client, this.getAuthHeaders());
  }

  deleteClient(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.getAuthHeaders());
  }
}
