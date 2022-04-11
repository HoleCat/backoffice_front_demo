import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExampleModuleRoutingModule } from './example-module-routing.module';
import { ExampleTableComponent } from './components/example-table/example-table.component';
import { ExampleFormComponent } from './components/example-form/example-form.component';
import { ExampleChipsComponent } from './components/example-chips/example-chips.component';
import { ExampleWrapperComponent } from './components/example-wrapper/example-wrapper.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    ExampleTableComponent,
    ExampleFormComponent,
    ExampleChipsComponent,
    ExampleWrapperComponent
  ],
  imports: [
    CommonModule,
    ExampleModuleRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    HttpClientModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatDividerModule
  ]
})
export class ExampleModuleModule { }
