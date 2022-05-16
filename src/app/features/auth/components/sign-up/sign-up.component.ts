import { partitionArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/core/interfaces/LoginUser';
import { AuthService } from 'src/app/core/services/auth.service';
import { DocumentTypeService } from 'src/app/core/services/document_type.service';
import { TokenService } from 'src/app/core/services/token.service';
import { ClientComponent } from 'src/app/features/chat/components/client/client.component';
import { Document_type } from 'src/app/features/chat/interfaces/Document_type';
import { Status } from 'src/app/features/chat/interfaces/Status';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  myForm: FormGroup;
  isLogged = false;
  isLoginFail = false;
  roles: string[] = [];
  document_types: Document_type[] = [];
  errMsj: string;
  currentDate = new Date();

  constructor
  (
    private tokenService: TokenService,
    private authService: AuthService,
    private document_typeService: DocumentTypeService,
    private router: Router,
    private fb: FormBuilder,
    private clienteComponent: ClientComponent
  ) { }

  status: Status = {
    id: 2,
    description: '',
    created_by: null,
    created_at: '',
    updated_by: null,
    updated_at: '',
    status_type: null
  }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }

    this.document_typeService.listDocument_type().subscribe(data=>this.document_types=data);
    this.myForm = this.fb.group({
      name: ['',[ Validators.required]],
      last_name: ['',[ Validators.required]],
      userName: ['',[Validators.required]],
      email: ['',[Validators.required]],
      password: ['',[Validators.required]],
      document_number: ['',[Validators.required]],
      phone: ['',[Validators.required]],
      photo: ['',[Validators.required]],
      created_by: [1,[Validators.required]],
      created_at: [this.currentDate,[Validators.required]],
      updated_by: [1,[Validators.required]],
      updated_at: [this.currentDate,[Validators.required]],
      document_type: ['',[Validators.required]],
      status: [this.status,[Validators.required]],
    });
  }

  get name() { return this.myForm.get('name');}
  get last_name() { return this.myForm.get('last_name');}
  get userName() { return this.myForm.get('userName');}
  get email() { return this.myForm.get('email');}
  get password() { return this.myForm.get('password');}
  get document_number() { return this.myForm.get('document_number');}
  get phone() { return this.myForm.get('phone');}
  get photo() { return this.myForm.get('photo');}

  loginUser: LoginUser = {
    userName: '',
    password: ''
  }

    //Form State
    loading = false;
    success = false;
  
    async submitHandler() {
      console.log('registro exitoso');
      this.loading = true;
      const formValue = this.myForm.value;
      this.authService.register(formValue).subscribe(
        data =>{

          this.loginUser.userName = this.userName.value;
          this.loginUser.password = this.password.value;

          console.log(this.loginUser);

          this.login();
        },
        err =>{
          this.isLogged = false;
          this.isLoginFail= true;
          this.errMsj = err.error.mensaje;
          console.log(err.error.message);
          
        }
      );
    }

    login(){
      console.log('login existoso');
      this.loading = true;
      
      this.authService.login(this.loginUser).subscribe(
        data =>{
          this.isLogged =true;
          this.isLoginFail=false;

          this.tokenService.setToken(data.token);
          this.tokenService.setUserName(data.userName);
          this.tokenService.setAuthorities(data.authorities);
          this.roles = data.authorities;
          this.clienteComponent.presentation_event();
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
