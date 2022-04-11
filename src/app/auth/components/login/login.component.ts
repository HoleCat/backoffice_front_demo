import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;

  constructor
  (
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')
        ]
      ],
      dni: [
        null,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(10)
        ]
      ],
      agree: [
        false,
        [
          Validators.requiredTrue
        ]
      ]
    });
  }

  get email() { return this.myForm.get('email');}
  get password() { return this.myForm.get('password');}
  get dni() { return this.myForm.get('dni');}
  get agree() { return this.myForm.get('agree');}

  //Form State
  loading = false;
  success = false;

  async submitHandler() {
    console.log('zxczxczxcxz');
    this.loading = true;
    const formValue = this.myForm.value;
    // this.userService.sign_up(formValue).subscribe(
    //   response => {
    //     console.log(response);
    //     this.loading = false;
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
  }
}
