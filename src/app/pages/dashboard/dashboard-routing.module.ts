import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WrapperComponent } from './components/wrapper/wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: WrapperComponent,
    children: [
      {
        path: 'chatbot',
        loadChildren: () => import('../../features/chatbot/chatbot.module').then(m => m.ChatbotModule)
      },
      {
        path: 'chat',
        loadChildren: () => import('../../features/chat/chat.module').then(m => m.ChatModule)
      },
      {
        path: 'my-chat',
        loadChildren: () => import('../../features/my-chat/my-chat.module').then(m => m.MyChatModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
