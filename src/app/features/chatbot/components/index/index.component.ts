import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/core/services/token.service';
import { Chatbot } from '../../interfaces/Chatbot';
import { ChatbotService } from '../../services/chatbot.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  //LISTBYID_USER
  chatbots: Chatbot[] = [];

  //LOGGEO
  isLogged = false;
  userName = ''

  constructor(
    private chatbotService: ChatbotService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    console.log('index ya cargó');

    //cuando estes logueado o no
    if (this.tokenService.getToken()) {
      this.cargarChatbots();
      
      this.isLogged = true;
      this.userName = this.tokenService.getUserName();
    } else {
      this.isLogged = false;
      this.userName = '';
    }
  }

  cargarChatbots(): void {
    this.chatbotService.listChatbot().subscribe(
      data => {
        this.chatbots = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  downloadPDF() {
    // Extraemos el
    const DATA: any = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
    });
  }

}
