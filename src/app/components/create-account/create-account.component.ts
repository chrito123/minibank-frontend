import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MinibankService } from '../../services/minibank.service';
import { AccountEventService } from '../../services/account-event.service';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss',
})
export class CreateAccountComponent {
  createAccountForm: FormGroup;
  @Input() customerId!: number;

  constructor(
    private fb: FormBuilder,
    private miniService: MinibankService,
    private accountEventService: AccountEventService
  ) {
    this.createAccountForm = this.fb.group({
      initialCredit: ['', [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit(): void {
    if (this.createAccountForm.valid) {
      const { initialCredit } = this.createAccountForm.value;
      this.miniService.createAccount(this.customerId, initialCredit).subscribe({
        next: (response) =>{
          this.accountEventService.notifyAccountCreated(),
          this.createAccountForm.get('initialCredit')?.reset(0)//init the controler to 0
        },

        error: (err) => console.error('Error creating account', err),
      });
    }
  }
}
