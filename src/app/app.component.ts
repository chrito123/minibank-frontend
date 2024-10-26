import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomerComponent } from './components/customer/customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { AccountEventService } from './services/account-event.service';
import { CommonModule } from '@angular/common';
import { CustomerEventService } from './services/customer-event.service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CustomerComponent,
    ReactiveFormsModule,
    FormsModule,
    CreateAccountComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'minibank';
  customerRetrieved = false;
  retrievedCustomer$ = this.customerEventService.customerRetrieved$;

  ngOnInit(): void {
    this.customerEventService.customerRetrieved$.subscribe({
      next: () => {
        this.customerRetrieved = true;
      }
    });
    this.customerEventService.customerNotRetrieved$.subscribe({
      next: () => {
        this.customerRetrieved = false;
      }
    });
  }
  constructor(private customerEventService: CustomerEventService) {}
  customerId: number = 0;
  update(id: number) {
    this.customerId = id;
  }
}
