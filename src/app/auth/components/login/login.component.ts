import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/core/interfaces/LoginUser';
import { AuthService } from 'src/app/core/services/auth.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  myForm: FormGroup;
  isLogged = false;
  isLoginFail = false;
  loginuser: LoginUser;
  roles: string[] = [];
  errMsj: string;

  constructor
  (
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }


    this.myForm = this.fb.group({
      userName: [
        '',
        [
          Validators.required,
          //Validators.email
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          //Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')
        ]
      ]
      // dni: [
      //   null,
      //   [
      //     Validators.required,
      //     Validators.minLength(8),
      //     Validators.maxLength(10)
      //   ]
      // ],
      // agree: [
      //   false,
      //   [
      //     Validators.requiredTrue
      //   ]
      // ]
    });
  }

  get userName() { return this.myForm.get('userName');}
  get password() { return this.myForm.get('password');}
  //get dni() { return this.myForm.get('dni');}
  //get agree() { return this.myForm.get('agree');}

  //Form State
  loading = false;
  success = false;

  async submitHandler() {
    console.log('login existoso');
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
    this.authService.login(formValue).subscribe(
      data =>{
        this.isLogged =true;
        this.isLoginFail=false;

        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.userName);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        this.router.navigate(["/dashboard/my-chat/index"])
      },
      err =>{
        this.isLogged = false;
        this.isLoginFail= true;
        this.errMsj = err.error.mensaje;
        console.log(err.error.message);
        
      }
    );
  }
}
