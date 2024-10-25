import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Customer } from '../../models/Customer';
import { MinibankService } from '../../services/minibank.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

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

  constructor(private miniService: MinibankService) {}

  ngOnInit(): void {
    if (this.customerId) {
      this.loadCustomer();
    }
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
