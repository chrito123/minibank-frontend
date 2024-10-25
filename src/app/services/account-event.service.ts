
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountEventService {
  private accountCreatedSource = new Subject<void>();

  accountCreated$ = this.accountCreatedSource.asObservable();

  notifyAccountCreated(): void {
    this.accountCreatedSource.next();
  }
}
