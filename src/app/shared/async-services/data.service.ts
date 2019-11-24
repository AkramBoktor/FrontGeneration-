import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ODataService } from 'angular-odata-es5';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { Constants } from '../config/constants';
import { Attachment } from '../models/controls/interfaces';
@Injectable()
export class DataService<T> {

  urlPrefix = Constants.baseApiUrl;
  attachmentUrlPrefix = Constants.baseAttachmentUrl;

  protected formHeaders = new HttpHeaders({ enctype: 'multipart/form-data' });

  constructor(
    public url: string, protected httpClient: HttpClient, protected odata?: ODataService<T>) {

  }
  public getById(id): Observable<T> {
    return this.httpClient.get<T>(`${this.urlPrefix}${this.urlPrefix}/${this.url}/${id}`);
  }

  public getAll(): Observable<T[]> {
    return this.httpClient
      .get<T[]>(`${this.urlPrefix}/${this.url}`);
  }

  public create(post: T): Observable<T> {
    return this.httpClient
      .post<T>(`${this.urlPrefix}/${this.url}`, JSON.stringify(post));
  }

  public update(post: T, id?: any): Observable<T> {
    return this.httpClient
      .put<T>(`${this.urlPrefix}/${this.url}/${id}`, JSON.stringify(post));
  }

  public delete(id: any): any {
    return this.httpClient
      .delete(`${this.urlPrefix}/${this.url}/${id}`);
  }

  public getAttachments(): Observable<Attachment[]> {
    return this.httpClient.get<Attachment[]>(`${this.attachmentUrlPrefix}/attachments/${this.url}`);
  }
  public getAttachmentsById(id: number): Observable<Attachment[]> {
    return this.httpClient.get<Attachment[]>(`${this.attachmentUrlPrefix}/attachments/${this.url}/${id}`);
  }
  public postAttachments(id: number, fileItems: Attachment[]): Observable<{ status: number, message: number } | Attachment[]> {
    const formData = new FormData();

    if (fileItems) {
      for (const fileItem of fileItems) {
        formData.append('Files', fileItem.file);
      }
      formData.append('ServiceName', this.url);
      formData.append('EntityId', id ? id.toString() : '0');
  
    }
    

    return this.httpClient.post<any>(`${this.attachmentUrlPrefix}/attachments`, formData, {
      headers: this.formHeaders, reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {
      switch (event.type) {

        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', message: progress };

        case HttpEventType.Response:
          return event.body;
      }
    }),
      debounceTime(300));
  }
  public downloadAttachments(id: number, fileName: string): any {
    return this.httpClient.get<any>(`${this.attachmentUrlPrefix}/attachments/${id}/download`, { responseType: 'blob' as 'json' }).pipe(
      map((res) => {
        const blob = new Blob([res]);
        return blob;
      }), map(success => {
        saveAs(success, fileName);
      },
        err => {
          alert('Server error while downloading file');
        })
    );
  }
  public deleteAttachments(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.attachmentUrlPrefix}/attachments/${id}`);
  }

  public getAllWithFilter(filter: any): Observable<T[]> {
    return this.httpClient
      .post<T[]>(`${this.urlPrefix}/${this.url}/getall`, filter.filter);
  }
}
