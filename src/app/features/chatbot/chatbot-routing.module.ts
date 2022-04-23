import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { IndexComponent } from './components/index/index.component';
import { ShowComponent } from './components/show/show.component';

const routes: Routes = [{
  path: '',
    children: [
      {
        path: 'index',
        component: IndexComponent
      },
      {
        path: 'create',
        component: CreateComponent
      },
      {
        path: 'show/:id',
        component: ShowComponent
      }
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatbotRoutingModule { }
