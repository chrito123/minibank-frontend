import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MinibankService } from '../../services/minibank.service';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss'
})
export class CreateAccountComponent {
  createAccountForm: FormGroup;
  @Input() customerId!: number;

  constructor(private fb: FormBuilder, private miniService: MinibankService) {
    this.createAccountForm = this.fb.group({
      initialCredit: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit(): void {
    if (this.createAccountForm.valid) {
      const {  initialCredit } = this.createAccountForm.value;
      console.log("component " + this.customerId)
      this.miniService.createAccount(this.customerId, initialCredit).subscribe({
        next : (response)  =>
          console.log('Account created successfully', response),

        error :(err) =>
          console.error('Error creating account', err),

    });
    }
  }
}
