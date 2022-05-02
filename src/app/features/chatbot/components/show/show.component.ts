import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TokenService } from 'src/app/core/services/token.service';
import { Chat } from 'src/app/features/my-chat/interfaces/Chat';
import { Chatbot } from '../../interfaces/Chatbot';
import { Chatbot_question } from '../../interfaces/Chatbot_question';
import { Option_type } from '../../interfaces/Option_type';
import { Question } from '../../interfaces/Question';
import { Status } from '../../interfaces/Status';
import { Question_options } from '../../interfaces/Question_options';
import { Question_type } from '../../interfaces/Question_type';
import { ChatbotService } from '../../services/chatbot.service';
import { OptionTypeService } from '../../services/option-type.service';
import { OptionsService } from '../../services/options.service';
import { QuestionTypeService } from '../../services/question-type.service';
import { QuestionService } from '../../services/question.service';
import { Options } from '../../interfaces/Options';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  //LISTBYID_USER
  chatbot1: Chatbot = null;
  chatbot_questions: Chatbot_question[] = [];
  question_options: Question_options[] = [];
  question_types: Question_type[] = [];
  option_types: Option_type[] = [];
  currentDate = new Date();

  //formulario de Question
  formQuestion: FormGroup=new FormGroup({});

  //Formulario de Option
  formOption: FormGroup=new FormGroup({});

  //LOGGEO
  isLogged = false;
  userName = ''

  constructor(
    private chatbotService: ChatbotService,
    private questionService: QuestionService,
    private optionsService: OptionsService,
    private fb: FormBuilder,
    private question_typeService: QuestionTypeService,
    private option_typeService: OptionTypeService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService
  ) { }

  question_status: Status = {
    id: 2,
    description: '',
    created_by: 0,
    created_at: '',
    updated_by: 0,
    updated_at: ''
  }

  ngOnInit(): void {
    console.log('index ya cargó');

    //cuando estes logueado o no
    if (this.tokenService.getToken()) {
      this.cargarQuestions();
      const id :number = this.activatedRoute.snapshot.params.id;
      
      this.chatbotService.listChatbotById(id).subscribe(data=>this.chatbot1=data);
      this.question_typeService.listQuestion_type().subscribe(data=>this.question_types=data);
      this.option_typeService.listOption_type().subscribe(data=>this.option_types=data);
      
      this.isLogged = true;
      this.userName = this.tokenService.getUserName();
    } else {
      this.isLogged = false;
      this.userName = '';
    };

    this.formQuestion=this.fb.group({
      //codigo:[,[Validators.required]],
      description: ['',[Validators.required]],
      question_type:['',[Validators.required]],
      created_by: [1,[Validators.required]],
      created_at: [this.currentDate,[Validators.required]],
      updated_by: [1,[Validators.required]],
      updated_at: [this.currentDate,[Validators.required]],
      status: [ this.question_status ,[Validators.required]]
    });
  
    this.formOption=this.fb.group({
      //codigo:[,[Validators.required]],
      description: ['',[Validators.required]],
      option_type:['',[Validators.required]]
    });
  }

  chatbot_question : Chatbot_question = {
    id: 0,
    chatbot: null,
    question: null
  }

  question_option : Question_options = {
    id: 0,
    question: null,
    option: null
  }

  get description() { return this.formQuestion.get('description');}
  get question_type() { return this.formQuestion.get('question_type');}

  cargarQuestions(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.questionService.listQuestionByChatbot(id).subscribe(
      data => {
        this.chatbot_questions = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  cargarOptions(id: number): void {
    this.optionsService.listOptionByQuestion(id).subscribe(
      data => {
        this.question_options = data;
        this.question.id = id;
      },
      err => {
        console.log(err);
      }
    );
  }

  questionSubscription: Subscription
  chatbot: Chatbot = {
    id: 0,
    description: '',
    created_by: 0,
    created_at: '',
    updated_by: 0,
    updated_at: ''
  }
  questionRegister(): void{
    if(this.questionSubscription != undefined) (this.questionSubscription.unsubscribe());
    this.questionSubscription = this.questionService.saveQuestion(this.formQuestion.value).subscribe(
      (data:any) => {
        
        const id = this.activatedRoute.snapshot.params.id;
        console.log('question registrado : ', data);
        this.chatbot_question.question = data;
        this.chatbot.id = id;
        this.chatbot_question.chatbot = this.chatbot;
        this.chatbot_questionRegister();
      },
      (error:any) => {
        console.log('question error : ', error);
      }
    );
  }


  question: Question = {
    id: 0,
    description: '',
    created_by: 0,
    created_at: '',
    updated_by: 0,
    updated_at: '',
    status: null,
    question_type: null,
    order_number: 0
  }

  optionSubscription: Subscription
  optionRegister(): void{
    if(this.optionSubscription != undefined) (this.optionSubscription.unsubscribe());
    this.optionSubscription = this.optionsService.saveOption(this.formOption.value).subscribe(
      (data:any) => {
        console.log('option registrado : ', data);
        console.log('id : ' + this.question.id)
        this.question_option.option = data;
        this.question_option.question = this.question;
        this.question_optionsRegister();
      },
      (error:any) => {
        console.log('option error : ', error);
      }
    );
  }

  chatbot_questionRegister(){
    if(this.optionSubscription != undefined) (this.optionSubscription.unsubscribe());
    this.optionSubscription = this.chatbotService.saveChatbotQuestion(this.chatbot_question).subscribe(
      (data:any) => {
        this.chatbot_questions.push(data);
        console.log('chat_questionRegister registrado : ', data);
      },
      (error:any) => {
        console.log('option error : ', error);
      }
    );
  }

  question_optionsRegister(){
    if(this.optionSubscription != undefined) (this.optionSubscription.unsubscribe());
    this.optionSubscription = this.questionService.saveQuestionOptions(this.question_option).subscribe(
      (data:any) => {
        this.question_options.push(data);
        console.log('question_optionRegister registrado : ', data);
      },
      (error:any) => {
        console.log('option error : ', error);
      }
    );
  }

  

  subirQuestion(bean: Question){
    if(this.optionSubscription != undefined) (this.optionSubscription.unsubscribe());
    this.optionSubscription = this.questionService.updateSubirQuestion(bean.id, bean).subscribe(
      (data:any) => {
        this.question_options.push(data);
        console.log('order_number actualizado : ', data);
      },
      (error:any) => {
        console.log('subir error : ', error);
      }
    );
  }

  bajarQuestion(bean: Question){
    if(this.optionSubscription != undefined) (this.optionSubscription.unsubscribe());
    this.optionSubscription = this.questionService.updateBajarQuestion(bean.id, bean).subscribe(
      (data:any) => {
        this.question_options.push(data);
        console.log('order_number actualizado : ', data);
      },
      (error:any) => {
        console.log('bajar error : ', error);
      }
    );
  }

  subirOption(bean: Options){
    if(this.optionSubscription != undefined) (this.optionSubscription.unsubscribe());
    this.optionSubscription = this.optionsService.updateSubirOption(bean.id, bean).subscribe(
      (data:any) => {
        this.question_options.push(data);
        console.log('order_number actualizado : ', data);
      },
      (error:any) => {
        console.log('subir error : ', error);
      }
    );
  }

  bajarOption(bean: Options){
    if(this.optionSubscription != undefined) (this.optionSubscription.unsubscribe());
    this.optionSubscription = this.optionsService.updateBajarOption(bean.id, bean).subscribe(
      (data:any) => {
        this.question_options.push(data);
        console.log('order_number actualizado : ', data);
      },
      (error:any) => {
        console.log('bajar error : ', error);
      }
    );
  }

}
