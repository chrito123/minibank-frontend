import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Customer } from '../../models/customer-type';
import { MinibankService } from '../../services/minibank.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AccountEventService } from '../../services/account-event.service';
import { Account } from '../../models/account-type';
import { AccountType } from '../../models/account-type.enum';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss',
})
export class CustomerComponent implements OnInit, OnChanges {
  @Input() customerId!: number;

  customer$?: Observable<Customer>;

  constructor(private miniService: MinibankService, private accountEventService: AccountEventService) {}

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

  // Fetch customer details by ID
  loadCustomer(): void {
    this.customer$ = this.miniService.getCustomerById(this.customerId);
  }

}
