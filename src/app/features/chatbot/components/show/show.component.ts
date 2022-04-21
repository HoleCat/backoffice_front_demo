import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/core/services/token.service';
import { Question } from '../../interfaces/Question';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  //LISTBYID_USER
  questions: Question[] = [];

  //LOGGEO
  isLogged = false;
  userName = ''

  constructor(
    private questionService: QuestionService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    console.log('index ya cargó');

    //cuando estes logueado o no
    if (this.tokenService.getToken()) {
      this.cargarquestions();
      
      this.isLogged = true;
      this.userName = this.tokenService.getUserName();
    } else {
      this.isLogged = false;
      this.userName = '';
    }
  }

  cargarquestions(): void {
    this.questionService.listQuestion().subscribe(
      data => {
        this.questions = data;
      },
      err => {
        console.log(err);
      }
    );
  }

}
