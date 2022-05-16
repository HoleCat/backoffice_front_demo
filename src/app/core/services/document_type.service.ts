import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Document_type } from 'src/app/features/chat/interfaces/Document_type';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeService {

  constructor(private httpClient: HttpClient) { }

  public listDocument_type(): Observable<Document_type[]> {
    return this.httpClient.get<Document_type[]>(`http://localhost:8092/document_type/list`);
  }
}
