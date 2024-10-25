import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MinibankService {

  private baseUrl = environment.minibankApiUrl;

  constructor(private http: HttpClient) { }

  // GET Customer by ID
  getCustomerById(id: number): Observable<any> {

    const url = `${this.baseUrl}/api/customers/${id}`;
    return this.http.get(url);
  }
  // POST create account for customer
  createAccount(id: number, initialCredit: number): Observable<any> {
    console.log("service " + id)

    const url = `${this.baseUrl}/api/customers/${id}/accounts`;
    console.log("service 2 " + url)
    const body = { initialCredit };
    return this.http.post(url, body);
  }
}
