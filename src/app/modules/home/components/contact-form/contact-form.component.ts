import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExampleDataService } from '../../../example-module/services/example-data/example-data.service';
import { ContactService } from '../../services/contact/contact.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalContactResponseComponent } from '../modal-contact-response/modal-contact-response.component';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  myForm: FormGroup;
  btn_text: string = "Enviar Datos";
  constructor
  (
    private fb: FormBuilder,
    private contactservice: ContactService,
    public dialog: MatDialog
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
      name: [
        '',
        [
          Validators.required
        ]
      ],
      lastname: [
        '',
        [
          Validators.required
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
      phone: [
        null,
        [
          Validators.required
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
  get name() { return this.myForm.get('name');}
  get lastname() { return this.myForm.get('lastname');}
  get dni() { return this.myForm.get('dni');}
  get phone() { return this.myForm.get('phone');}
  get agree() { return this.myForm.get('agree');}

  //Form State
  loading = false;
  success = false;

  async submitHandler() {
    this.loading = true;
    const formValue = this.myForm.value;
    console.log('data for patch ',formValue)
    
    this.contactservice.contact(formValue)
    .subscribe(
      (response:any) => {
        //console.log(response);
        //this.table.loadDataPage();
        this.openDialog(response.result);
        console.log('response form ', response);
        this.loading = false;
      },
      error => {
        console.log(error)
      }
    );
  }

  openDialog(data): void {
    const dialogRef = this.dialog.open(ModalContactResponseComponent, {
      width: '350px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Contact was closed');
    });
  }
}
