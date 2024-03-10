import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
declare let $: any;

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent {
  errorMessage: string = '';
  constructor(private _auth: AuthService, private _Router: Router) {}

  ForgetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  ForgetPasswordSubmit(Form: FormGroup) {
    this._auth.forgotPasswords(Form.value).subscribe({
      next: (data) => {
        console.log(data);
        if (data.statusMsg == 'success') {
          $('.resetCode').fadeIn(1000);
          $('.forgetPassword').fadeOut(1000);
        }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }

  ResetCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[0-9]+$/),
    ]),
  });

  ResetCodeSubmit(Form: FormGroup) {
    this._auth.verifyResetCode(Form.value).subscribe({
      next: (data) => {
        console.log(data);
        if (data.status == 'Success') {
          this._Router.navigate(['/resetPassword']);
        }
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
      },
      complete: () => {},
    });
    console.log(Form.value);
  }
}
