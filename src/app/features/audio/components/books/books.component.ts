import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/core/services/notification.service';
import { StreamState } from '../../interfaces/stream/stream-state';
import { AudioService } from '../../services/audio/audio.service';
import { CloudService } from '../../services/cloud/cloud.service';
import { LineService } from '../../services/line/line.service';
import { SongService } from '../../services/song/song.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent {
  general: boolean = true;
  liked: boolean = false;
  song: any = {
    song_id: '',
    name: '',
    path: '',
    createdAt: '',
    updatedAt: ''
  };
  line: any = {
    line_id: null,
    text: '',
    song_id: null,
    hour: '',
    minute: '',
    second: '',
    createdAt: '',
    updatedAt: ''
  };
  files: Array<any> = [];
  songs: Array<any> = [];
  state: StreamState = null;
  currentFile: any = {};
  current_line: any = {
    text: '',
  };
  constructor(
    public dialog: MatDialog,
    public audioService: AudioService,
    public cloudService: CloudService,
    public songService: SongService,
    public lineService: LineService,
    public notificationService: NotificationService
  ) {
    // get media files
    cloudService.getFiles().subscribe(files => {
      this.files = files;
    });
    //songService._get_song({});
    songService.$songs.subscribe((result:any) => {
      this.songs = result;
      let currentTime = this.state?.currentTime;
      for (let index = 0; index < this.songs.length; index++) {
        const element = this.songs[index];
        if(element.song_id == this.song.song_id)
        {
          this.song = element;
          this.openFile(this.song, index);
          this.audioService.audioObj.currentTime = currentTime - 5;
          this.current_line = {
            text: ''
          }
        }
      }
    })
    audioService.mute$.subscribe((result:any) => {
      this.mute = result;
    })
    audioService.readableCurrentTime$.subscribe((result:string) => {
      let string_result = result.trim();
      var times = string_result.split(':');
      if(this.song != null && this.song != undefined)
      {
        if(this.song.song_id != null && this.song.song_id != undefined && this.song.song_id != '')
        {
          for (let index = 0; index < this.song.lines.length; index++) {
            const element = this.song.lines[index];
            
            if(element.hour == times[0] && element.minute == times[1] && element.second == times[2])
            {
              console.log('ya me quiero dormir', times[0] + 'xxx' + times[1] + 'xxx' + times[2]);
              this.current_line = element;
            }
          }
        }
      }
    })
    // listen to stream state
    this.audioService.getState().subscribe(state => {
      this.state = state;
    });
  }

  playStream(path) {
    this.audioService.playStream(path).subscribe(events => {
      // listening for fun here
    });
  }

  openFile(file, index) {
    this.song = file;
    this.currentFile = { index, file };
    this.audioService.stop();
    console.log('cancion', file.path)
    this.playStream(file.path);
  }

  pause() {
    this.audioService.pause();
  }

  play() {
    this.audioService.play();
  }

  stop() {
    this.audioService.stop();
  }

  next() {
    const index = this.currentFile.index + 1;
    const file = this.files[index];
    this.openFile(file, index);
  }

  previous() {
    const index = this.currentFile.index - 1;
    const file = this.files[index];
    this.openFile(file, index);
  }

  isFirstPlaying() {
    return this.currentFile.index === 0;
  }

  isLastPlaying() {
    return this.currentFile.index === this.files.length - 1;
  }

  onSliderChangeEnd(change) {
    this.audioService.seekTo(change.value);
  }

  /**/
  mute: boolean = false;

  store_song(obj:any) {
    this.songService._add_song(obj).subscribe(
      (response: any) => {
        console.log(response);
        this.songService._get_song({});
      },
      error => {
        console.log(error.message)
      }
    )
  }

  _destroy_song(obj:any) {
    this.songService._destroy_song(obj).subscribe(
      (response: any) => {
        console.log(response)
      },
      error => {
        console.log(error.message)
      }
    )
  }

  _create_line() {
    console.log('oe');
    console.log('cancion elegida',this.song);
    this.line.hour = this.state?.readableCurrentTime.split(':')[0];
    this.line.minute = this.state?.readableCurrentTime.split(':')[1];
    this.line.second = this.state?.readableCurrentTime.split(':')[2];
    if(this.song.song_id != null && this.song.song_id != ''){
      const createdialogref = this.dialog.open(ModalComponent,{
        data: {
          song_name: this.song.name,
          song: {
            song_id: this.song.song_id
          },
          line: this.line,
          action: undefined,
          readableCurrentTime: this.state.readableCurrentTime,
          btn_text: 'Save'
        }
      });
      createdialogref.afterClosed().subscribe(data => {
        console.log('data from modal', data);
        //this.loadDataPage();
      });
    } else {
      this.notificationService.showNotificationCenterBottom('First select a song','ok',3000)
    }
  }
  _update_line(data) {
    const createdialogref = this.dialog.open(ModalComponent,{
      data: {
        song_name: this.song.name,
        song: {
          song_id: this.song.song_id
        },
        line: data,
        action: 'update',
        readableCurrentTime: this.state.readableCurrentTime,
        btn_text: 'Update'
      }
    });
    createdialogref.afterClosed().subscribe(data => {
      console.log('data from modal', data);
    });
  }
  _destroy_line(data){
    console.log('data para destroy .. ',data)
    this.lineService._destroy_line(data).subscribe(
      (response:any)=>{
        console.log('front destroy line ... ', response);
        this.songService._get_song({});
      },
      error => {
        console.log(error.message)
      }
    )
  }

  _set_volume($event){
    this.audioService.set_volume($event.value);
  }

  _volume_on(){
    this.audioService.volume_on();
  }

  volume_off(){
    this.audioService.volume_off();
  }
}
