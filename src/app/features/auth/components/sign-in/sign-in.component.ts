import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/core/interfaces/LoginUser';
import { AuthService } from 'src/app/core/services/auth.service';
import { TokenService } from 'src/app/core/services/token.service';
import { ClientComponent } from 'src/app/features/chat/components/client/client.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

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
    private fb: FormBuilder,
    private clientComponent: ClientComponent
  ) { }

  ngOnInit(): void {

    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }


    this.myForm = this.fb.group({
      userName: ['',[Validators.required]],
      password: ['',[Validators.required]]
    });
  }

  get userName() { return this.myForm.get('userName');}
  get password() { return this.myForm.get('password');}

  //Form State
  loading = false;
  success = false;

  async submitHandler() {
    console.log('login existoso');
    this.loading = true;
    const formValue = this.myForm.value;
    
    this.authService.login(formValue).subscribe(
      data =>{
        this.isLogged =true;
        this.isLoginFail=false;

        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.userName);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        this.clientComponent.sign_in = true;
        this.clientComponent.presentation_event();
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
