import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Customer } from '../../models/customer-type';
import { MinibankService } from '../../services/minibank.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AccountEventService } from '../../services/account-event.service';
import { Account } from '../../models/account-type';
import { AccountType } from '../../models/account-type.enum';
import { CustomerEventService } from '../../services/customer-event.service.service';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss',
})
export class CustomerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() customerId!: number;

  customer$?: Observable<Customer>;
  private destroy$ = new Subject<void>();

  constructor(
    private miniService: MinibankService,
    private customerEventService: CustomerEventService,
    private accountEventService: AccountEventService
  ) {}

  ngOnInit(): void {
    if (this.customerId) {
      this.loadCustomer();
    }
    this.accountEventService.accountCreated$.subscribe(() => {
      this.loadCustomer(); // Refresh the customer data when an account is created
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['customerId'] && !changes['customerId'].isFirstChange()) {
      this.loadCustomer();
    }
  }
  ngOnDestroy(): void {
    // Complete the subject to unsubscribe from all observables
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Fetch customer details by ID
  loadCustomer(): void {
    this.customer$ = this.miniService.getCustomerById(this.customerId);
    this.customer$.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.customerEventService.notifyCustomerRetrieved();
      },
      error: () => this.customerEventService.notifyCustomerRetrievalError(),
    });
  }
}
