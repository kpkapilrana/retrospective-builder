import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RetrospectiveService {

  constructor(private http: HttpClient) { }

  private baseUrl = environment.apiUrl + '/retrospective';

  private searchUrl = this.baseUrl + '/search';
  private searchById = this.baseUrl + '/searchById';
  private addUrl = this.baseUrl + '/add';
  private deleteUrl = this.baseUrl + '/delete';
  private updateUrl = this.baseUrl + '/update';

  get(id): Observable<any> {
    return this.http
      .get<any>(`${this.searchById}/${id}`)
      .pipe(
        tap(response => {
          return response;
        }),

      );
  }

  getAll(): Observable<any> {
    return this.http
      .get<any>(this.searchUrl)
      .pipe(
        tap(response => {
          return response;
        }),

      );
  }

  add(payload): Observable<any> {
    // --20190704 console.log("the payload: ", payload);
    return this.http
      .post<any>(this.addUrl, payload)
      .pipe(
        tap(response => {
          return response;
        }),

      );
  }

  edit(payload): Observable<any> {
    return this.http
      .post<any>(this.updateUrl, payload)
      .pipe(
        tap(response => {
          return response;
        }),

      );
  }

  delete(payload): Observable<any> {
    return this.http.request('delete', this.deleteUrl, { body: payload }).pipe(
      tap(response => {
        return response;
      }),

    );
  }
}
