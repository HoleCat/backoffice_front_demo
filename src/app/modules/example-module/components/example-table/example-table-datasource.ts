import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, finalize, map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, BehaviorSubject, of, throwError } from 'rxjs';
import { ExampleDataService } from '../../services/example-data/example-data.service';
import { ElementRef } from '@angular/core';

export interface ExampleTableItem {
  name: string;
  id: number;
}

export class ExampleTableDataSource extends DataSource<ExampleTableItem> {
  public exampleSubject = new BehaviorSubject<ExampleTableItem[]>([]);
  public loadingSubject = new BehaviorSubject<boolean>(false);
  public countSubject = new BehaviorSubject<number>(0);
  public loading$ = this.loadingSubject.asObservable();
  public count$ = this.countSubject.asObservable();

  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
  input: ElementRef | undefined;

  constructor(private exampleservice: ExampleDataService) {
    super();
  }
  connect(collectionViewer: CollectionViewer): Observable<ExampleTableItem[]> {
    return this.exampleSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.exampleSubject.complete();
    this.loadingSubject.complete();
  }

  example_text_filter: string;
  getPagedData() {
    if (this.paginator) {
      var page = {
        text: this.input.nativeElement.value,
        startIndex : this.paginator.pageIndex * this.paginator.pageSize,
        pageSize: this.paginator.pageSize,
        sort: JSON.stringify({active: this.sort.active,direction: this.sort.direction})
      }
      this.loadingSubject.next(true);
      this.exampleservice._get_example_data(page)
      .pipe(
        catchError(()=>of([])),
        finalize(()=>this.loadingSubject.next(false))
      )
      .subscribe(
        (response:any) => {
          console.log('examples',response);
          response = JSON.parse(response);
          console.log('parse example ', response);
          this.countSubject.next(response.count);
          this.exampleSubject.next(response.data);
        }
      )
    }
  }
}
