import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TokenService } from 'src/app/core/services/token.service';
import { Chat } from 'src/app/features/my-chat/interfaces/Chat';
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
import { Chatbot } from 'src/app/features/chat/interfaces/Chatbot';
import { ChatService } from 'src/app/features/chat/services/chat.service';
import { User } from 'src/app/features/chat/interfaces/User';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  //LISTBYID_USER
  chatbot: Chatbot = null;
  currentDate = new Date();
  question_types: Question_type[] = [];
  option_types: Option_type[] = [];

  //formulario de Question
  formQuestion: FormGroup=new FormGroup({});

  //Formulario de Option
  formOption: FormGroup=new FormGroup({});

  //LOGGEO
  isLogged = false;
  userName = ''

  constructor(
    private chatbotService: ChatbotService,
    private chatService: ChatService,
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
  user: User = {
    id: 0,
    name: '',
    last_name: '',
    userName: '',
    email: '',
    password: '',
    document_number: '',
    phone: '',
    photo: '',
    created_at: '',
    updated_at: ''
  }


  ngOnInit(): void {
    console.log('index ya cargó');

    //cuando estes logueado o no
    if (this.tokenService.getToken()) {
      const id :number = this.activatedRoute.snapshot.params.id;
      
      this.chatService.userByToken(this.tokenService.getToken()).subscribe(
        data => {
           this.user.id = data.id
        },
        error => {
          console.log(error);
        }
      );       

      this.chatService.listChatbotById(id).subscribe(data=>this.chatbot=data);
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
      created_by: [this.user,[Validators.required]],
      created_at: [this.currentDate,[Validators.required]],
      updated_by: [this.user,[Validators.required]],
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

  questionSubscription: Subscription

  questionRegister(): void{
    if(this.questionSubscription != undefined) (this.questionSubscription.unsubscribe());
    const id = this.activatedRoute.snapshot.params.id;
    this.questionSubscription = this.questionService.saveQuestion(id, this.formQuestion.value).subscribe(
      (data:any) => {
        console.log('question registrado : ', data);
        this.chatbot_question.question = data;
        this.chatbot.id = id;
        // this.chatbot_questionRegister();
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

  chatbotSubscription: Subscription
  optionRegister(): void{
    if(this.chatbotSubscription != undefined) (this.chatbotSubscription.unsubscribe());
    this.chatbotSubscription = this.optionsService.saveOption(this.formOption.value).subscribe(
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

  cargarOptions(id: number){
    if(this.chatbotSubscription != undefined) (this.chatbotSubscription.unsubscribe());
    this.chatbotSubscription = this.chatService.detailQuestion(id).subscribe(
      (data:any) => {
        this.question = data;
        console.log('Question encontrado : ', data);
      },
      (error:any) => {
        console.log('Question error : ', error);
      }
    );
  }

  // chatbot_questionRegister(){
  //   if(this.chatbotSubscription != undefined) (this.chatbotSubscription.unsubscribe());
  //   this.chatbotSubscription = this.chatbotService.saveChatbotQuestion(this.chatbot_question).subscribe(
  //     (data:any) => {
  //       console.log('chat_questionRegister registrado : ', data);
  //     },
  //     (error:any) => {
  //       console.log('option error : ', error);
  //     }
  //   );
  // }

  question_optionsRegister(){
    if(this.chatbotSubscription != undefined) (this.chatbotSubscription.unsubscribe());
    this.chatbotSubscription = this.questionService.saveQuestionOptions(this.question_option).subscribe(
      (data:any) => {
        console.log('question_optionRegister registrado : ', data);
      },
      (error:any) => {
        console.log('option error : ', error);
      }
    );
  }

  

  subirQuestion(bean: Question){
    bean.order_number = bean.order_number+1;
    console.log(bean);
    if(this.chatbotSubscription != undefined) (this.chatbotSubscription.unsubscribe());
    this.chatbotSubscription = this.questionService.updateSubirQuestion(bean.id, bean).subscribe(
      (data:any) => {
        console.log('order_number actualizado : ', data);
      },
      (error:any) => {
        console.log('subir error : ', error);
      }
    );
  }

  bajarQuestion(bean: Question){
    if(this.chatbotSubscription != undefined) (this.chatbotSubscription.unsubscribe());
    this.chatbotSubscription = this.questionService.updateBajarQuestion(bean.id, bean).subscribe(
      (data:any) => {
        console.log('order_number actualizado : ', data);
      },
      (error:any) => {
        console.log('bajar error : ', error);
      }
    );
  }

  subirOption(bean: Options){
    if(this.chatbotSubscription != undefined) (this.chatbotSubscription.unsubscribe());
    this.chatbotSubscription = this.optionsService.updateSubirOption(bean.id, bean).subscribe(
      (data:any) => {
        console.log('order_number actualizado : ', data);
      },
      (error:any) => {
        console.log('subir error : ', error);
      }
    );
  }

  bajarOption(bean: Options){
    if(this.chatbotSubscription != undefined) (this.chatbotSubscription.unsubscribe());
    this.chatbotSubscription = this.optionsService.updateBajarOption(bean.id, bean).subscribe(
      (data:any) => {
        console.log('order_number actualizado : ', data);
      },
      (error:any) => {
        console.log('bajar error : ', error);
      }
    );
  }

}
