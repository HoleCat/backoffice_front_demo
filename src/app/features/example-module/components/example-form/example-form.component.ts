import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExampleDataService } from '../../services/example-data/example-data.service';

@Component({
  selector: 'app-example-form',
  templateUrl: './example-form.component.html',
  styleUrls: ['./example-form.component.css']
})
export class ExampleFormComponent implements OnInit {
  myForm: FormGroup;
  btn_text: string = "Sign in";
  constructor
  (
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private exampledataservice: ExampleDataService,
    private dialogref: MatDialogRef<ExampleFormComponent>
  ) {}

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
    if(this.data !== undefined) {
      if(this.data._id !== undefined)
      {
        this.btn_text = this.data.btn_text;
        this.myForm.setValue({
          email:this.data.email,
          password:this.data.password,
          dni: this.data.dni,
          agree: this.data.agree
        });
      }
    }
  }

  get email() { return this.myForm.get('email');}
  get password() { return this.myForm.get('password');}
  get dni() { return this.myForm.get('dni');}
  get agree() { return this.myForm.get('agree');}

  //Form State
  loading = false;
  success = false;

  async submitHandler() {
    this.loading = true;
    const formValue = this.myForm.value;
    console.log('data for patch ',formValue)
    if(this.data !== undefined && this.data !== null){
      if(this.data._id !== undefined && this.data.action === "update"){
        this.exampledataservice._update_example_data({
          data:formValue,
          _id: this.data._id
        })
        .subscribe(
          (response:any) => {
            //console.log(response);
            //this.table.loadDataPage();
            this.dialogref.close()
          },
          error => {
            console.log(error)
          }
        );
      }
    }
    else {
      this.exampledataservice._add_example_data(formValue)
      .subscribe(
        (response:any) => {
          //console.log(response);
          //this.table.loadDataPage();
          this.dialogref.close()
        },
        error => {
          console.log(error)
        }
      );
    }
  }

}
