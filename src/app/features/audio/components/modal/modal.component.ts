import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LineService } from '../../services/line/line.service';
import { SongService } from '../../services/song/song.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  myForm: FormGroup;
  btn_text: string = "Sign in";
  constructor
  (
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private lineService: LineService,
    private songService: SongService,
    private dialogref: MatDialogRef<ModalComponent>
  ) {}

  song: any;
  song_name: string;

  ngOnInit(): void {
    this.myForm = this.fb.group({
      line_id: [
        null
      ],
      text: [
        '00',[Validators.required]
      ],
      hour: [
        '00',[Validators.required]
      ],
      minute: [
        '00',[Validators.required]
      ],
      second: [
        '00',[Validators.required]
      ],
      song_id: [
        null,[Validators.required]
      ]
    });
    console.log('modal data here .... ', this.data);
    if(this.data !== undefined && this.data !== null) {
      this.song = this.data.song;
      this.btn_text = this.data.btn_text;
      this.song_name = this.data.song_name;
      this.myForm.setValue({
        line_id: this.data.line.line_id,
        text: this.data.line.text,
        hour: this.data.line.hour,
        minute: this.data.line.minute,
        second: this.data.line.second,
        song_id: this.song.song_id
      });
    }
  }

  get text() { return this.myForm.get('text');}
  get hour() { return this.myForm.get('hour');}
  get minute() { return this.myForm.get('minute');}
  get second() { return this.myForm.get('second');}
  get song_id() { return this.myForm.get('song_id');}

  //Form State
  loading = false;
  success = false;

  async submitHandler() {
    this.loading = true;
    const formValue = this.myForm.value;
    if(formValue.line_id !== undefined && this.data.action === "update"){
      this.lineService._update_line({
        data:formValue,
        line_id: formValue.line_id
      })
      .subscribe(
        (response:any) => {
          //console.log(response);
          this.songService._get_song({});
          this.dialogref.close()
        },
        error => {
          console.log(error)
        }
      );
    }
    else {
      this.lineService._add_line(formValue)
      .subscribe(
        (response:any) => {
          //console.log(response);
          this.songService._get_song({});
          this.dialogref.close()
        },
        error => {
          console.log(error)
        }
      );
    }
  }

}
