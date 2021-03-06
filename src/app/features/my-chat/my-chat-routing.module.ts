import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WrapperComponent } from '../chat/components/wrapper/wrapper.component';
import { CreateComponent } from './components/create/create.component';
import { DeleteComponent } from './components/delete/delete.component';
import { IndexComponent } from './components/index/index.component';
import { ShowComponent } from './components/show/show.component';

const routes: Routes = [{
  path: '',
    component: WrapperComponent,
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
        path: 'delete',
        component: DeleteComponent
      },
      {
        path: 'show/:idc/:idu',
        component: ShowComponent
      }
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyChatRoutingModule { }
