import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExampleWrapperComponent } from './components/example-wrapper/example-wrapper.component';

const routes: Routes = [
  {
    path:'',
    component: ExampleWrapperComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExampleModuleRoutingModule { }
