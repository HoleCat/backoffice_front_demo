import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { fromEvent, merge, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, finalize, tap } from 'rxjs/operators';
import { ExampleDataService } from '../../services/example-data/example-data.service';
import { ExampleFormComponent } from '../example-form/example-form.component';
import { ExampleTableDataSource, ExampleTableItem } from './example-table-datasource';

@Component({
  selector: 'app-example-table',
  templateUrl: './example-table.component.html',
  styleUrls: ['./example-table.component.css']
})
export class ExampleTableComponent implements OnInit,AfterViewInit,AfterViewChecked {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ExampleTableItem>;
  @ViewChild('input') input: ElementRef;
  dataSource: ExampleTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['_id', 'email', 'password', 'agree'];

  constructor(
    public dialog: MatDialog,
    private exampledataservice: ExampleDataService,
  ) {
    this.dataSource = new ExampleTableDataSource(this.exampledataservice);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.input = this.input;
    this.table.dataSource = this.dataSource;
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
      console.log('sort direction',this.sort.direction);
      console.log('sort active',this.sort.active);
    });
    fromEvent(this.input.nativeElement,'keyup')
    .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
            this.paginator.pageIndex = 0;
            this.loadDataPage();
        })
    )
    .subscribe();
    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
        tap(() => this.loadDataPage())
    )
    .subscribe();
    //this.loadDataPage();
    //this.loadDataPage();
    var page = {
      startIndex : this.paginator.pageIndex * this.paginator.pageSize,
      pageSize: this.paginator.pageSize,
      sort: JSON.stringify({active: this.sort.active,direction: this.sort.direction})
    }
    this.exampledataservice._get_example_data(page)
    .pipe(
      catchError(()=>of([])),
      finalize(()=>this.dataSource.loadingSubject.next(false))
    )
    .subscribe(
      (response:any) => {
        console.log('examples',response);
        response = JSON.parse(response);
        console.log('parse example ', response);
        this.dataSource.countSubject.next(response.count);
        this.dataSource.exampleSubject.next(response.data);
      }
    )
  }
  ngAfterViewChecked(){
    //this.loadDataPage();
  }
  _change_color($event,row){
    var tr = $event.currentTarget as HTMLElement;
    var change = tr.classList.toggle('bg-red-300');
    console.log('su cambio', change);
    console.log('su isla', row);
  }
  _create_example() {
    console.log('oe');
    const createdialogref = this.dialog.open(ExampleFormComponent);
    createdialogref.afterClosed().subscribe(data => {
      console.log('data from modal', data);
      this.loadDataPage();
    });
  }
  _update_example(data) {
    console.log('oe');
    const createdialogref = this.dialog.open(ExampleFormComponent,{
      data: data
    });
    createdialogref.afterClosed().subscribe(data => {
      console.log('data from modal', data);
      this.loadDataPage();
    });
  }
  loadDataPage() {
    this.dataSource.getPagedData();
  }

  delete_example(_id) {
    var obj = {
      _id: _id
    }
    console.log('delete',obj);
    this.exampledataservice._destroy_example_data(obj)
    .subscribe(
      (response:any) => {
        console.log('delete result ',response);
        this.loadDataPage();
      },
      error => {
        console.log(error)
      }
    )
  }

  show_example(_id) {
    var obj = {
      _id: _id
    }
    console.log('show',obj);
    this.exampledataservice._show_example_data(obj)
    .subscribe(
      (response:any) => {
        console.log('show result ',response);
        response.btn_text = "Update user";
        response.action = "update";
        this._update_example(response);
      },
      error => {
        console.log(error)
      }
    )
  }
}
