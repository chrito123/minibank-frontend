import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerEventService {
  private customerRetrievedSource = new Subject<void>();
  private customerNotRetrievedSource = new Subject<void>();
  customerRetrieved$ = this.customerRetrievedSource.asObservable();
  customerNotRetrieved$ = this.customerNotRetrievedSource.asObservable();

  notifyCustomerRetrieved(): void {

    this.customerRetrievedSource.next();
  }
  notifyCustomerRetrievalError(): void {
    this.customerNotRetrievedSource.next();
  }
  constructor() { }
}
