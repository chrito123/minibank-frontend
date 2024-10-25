import { TestBed } from '@angular/core/testing';

import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer-type';
import { MinibankService } from './minibank.service';
import { of } from 'rxjs';
import { AccountType } from '../models/account-type.enum';

describe('MinibankService', () => {
  let service: MinibankService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new MinibankService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getCustomer should return value from observable', (done: DoneFn) => {
    const expectedCustomers:Customer[] = [ {
      id: 1,
      name: 'Alice',
      surname: 'Smith',
      accounts: [
        {
          id: 101,
          customerId: 1,
          balance: 1500,
          type: AccountType.CURRENT,
          transactions: [
            {
              id: 1001,
              accountId: 101,
              amount: 500,
              transactionDate: '2024-10-01T10:30:00'
            },
            {
              id: 1002,
              accountId: 101,
              amount: 1000,
              transactionDate: '2024-10-02T15:45:00'
            }
          ]
        }
      ]
    }];
    httpClientSpy.get.and.returnValue(of(expectedCustomers));
    service.getCustomerById(1).subscribe({
      next: (customer) => {
        expect(customer).withContext('expected customer').toEqual(expectedCustomers);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });
});
